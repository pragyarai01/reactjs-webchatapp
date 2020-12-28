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
         city: '',
         area: '',
         state: '',
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
          const address = response.results[0].formatted_address,
           addressArray =  response.results[0].address_components,
           city = this.getCity( addressArray ),
           area = this.getArea( addressArray ),
           state = this.getState( addressArray );
         
          console.log( 'city', city, area, state );
        
          this.setState( {
           address: ( address ) ? address : '',
           startaddress : ( address ) ? address : '',
           area: ( area ) ? area : '',
           city: ( city ) ? city : '',
           state: ( state ) ? state : '',
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
         this.state.address !== nextState.address ||
         this.state.city !== nextState.city ||
         this.state.area !== nextState.area ||
         this.state.state !== nextState.state
        ) {
         return true
        } else if ( this.props.center.lat === nextProps.center.lat ){
         return false
        }
       }
       getCity = ( addressArray ) => {
        let city = '';
        for( let i = 0; i < addressArray.length; i++ ) {
         if ( addressArray[ i ].types[0] && 'administrative_area_level_2' === addressArray[ i ].types[0] ) {
          city = addressArray[ i ].long_name;
          return city;
         }
        }
       };

       getArea = ( addressArray ) => {
        let area = '';
        for( let i = 0; i < addressArray.length; i++ ) {
         if ( addressArray[ i ].types[0]  ) {
          for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
           if ( 'sublocality_level_1' === addressArray[ i ].types[j] || 'locality' === addressArray[ i ].types[j] ) {
            area = addressArray[ i ].long_name;
            return area;
           }
          }
         }
        }
       };
      
       getState = ( addressArray ) => {
        let state = '';
        for( let i = 0; i < addressArray.length; i++ ) {
         for( let i = 0; i < addressArray.length; i++ ) {
          if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
           state = addressArray[ i ].long_name;
           return state;
          }
         }
        }
       };
    //    rad(x){
    //     return x * Math.PI / 180;
    // }
    //   getDistance(p1, p2){
    //     var R = 6378137; // Earth’s mean radius in meter
    //     var dLat = this.rad(p2.lat() - p1.lat());
    //     var dLong = this.rad(p2.lng() - p1.lng());
    //     var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + 
    //             Math.cos(this.rad(p1.lat())) * Math.cos(this.rad(p2.lat())) *
    //             Math.sin(dLong / 2) * Math.sin(dLong / 2);
    //     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //     var d = (R * c) / 1609  ;
    //     return Math.round(d); 
    // }
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
     newLng = event.latLng.lng(),
     addressArray = [];
  Geocode.fromLatLng( newLat , newLng ).then(
     response => {
      const address = response.results[0].formatted_address,
       addressArray =  response.results[0].address_components,
       city = this.getCity( addressArray ),
       area = this.getArea( addressArray ),
       state = this.getState( addressArray );
  this.setState( {
       address: ( address ) ? address : '',
       area: ( area ) ? area : '',
       city: ( city ) ? city : '',
       state: ( state ) ? state : ''
      } )
     },
     error => {
      console.error(error);
     }
    );
   };

 onPlaceSelectedStart = ( place ) => {
     console.log("place",place)
    const address = place.formatted_address,
       addressArray =  place.address_components,
       city = this.getCity( addressArray ),
       area = this.getArea( addressArray ),
       state = this.getState( addressArray ),
       position = place.geometry.location,
       latValue = place.geometry.location.lat(),
       lngValue = place.geometry.location.lng();
    // Set these values in the state.
      this.setState({
       address: ( address ) ? address : '',
       startaddress : ( address ) ? address : '',
       area: ( area ) ? area : '',
       city: ( city ) ? city : '',
       state: ( state ) ? state : '',
       startPosition: position,
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
onPlaceSelectedEnd = ( place ) => {
        console.log("place",place)
       const address = place.formatted_address,
          addressArray =  place.address_components,
          city = this.getCity( addressArray ),
          area = this.getArea( addressArray ),
          state = this.getState( addressArray ),
          latValue = place.geometry.location.lat(),
          lngValue = place.geometry.location.lng();
       // Set these values in the state.
         this.setState({
          address: ( address ) ? address : '',
          endaddress : ( address ) ? address : '',
          area: ( area ) ? area : '',
          city: ( city ) ? city : '',
          state: ( state ) ? state : '',
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
               {/*Marker*/}
      <Marker google={this.props.google}
       name={'Dolores park'}
          draggable={true}
          onDragEnd={ this.onMarkerDragEnd }
             position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
      />
      <Marker />
      {/* InfoWindow on top of marker */}
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
           {/* onClick={() => history.push('/',{name: this.props.navigation.name,startadd:this.state.startaddress,endadd:this.state.endaddress})}  */}
           {/* <Button variant="secondary" onClick={() => history.goBack({steeee:"yes"})} >Select</Button> */}
           <Button variant="primary" onClick={()=> this.onClick() }
            >
                CONFIRM INFO</Button> 
            {/* <div className="form-group">
             <label htmlFor="">City</label>
             <input type="text" name="city" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.city }/>
            </div>
            <div className="form-group">
             <label htmlFor="">Area</label>
             <input type="text" name="area" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.area }/>
            </div>
            <div className="form-group">
             <label htmlFor="">State</label>
             <input type="text" name="state" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.state }/>
            </div> */}
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
