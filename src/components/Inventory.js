import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';

class Inventory extends React.Component{
	constructor(){
		super();
		this.renderInventory = this.renderInventory.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.renderLogin = this.renderLogin.bind(this);
		this.authenticate = this.authenticate.bind(this);
		this.authHandler = this.authHandler.bind(this);
		this.logout = this.logout .bind(this);
		this.state = {
			uid: null,
			owner: null
		}

	}

	 componentDidMount() {
	 	//base.onAuth  -> Firebase's Event handler, like in Jquery $(p).on("click")
	 	// On each pageLoad Firebase tries to authenticate itself
	    base.onAuth((user) => {
	      if(user) {
	        this.authHandler(null, { user });
	      }
	    });
  }

	renderLogin(){
		return (
			<nav className="login">
				<h2> Inventory </h2>
				<p> Sign in to Manage your store's Inventory </p>
				<button className="github" onClick={() => this.authenticate('github')}>LogIn to Github</button>
				<button className="facebook" onClick={() => this.authenticate('facebook')}>LogIn to Facebook</button>
			</nav>)
	}

	handleChange(e, key){
		const fish = this.props.fishes[key];
		// Two ways to update object
		//const updatedFish = Object.assign({}, fish)
		const updatedFish = {...fish, 
			[e.target.name]: e.target.value
		}
		this.props.updateFish(key, updatedFish);

	}

	renderInventory(key){
		const fish = this.props.fishes[key];
		return(
			<div className="fish-edit" key={key}>
				<input type="text" name="name" value={fish.name} placeholder="Fish Name" onChange={(e) => this.handleChange(e, key)} />
				<input type="text" name="price" placeholder="Fish Price" value={fish.price} onChange={(e) => this.handleChange(e, key)} />
				<select type="text" name="status" placeholder="Fish status" value={fish.status} onChange={(e) => this.handleChange(e, key)} >
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea type="text" name="desc" placeholder="Fish Desc" value={fish.desc} onChange={(e) => this.handleChange(e, key)} >
				</textarea>
				<input type="text" name="image" placeholder="Fish Image" value={fish.image} onChange={(e) => this.handleChange(e, key)} />
				<button onClick={() => this.props.removeFish(key)}>Remove</button>

			</div>
			)
	}

	authenticate(provider){
		base.authWithOAuthPopup(provider, this.authHandler);
	}

	authHandler(err, authData){
		if (err) {
     		 console.error(err);
      		return;
    	}
    	// grab the store info
         const storeRef = base.database().ref(this.props.storeId);

           // query the firebase once for the store data
	    storeRef.once('value', (snapshot) => {
	    const data = snapshot.val() || {};

      // claim it as our own if there is no owner already
      if(!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        });
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      });
    });

	}

	logout() {
    	base.unauth();
    	this.setState({ uid: null });
  	}

	render(){
        const logout = <button onClick={this.logout}>Log Out!</button>;
		//CHeck logged innot
		if(!this.state.uid){
			return <div>{ this.renderLogin() } </div>

		}
		//CHeck owner in/not
		if(this.state.uid !== this.state.owner){
			return (<div>
				<p>Sorry You're not the Owner of this store!</p>
				{ logout }
			 </div>)

		}
		return(
			<div>
				<h2> Inventory </h2>
				{ logout }
				{ Object.keys(this.props.fishes).map(this.renderInventory) }
				<AddFishForm addFish={this.props.addFish}/>
				<button onClick={this.props.loadSamples}>Load Sample Fishes</button>
			</div>
			)
	}

}

Inventory.PropTypes = {
  fishes: React.PropTypes.object.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  updateFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
  addFish: React.PropTypes.func.isRequired,
  storeId: React.PropTypes.string.isRequired

};


export default Inventory;