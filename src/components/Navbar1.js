import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar , NavDropdown } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { NavLink , Link } from 'react-router-dom';
import '../index.css';
import { connect } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

class Navbar2 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : null ,
            error : ""
        }
    }
    
    render(){
        return (
            <React.Fragment>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Link to="/home">
                      <Navbar.Brand >Silk Road</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            <NavLink activeStyle = {{color : "white"}} style={{ color: "white" }} activeClassName="chosen" className="nav-link" to="/home">HOME</NavLink>
                            <NavLink activeStyle = {{color : "white"}} style={{ color: "white" }} activeClassName="chosen" className="nav-link " to="/register">REGISTER</NavLink>
                            <NavLink activeStyle = {{color : "white"}} style={{ color: "white" }} activeClassName="chosen" className="nav-link " to="/login"><AccountCircleIcon />LOG IN</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                    </Navbar>
              
            </React.Fragment>
        );
    }
}


function mapStateToProps({ loggedUser }) {
    //console.log("im mapstatetoprops");
    return {
      loggedUser,
    }
  }
  
  export default connect(mapStateToProps)(Navbar2);




















