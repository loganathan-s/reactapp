import React from 'react';

class Header extends React.Component{
	// You can use stateless function, when your component needs only render method
	render(){
		return(
			<header className="top">
				<h1> Catch 
				  <span className="ofThe">
				  	<span className="of">Of</span>
				  	<span className="the">the</span>
				  </span>
				  Day
				</h1>

				<h3 className="tagline"><span>{this.props.tagline}</span></h3>
			</header>
			)
	}

}

Header.propTypes = {
	tagline: React.PropTypes.string.isRequired 
}

export default Header;

