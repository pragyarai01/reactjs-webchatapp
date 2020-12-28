import {Component} from "react";
import React from "react";
import { Button,Modal } from 'react-bootstrap';
import placeholder from './placeholder.png';
import rightarrow from './rightarrow.png';
import Map from './Map';
import history from './history';

class Mileage extends Component {
    constructor(){
        super();
        this.state = {
            showHide : false,
            showMap : false,
            inputname :null,
            inputstart :null,
            inputend :null
        }
    }
    componentDidMount(){
        console.log("form props",this.props)
    }

    onChangeName(e) {
        // if(this.props.location.state.showplus){
            this.setState({inputname: e.target.value});
        // }else{
        //     this.setState({inputname: this.props.location.state.name});
        // }
        
    }

    onChangeStart(e) {
        this.setState({inputstart: e.target.value});
    }

    onChangeEnd(e) {
        this.setState({inputend: e.target.value});
    }

    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
    }
    showMap(){
        console.log("in mapppppp")
        return <div style={{ margin : '100px'}}>
        <Map google={this.props.google}
                center={{lat: 18.5204, lng: 73.8567}}
                height='300px'
                zoom={15}
               /></div>
        
    }
    // onClick(e){
    //     e.preventDefault();
        
    //     this.setState({showmap: true,showHide:false})
    //     // console.log("showplus",this.state.showplus)
    //     // console.log("showform",this.state.showform)
    //   }
    render(){
        return(
            <div className="mileage" >
                
                <Button id="demo" onClick={() => this.handleModalShowHide()}>
                <img src={placeholder} alt='some value'  />
                <text> Mileage</text>   
                </Button>
                <Modal show={this.state.showHide}>
                    <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                    <Modal.Title>
                    <img src={placeholder} alt='some value'  />
                    Mileage
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <p>NAME</p>
                    <input id="modal-input" placeholder="Enter your name" type="text" onChange={e => this.onChangeName(e)}/>
                    </Modal.Body>
                    <Modal.Body>
                    <p>START LOCATION</p>
                    <input id="modal-input" placeholder="Select Start location" type="text" onChange={e => this.onChangeStart(e)} />
                    <img src={rightarrow} alt='some value' onClick={() => history.push('/map',{name:this.state.inputname})} />
                    
                    </Modal.Body>
                    <Modal.Body>
                    <p>END LOCATION</p>
                    <input id="modal-input" placeholder="Select End location" type="text" onChange={e => this.onChangeEnd(e)} />
                    <img src={rightarrow} alt='some value' onClick={() => history.push('/map',{name:this.state.inputname})}  />
                    </Modal.Body>
                    <Modal.Footer>
                        {console.log("nameee",this.state.inputname)}
                    <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => this.handleModalShowHide()}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
                
                {/* {this.state.showmap && this.showMap()} */}
            </div>
        )
    }
    
}

//     render() {
//       return (
//         <div className="Data"> 
//         <form id="data-form" >
//             <button>Create</button>
//             <button>Create2</button>
//        </form>
       
//    </div>
//       );
//     }
  
  
  export default Mileage;