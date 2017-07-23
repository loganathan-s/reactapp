import React from 'react';
import { render } from 'react-dom';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
	//Bind methods in constructor/ in inline check bekow form
	//constructor(){
	//  super();	
	//  this.goToStore = 	this.goToStore.bind(this);
	//}

	//OR
	//this.goToStore.bind(this)

	//OR
   // (e) => this.goToStore.bind(e)	


	goToStore(event){
		event.preventDefault();
		const storeId = this.storeInput.value;
		console.log(this.storeInput.value);
        this.context.router.transitionTo(`/store/${storeId}`);
	}

	// render method always bound to the class name, however other functions not bound to the class. `this` inside the render always point to the class
	/* ref -> When rendering the componet ref function will be executed, which will create the reference for the input in the property storeInput */

	render(){
		return (
			<form action="" className="store-selector" onSubmit={this.goToStore.bind(this)}>
				<h1>Please Enter a Store</h1> 
				<input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => { this.storeInput = input }}/>
				<button type="submit">Visit Store -> </button> 
			</form>
		);
	}
}

// Imperative api, we used for transitionTo
// declare something at top level, and made available to all. router is defined at top level, which we need to use is here //this.context.router.transitionTo(`/store/${storeId}`);
StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
