import {Component} from "react";
import React from "react";
import { Button,Modal } from 'react-bootstrap';
import placeholder from './placeholder.png';
//import  Cardcomponent  from "./Cardcomponent";
import history from './history';

class Dialog extends Component {
    constructor(){
        super();
        this.state = {
            showHide : true,
            
        }
    }
    componentDidMount(){
        console.log("Dialog props",this.props)
    }

    onChange(e) {
            this.setState({[e.target.value]: e.target.value});
    }

    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
    }

    renderCard(){
        console.log("propsssss",this.props)
        // this.setState({ showHide: !this.state.showHide })
        // if(this.props.navigation!== undefined && this.props.navigation.showinfo === true){
        //   return <Cardcomponent navigation = {this.props.location.state} />
          history.push('/',{showinfo:true,name: this.props.location.state.name,startadd:this.props.location.state.startadd,endadd:this.props.location.state.endadd,mileage: this.props.location.state.mileage})
        //   return <Cardcomponent navigation = {this.props.navigation} />
        // }
      }
      handleCancel(){
        console.log("propsssss",this.props)
        //this.setState({ showHide: !this.state.showHide })
        // if(this.props.navigation!== undefined && this.props.navigation.showinfo === true){
        //   return <Cardcomponent navigation = {this.props.location.state} />
          history.push('/')
        //   return <Cardcomponent navigation = {this.props.navigation} />
        // }
      }
    // onClick(e){
    //     e.preventDefault();
        
    //     this.setState({showmap: true,showHide:false})
    //     // console.log("showplus",this.state.showplus)
    //     // console.log("showform",this.state.showform)
    //   }
    render(){
        return(
            <div >
                <div className="App-header">
                  <h1>Chat App</h1>
                </div>
                {/* <Button id="demo" onClick={() => this.handleModalShowHide()}>
                <img src={placeholder} alt='some value'  />
                <text> Mileage</text>   
                </Button> */}
                <Modal show={this.state.showHide}>
                    <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                    <Modal.Title>
                    <img src={placeholder} alt='some value'  />
                    Mileage
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <label htmlFor="">NAME</label>
                    <input style={{border:0}} type="text" name="name" className="form-control" onChange={e=> this.onChange(e) } readOnly="readOnly" value={this.props.location.state.name}/>
                    {/* <input id="modal-input" placeholder="Enter your name" type="text" onChange={e => this.onChangeName(e)}/> */}
                    <label htmlFor="">START LOCATION</label>
                    <input style={{border:0}} type="text" name="start" className="form-control" onChange={e=> this.onChange(e) } readOnly="readOnly" value={this.props.location.state.startadd}/>
                    <label htmlFor="">END LOCATION</label>
                    <input style={{border:0}} type="text" name="end" className="form-control" onChange={e=> this.onChange(e) } readOnly="readOnly" value={this.props.location.state.endadd}/>
                    </Modal.Body> 
                    {/* <Modal.Body>
                    <div class="main">
                         <div class="left"><text >MILEAGE</text></div>
                         <div class="right"><text>{this.props.navigation.mileage} miles</text></div>
                    </div>
                    </Modal.Body>
                    {/* <div style={{backgroundColor:'Green',padding:'15px',alignItems: 'center',justifyContent:'space-between',alignContent:'center'}}>
                    <text>MILEAGE</text>
                    <text>{this.props.navigation.mileage} miles</text> */}
                    {/* <input style={{border:0}} type="text" name="mileage" className="form-control" onChange={e=> this.onChange(e) } readOnly="readOnly" value={this.props.navigation.mileage}/> */}
                    {/* </div> */}
                    
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.handleCancel()}>
                        CANCEL
                    </Button>
                    <Button variant="primary" onClick={() => this.renderCard()}>
                        SEND
                    </Button>
                    </Modal.Footer>
                </Modal>
                
                {/* {this.state.showmap && this.showMap()} */}
            </div>
        )
    }
    
}

  
  export default Dialog;