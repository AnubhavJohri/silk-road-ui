import React from 'react';
import { connect } from 'react-redux';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import 'bootstrap/dist/css/bootstrap.min.css';
import DocumentTitle from 'react-document-title'
import { Redirect} from 'react-router-dom';
import { handleSetAuthedUser,  setLoggedInUserDetails, setMessageAction  } from "../actions/authedUser";
import {  handleGetAllPosts } from "../actions/authedPost";
import LoadingBar from 'react-top-loading-bar';


function Copyright() {
return (
<Typography variant="body2" color="textSecondary" align="center" >
    {'Copyright © '}
    <Link color="inherit" href="https://material-ui.com/">
    Silk Road pvt ltd.
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
</Typography>
);
}



class Login extends React.Component{
constructor(props){
    super(props);
    this.state={
        form : {
            userName : "",
            userPass : "",
        },
        formFieldsValid : {
            userName : false,
            userPass : false,
        },
        formErrorMessage : {
            userName : "",
            userPass : "",
        },
        formValid : false,
        errorMessage : this.props.loggedUser.isError,
        redirectHome : false
    }
}

handleChange = (event) =>{
    this.props.dispatch ( setLoggedInUserDetails ( null , "") ); //SO THAT ON RECIEVING ERROR WHEN USER STARTS TYPING AGAIN MESSAGE IS GONE
    const name = event.target.name;
    const value = event.target.value;
    var newForm = {
        ...this.state.form,
        [name] : value,
    };
    this.setState( {form : newForm} );
    this.handleValidations(name , value);
}

handleValidations = (name , value) =>{
    const { formErrorMessage , formFieldsValid  } = this.state;
    switch (name) 
    {
        case 'userName':
            if(value.length===0){
                formErrorMessage.userName = "Field can't be left empty!";
                formFieldsValid.userName = false;
            }
            else{
                formErrorMessage.userName = "";
                formFieldsValid.userName = true;
            }
            break;
        case 'userPass':
            if(value.length===0){
                formErrorMessage.userPass = "Field can't be left empty!";
                formFieldsValid.userPass = false;
            }
            else{
                formErrorMessage.userPass = "";
                formFieldsValid.userPass = true;
            }
            break;
        default :
        break;
    }
    if( formFieldsValid.userName && formFieldsValid.userPass)
    this.setState({formValid : true})
    else
    this.setState({formValid : false})
}

handleSubmit = (e) =>{
    e.preventDefault(); 
    this.LoadingBar.continuousStart(20);
    handleSetAuthedUser(this.props.dispatch , this.state.form );
}

componentDidMount = () =>{
    console.log("im login didmount");
    this.props.dispatch( setMessageAction( "" , "") ) ;
    handleGetAllPosts(this.props.dispatch);
}

render(){
    const { formValid , formErrorMessage  } = this.state;
    //CONDITION TO REDIRECT TO DASHBOARD ONCE THE USER HAS LOGGED IN
    if( this.props && this.props.loggedUser.data )
    {
        this.LoadingBar.complete();
        return <Redirect to="/dashboard"/>
    }
    //CONDITION TO STOP LOADING BAR FROM LOADING ONCE 
    //ERROR MESSAGE IS RECIEVED FROM THE SERVER
    if( this.LoadingBar && this.props.loggedUser.isError.length > 0)       
    this.LoadingBar.complete(); //STOPS THE LOADING BAR
    return(
        <React.Fragment>
            <DocumentTitle title="Silk Road | Login"/>
                <div className="container-fluid"   >
                    <div className="row" style={{ backgroundColor : '#E0E0E0'}}>
                        <div className="col-lg-8 col-md-12 col-sm-12">
                            <img src="./assets/images/loginPageWallpaper.jpg" alt="Login" className="img-fluid"  />
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12" style={{marginTop : '100px' }}>
                            {/* LOADING BAR ON TOP */}
                            <LoadingBar height={5} color='white' onRef={ref => (this.LoadingBar = ref)}/>
                            <h1 className="text-center display-4" >Sign-In</h1>
                            <form className=" card-body" onSubmit={this.handleSubmit} >
                                <div className="form-group">
                                    <label><em><b>Username</b></em></label>
                                    <input value = {this.state.form.userName} id="userName" name="userName" onChange={this.handleChange} type="text" className="form-control" placeholder="Enter The Username"/>
                                    <p id="userName" name="userName" className="text-danger">{formErrorMessage.userName}</p>
                                </div>
                                <div className="form-group">
                                    <label><em><b>Password</b></em></label>
                                    <input value = {this.state.form.userPass} id="userPass" name="userPass" onChange={this.handleChange} type="password" className="form-control" placeholder="Enter The Password"/>
                                    <p id="userPass" name="userPass" className="text-danger">{formErrorMessage.userPass}</p>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block" disabled={!formValid} style={{ marginTop : '30px' }}>Login</button>
                                <span id="errorMessage" className="text-danger display-6"><em>{this.props.loggedUser.isError}</em></span>
                                <span id="serverErrorMessage" className="text-danger display-6"><em>{this.props.Messages.errorMessage}</em></span>
                            </form>
                            <Copyright/>
                        </div>
                    </div>
                </div>
        </React.Fragment>
    );
}
}

function mapStateToProps({ loggedUser ,Messages }) {
    return {
      loggedUser,
      Messages
    }
  }
  
  export default connect(mapStateToProps)(Login);


