import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component{
    constructor(){
    	super();
      this.addFish = this.addFish.bind(this); 
      this.loadSamples = this.loadSamples.bind(this); 
      this.addToOrder = this.addToOrder.bind(this); 
      this.updateFish = this.updateFish.bind(this); 
      this.removeFish = this.removeFish.bind(this); 
    	this.removeFromOrder = this.removeFromOrder.bind(this); 
    	this.state = {
    		fishes: {},
    		order: {}
    	};

    }

    // Runs before the <App> component rendered
    componentWillMount(){
      this.ref = base.syncState(`${this.props.params.storeId}/fishes`,
        {
          context: this,
          state: 'fishes'
        });

      //
      const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
      if(localStorageRef){
        this.setState({order: JSON.parse(localStorageRef)})
      }
    }

    componentWillUnmount(){
      base.removeBinding(this.ref);
    }

    componentWillUpdate(nextProps, nextState){
      localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order ));
    }

    addFish(fish){
     //always take the copy of state and then do update	
      const fishes = {...this.state.fishes};
      const timestamp = Date.now();
      fishes[`fish-{timestamp}`] = fish;
      console.log(fishes);
      // Set state
      this.setState({ fishes })
    }

    

    updateFish(key, updatedFish){
     //always take the copy of state and then do update 
      const fishes = {...this.state.fishes};
      fishes[key] = updatedFish
      // Set state
      this.setState({ fishes }) 
    }

     removeFish(key, updatedFish){
     //always take the copy of state and then do update 
      const fishes = {...this.state.fishes};
      fishes[key] = null;
      // Set state
      this.setState({ fishes }) 
    }

    loadSamples(){
      this.setState({
        fishes: sampleFishes
      })
    }

     addToOrder(key){
     //always take the copy of state and then do update 
      const order = {...this.state.order};
      order[key] = order[key] + 1 || 1;
      // Set state
      this.setState({ order })
    }

    removeFromOrder(key){
     //always take the copy of state and then do update 
      const order = {...this.state.order};
      console.log(key)
      // JS way to delete element from object, in remofish we used Null since it has been stored in Firebase and firebase requires like that
      delete order[key]
      // Set state
      this.setState({ order })
    }
 //key is reserved keyword, we cant use it, so we added index prop
	render() {
		return(
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market"/>
          <ul className="list-of-fishes">
            { Object
              .keys(this.state.fishes) 
              .map(key => <Fish key={key}  details={this.state.fishes[key]} index={key} addToOrder={this.addToOrder}  />)
            }

          </ul>
				</div>
				<Order fishes={this.state.fishes} params={this.props.params} order={this.state.order} removeFromOrder={this.removeFromOrder}/> 
				<Inventory addFish={this.addFish} fishes={this.state.fishes} loadSamples={this.loadSamples} updateFish={this.updateFish}  />
			</div>
			)
	}

}

App.props = {
  params: React.PropTypes.object.isRequired
}

export default App;