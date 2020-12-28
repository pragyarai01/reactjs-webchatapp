import React, { Component } from 'react';
import Map from './Map';
//import { Button } from 'react-bootstrap';
//import history from './history';

class ShowMap extends Component {
	constructor(){
        super();
        this.state = {
            location: {
				lat: 0,
				lng: 0
			}
        }
    }
	// componentDidMount() {
	// 	let latitude,longitude;
	// 	if (navigator.geolocation) {
	// 	  navigator.geolocation.watchPosition(function(position) {
	// 		latitude = position.coords.latitude
	// 		longitude = position.coords.longitude
	// 		console.log("Latitude is :", latitude);
	// 		console.log("Longitude is :", longitude);
	// 	  this.setState({lat:latitude, long:longitude})
	// 	  console.log("Latitude state :", this.state.lat);
	// 		console.log("Longitude state :", this.state.long);
	// 	  });
		  
	// 	}
	//   }
	componentDidMount() {
		navigator.geolocation.getCurrentPosition(
		  (position) => {
			let lat = position.coords.latitude
			let lng = position.coords.longitude
			console.log("getCurrentPosition Success " + lat + lng) 
			this.setState({
			  location: {
				lat: lat,
				lng: lng
			  }
			})
		  },
		  (error) => {
			this.props.displayError("Error dectecting your location");
			console.error(JSON.stringify(error))
		  },
		  {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
		)
		console.log("showmap props",this.props.location.state)
	  }
	 
	render() {
		const location = this.state.location
		console.log("location",location)
		 if (location.lat === 0 && location.lng === 0) { return null; }
		return(
			<div>
			<div className="App-header">
        <h1>Chat App</h1>
      </div>
			<div style={{ margin: '30px' }}>
				{/* <Button variant="secondary" onClick={() => history.goBack()} >Go Back</Button> */}
				<Map
				    navigation={this.props.location.state}
					google={this.props.google}
					// center={{lat: this.state.lat, lng: this.state.long}}
					center={{lat: location.lat, lng: location.lng}}
					height='300px'
					zoom={15}
				/>
			</div>
			</div>
		);
	}
}

export default ShowMap;