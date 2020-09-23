import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar , NavDropdown } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { NavLink , Link } from 'react-router-dom';
import '../index.css';
import { connect } from 'react-redux';
import { setLoggedInUserDetails } from "../actions/authedUser";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

class Navbar1 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : this.props.loggedUser ,
            error : this.props.loggedUser
        }
    }

    //LogsOut the user
    //Redirects him to Login page
    //sets loggedUser in store to { data : null , isError : ""}
    logOut = () =>{
        this.props.dispatch ( setLoggedInUserDetails ( null , "") );
    }
    
    render(){
        const guestLinks =(
            <React.Fragment>
                <NavLink activeStyle = {{color : "white"}} style={{ color: "white" }} activeClassName="chosen" className="nav-link" to="/home">HOME</NavLink>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <NavLink activeStyle = {{color : "white"}} style={{ color: "white" }} activeClassName="chosen" className="nav-link " to="/register">REGISTER</NavLink>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <NavLink activeStyle = {{color : "white"}} style={{ color: "white" }} activeClassName="chosen" className="nav-link " to="/login"><AccountCircleIcon />LOG IN</NavLink>
                &nbsp;&nbsp;&nbsp;&nbsp;
            </React.Fragment>
        );

        const loggedLinks =(
            <React.Fragment>
                <NavLink activeStyle = {{color : "white"}} activeClassName="chosen" className="nav-link" to="/addpost">Add a Post</NavLink>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <NavDropdown title="More" id="collasible-nav-dropdown">
                    <NavDropdown.Item >
                       <NavLink style={{color : "black"}} activeStyle = {{color : "black"}} activeClassName="chosen" className="nav-link" to="/myposts">My Posts</NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                       <NavLink style={{color : "black"}} activeStyle = {{color : "black"}} activeClassName="chosen" className="nav-link" to="/dashboard">Dashboard</NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item >
                        <NavLink style={{color : "black"}} onClick={()=>this.logOut()} activeStyle = {{color : "black"}} className="nav-link" to="/login">Logout</NavLink>
                    </NavDropdown.Item>
                </NavDropdown>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <NavLink activeStyle = {{color : "white"}} activeClassName="chosen" className="nav-link" to="/home">Home</NavLink>
                &nbsp;&nbsp;&nbsp;&nbsp;
            </React.Fragment>
        );
        //console.log("render navbar=",this.state.data , this.props.loggedUser.data ); bg="dark" variant="dark" 
        return (
            <React.Fragment>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Link to="/home">
                      <Navbar.Brand >Silk Road</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto navbar-list">
                            {this.props.loggedUser.data? loggedLinks : guestLinks}
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
  
  export default connect(mapStateToProps)(Navbar1);

