import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DocumentTitle from 'react-document-title';
import Clock, { } from '../Clock';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userData:this.props.loggedUser.data,
            path:"",
            redirect:false
        };
        //console.log("im constructor home.js",this.state.userData);
    }

    render () {
        //Case 0 : Used to redirect to any general path on click of any button/link
        if(this.state.redirect){
            return <Redirect to={this.state.path}/>
        }
        //Case 1: Displays this part only when user isn't Logged in
        if(!this.state.userData)
        {
            return(
                <React.Fragment>
                    <DocumentTitle title="Silk Road | Dashboard"/>
                    <div className="text-center" style={{marginTop : "150px"}}>
                        <h1 className="display-3">You're not Logged In!</h1>
                    </div>
                    <br/>
                    <div className="text-center ">
                        <button type="button" className="btn btn-primary" onClick={()=>this.setState({path:'/login' , redirect:true})}  >Go to Login Page</button>
                    </div>
                </React.Fragment>
            )
        }
        //Case 2 : Displays when the user is Logged In
        return(
            <React.Fragment>
                <DocumentTitle title = "Silk Road | Dashboard"/>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-6 col-sm-4">
                            <h1 className ="display-3">
                                Hey {this.state.userData.userFirstName} !
                            </h1>
                            <Clock/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps({ loggedUser }) {
    return {
      loggedUser,
    }
  }
  
  export default connect(mapStateToProps)(Dashboard);