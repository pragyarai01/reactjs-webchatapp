import {Component} from "react";
import React from "react";
import { Card,ListGroup } from 'react-bootstrap';
import placeholder from './placeholder.png';
//import history from './history';

class Cardcomponent extends Component {
    constructor(){
        super();
        this.state = {
           
        }
    }
    componentDidMount(){
        console.log("Card props",this.props)
    }

    onChange(e) {
            this.setState({[e.target.value]: e.target.value});
    }

    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
    }

    render(){
        return(
            <div style={{float:'right',marginTop:'10px',display:'flex',flexDirection:'row-reverse'}}>
                <div className="myavatar" style={{backgroundColor:'orangered'}}></div>
                <Card style={{ width: '18rem',marginTop:'10px' }}>
                   <Card.Header><img src={placeholder} alt='some value'  />
                    Mileage</Card.Header>
                   <ListGroup variant="flush">
                   <ListGroup.Item><label htmlFor="">NAME</label>
                    <input style={{border:0}} type="text" name="name" className="form-control" onChange={e=> this.onChange(e) } readOnly="readOnly" value={this.props.navigation.name}/></ListGroup.Item>
                   <ListGroup.Item><label htmlFor="">START LOCATION</label>
                    <input style={{border:0}} type="text" name="start" className="form-control" onChange={e=> this.onChange(e) } readOnly="readOnly" value={this.props.navigation.startadd}/></ListGroup.Item>
                   <ListGroup.Item><label htmlFor="">END LOCATION</label>
                    <input style={{border:0}} type="text" name="end" className="form-control" onChange={e=> this.onChange(e) } readOnly="readOnly" value={this.props.navigation.endadd}/></ListGroup.Item>
                    <ListGroup.Item><div class="main">
                         <div class="left"><text >MILEAGE</text></div>
                         <div class="right"><text>{this.props.navigation.mileage} miles</text></div>
                    </div></ListGroup.Item>
                   </ListGroup>
                   {/* <Card.Footer>
                   <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => this.handleModalShowHide()}>
                        Save Changes
                    </Button>
                   </Card.Footer> */}
                </Card>
            </div>
        )
    }
    
}

  
  export default Cardcomponent;