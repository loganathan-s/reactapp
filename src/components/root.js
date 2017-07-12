import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
import App from './App';
import StorePicker from './storePicker';	
import NotFound from './NotFound';	
//Stateless Function
const Root = () => {
  return (
  	 <BrowserRouter>
  	  <div>
  	    <Match exactly pattern="/" component={StorePicker} />
	  	<Match pattern="/store/:storeId" component={App} />
	  	<Miss component={NotFound} />
	  </div>
  	 </BrowserRouter>
  	)
}

export default Root;