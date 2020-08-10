import React, { Component } from 'react';
import {Navbar} from 'react-bootstrap'
import { withRouter} from "react-router-dom";
import './style.css'
class NavBar extends Component {
   
     
    constructor(props)
    {
        super(props)
        this.state = {  }
        this.openRoom=this.openRoom.bind(this);
    }
    handleClick(id,href){
        
          this.props.history.push(href);
         this.setState({activeid:id});
       
         
         
    };

    openRoom()
    {
        this.props.mode(2);
    }
    componentDidUpdate()
    {
        
    }
    
    render() { 
        return (
            

            <Navbar className='nav_fixed navbar navbar-sticky marzero'>
  <Navbar.Brand  onClick={this.openRoom}><h1> Join Room</h1></Navbar.Brand>
  
  <Navbar.Collapse className="justify-content-end">
    
 
  </Navbar.Collapse>
</Navbar>
        );
    }
}
 
export default withRouter(NavBar);