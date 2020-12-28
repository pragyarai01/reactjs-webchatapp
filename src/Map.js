import React from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
// @ts-ignore
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import { Button } from 'react-bootstrap';
import history from './history';

Geocode.setApiKey("AIzaSyAkoe98NAkKlGghynXBqFjVdMrYK4RDoOI");
Geocode.enableDebug()

class Map extends React.Component{
    constructor( props ){
        super( props );
        this.state = {
         address: '',
         startaddress: '',
         endaddress: '',
         startPosition:{
             lat:0,
             lng:0
         },
         endPosition:{
            lat:0,
            lng:0
         },
         mapPosition: {
          lat: this.props.center.lat,
          lng: this.props.center.lng
         },
         markerPosition: {
          lat: this.props.center.lat,
          lng: this.props.center.lng
      },
        }
       }
     
       componentDidMount() {
        console.log("map props",this.props)
        Geocode.fromLatLng( this.state.mapPosition.lat , this.state.mapPosition.lng ).then(
         response => {
          const address = response.results[0].formatted_address;
          this.setState( {
           address: ( address ) ? address : '',
           startaddress : ( address ) ? address : '',
           startPosition: this.state.mapPosition,
          } )
         },
         error => {
          console.error(error);
         }
        );
       };
      
       shouldComponentUpdate( nextProps, nextState ){
        if (
         this.state.markerPosition.lat !== this.props.center.lat ||
         this.state.address !== nextState.address
        ) {
         return true
        } else if ( this.props.center.lat === nextProps.center.lat ){
         return false
        }
       }
      
    getDistance(lat1, lon1, lat2, lon2) {
        var radlat1 = Math.PI * lat1/180
        var radlat2 = Math.PI * lat2/180
        var theta = lon1-lon2
        var radtheta = Math.PI * theta/180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180/Math.PI
        dist = dist * 60 * 1.1515 * 0.8684
       // if (unit=="K") { dist = dist * 1.609344 }
       // if (unit=="M") { dist = dist * 0.8684 }
        return Math.round(dist)
    }
       onClick(){
           console.log("p1",this.state.startPosition)
           console.log("p2",this.state.endPosition)
           var miles = this.getDistance(this.state.startPosition.lat,this.state.startPosition.lng,this.state.endPosition.lat,this.state.endPosition.lng)
           console.log("MILESSS",miles)
           history.push('/form',{showinfo:true,name: this.props.navigation.name,startadd:this.state.startaddress,endadd:this.state.endaddress,mileage: miles})
           
       }
       onChangeStart = ( event ) => {
        this.setState({ startaddress: event.target.value });
       };
       onChangeEnd = ( event ) => {
        this.setState({ endaddress: event.target.value });
       };
       onInfoWindowClose = ( event ) => {
      };
      
 onMarkerDragEnd = ( event ) => {
    console.log( 'event', event );
    let newLat = event.latLng.lat(),
     newLng = event.latLng.lng();
     //addressArray = [];
  Geocode.fromLatLng( newLat , newLng ).then(
     response => {
      const address = response.results[0].formatted_address
  this.setState( {
       address: ( address ) ? address : '',
      } )
     },
     error => {
      console.error(error);
     }
    );
   };

onPlaceSelectedEnd = ( place ) => {
        console.log("place",place)
       const address = place.formatted_address,
          latValue = place.geometry.location.lat(),
          lngValue = place.geometry.location.lng();
      
         this.setState({
          address: ( address ) ? address : '',
          endaddress : ( address ) ? address : '',
          endPosition:  {
            lat: latValue,
            lng: lngValue
           },
          markerPosition: {
           lat: latValue,
           lng: lngValue
          },
          mapPosition: {
           lat: latValue,
           lng: lngValue
          },
         })
    };    
 
      render(){
      const AsyncMap = withScriptjs(
         withGoogleMap(
          props => (
           <GoogleMap google={this.props.google}
            defaultZoom={this.props.zoom}
            defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
           >
              
      <Marker google={this.props.google}
       name={'Dolores park'}
          draggable={true}
          onDragEnd={ this.onMarkerDragEnd }
             position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
      />
      <Marker />
     
      <InfoWindow
       onClose={this.onInfoWindowClose}
       position={{ lat: ( this.state.markerPosition.lat + 0.0018 ), lng: this.state.markerPosition.lng }}
      >
       <div>
        <span style={{ padding: 0, margin: 0 }}>{ this.state.address }</span>
       </div>
      </InfoWindow>
      <Autocomplete
       style={{
        width: '100%',
        height: '40px',
        paddingLeft: '16px',
        marginTop: '2px',
        marginBottom: '10px'
       }}
       apiKey='AIzaSyAkoe98NAkKlGghynXBqFjVdMrYK4RDoOI'
    //    onPlaceSelected={this.state.startaddress === '' ? this.onPlaceSelectedStart :this.onPlaceSelectedEnd }
    onPlaceSelected={this.onPlaceSelectedEnd }   
    types={['(regions)']}
      />
      </GoogleMap>
      )
         )
        );
      let map;
        if( this.props.center.lat !== undefined ) {
         map = <div>
           <div>
           <Button variant="primary" onClick={()=> this.onClick() }
            >
                CONFIRM INFO</Button> 
            {console.log("startstate",this.state.startaddress)}
            { console.log("endstate",this.state.endaddress)}
           
           
           <AsyncMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAkoe98NAkKlGghynXBqFjVdMrYK4RDoOI&libraries=places"
            //googleMapURL='https://maps.google.com/maps?q=London,%20United%20Kingdom&Roadmap&z=10&ie=UTF8&iwloc=&output=embed'
            loadingElement={
             <div style={{ height: `100%` }} />
            }
            containerElement={
             <div style={{ height: this.props.height }} />
            }
            mapElement={
             <div style={{ height: `100%` }} />
            }
           />

          <div className="form-group" style={{
        width: '100%',
        //height: '30px',
        //paddingLeft: '16px',
        marginTop: '100px',
        ///marginBottom: '100px'
       }}>
             <label htmlFor=""> Start Address</label>
             <input type="text" name="address" className="form-control" onChange={ this.onChangeStart } readOnly="readOnly" value={ this.state.startaddress } placeholder="Search for start location"/>
            </div>
            <div className="form-group">
             <label htmlFor="">End Address</label>
             <input type="text" name="address" className="form-control" onChange={ this.onChangeEnd } readOnly="readOnly"  value={ this.state.endaddress } placeholder="Search for end location"/>
            </div>
           </div>
          </div>
      } else {
         map = <div style={{height: this.props.height,backgroundColor:'blue'}} />
        }
        return( map )
       }
      }
      export default Map
