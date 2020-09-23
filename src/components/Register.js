import React from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import DocumentTitle from 'react-document-title';
import { handleRegisterUser, setMessageAction } from '../actions/authedUser';
import { Redirect } from 'react-router-dom' ;
import Spinner from 'react-bootstrap/Spinner';

class Register extends React.Component{
    constructor(){
        super();

        this.state = {
            form : {
                firstName : "",
                secondName : "",
                mobileNo : "",
                emailId : "",
                password : "",
            },
            formErrorMessage : {
                firstName : "",
                secondName : "",
                mobileNo : "",
                emailId : "",
                password : "",
            },
            formFieldsValid : {
                firstName : false,
                secondName : false,
                mobileNo : false,
                emailId : false,
                password : false,
            },
            errorMessage : "",
            successMessage : "",
            formValid : false,
            registerBtnClicked : false,
        }
    }

    handleChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        
        //console.log("in handle change=" ,this.props.Messages.errorMessage);
        if ( this.props.Messages.errorMessage.length > 0) //CHECKS IF ERROR IS RECIEVED FROM SERVER AND USER ISN'T ABLE TO REGISTER
        this.props.dispatch(setMessageAction( "" , "" )); //RESETS THE ERROR MESSAGE TO "" IF SO 
        
        var newForm = {
            ...this.state.form,
            [name] : value,
        };
        this.setState( {form : newForm} );
        this.handleValidations(name , value);
    }
    
    handleValidations = (name , value) =>{
        const { formErrorMessage , formFieldsValid  } = this.state;        
        // console.log(name,value.length);
        switch (name) 
        {
            case 'firstName':
                if(value.length===0){
                    formErrorMessage.firstName = "Field can't be left empty!";
                    formFieldsValid.firstName = false;
                }
                else{
                    formErrorMessage.firstName = "";
                    formFieldsValid.firstName = true;
                }
                break;
            case 'secondName':
                if(value.length===0){
                    formErrorMessage.secondName = "Field can't be left empty!";
                    formFieldsValid.secondName = false;
                }
                else{
                    formErrorMessage.secondName = "";
                    formFieldsValid.secondName = true;
                }
                break;
            case 'mobileNo':
                if(value.length===0){
                    formErrorMessage.mobileNo = "Field can't be left empty!";
                    formFieldsValid.mobileNo = false;
                }
                else if(!value.match(/^[0-9]{10}$/)){
                    formErrorMessage.mobileNo = "should contain only digits & should of 10 digits ";
                    formFieldsValid.mobileNo = false;
                }
                else if(value.length<10){
                    formErrorMessage.mobileNo = "Mobile number should be of 10 digits";
                    formFieldsValid.mobileNo = false;
                }
                else{
                    formErrorMessage.mobileNo = "";
                    formFieldsValid.mobileNo = true;
                }
                break;
            case 'password':
                if(value.length===0){
                    //console.log("if",name,value,value.length);
                    formErrorMessage.password = "Field can't be left empty!";
                    formFieldsValid.password = false;
                }
                else{
                    //console.log("else",name,value,value.length);
                    formErrorMessage.password = "";
                    formFieldsValid.password = true;
                }
                break;
            case 'emailId':
                if(value.length===0){
                    formErrorMessage.emailId = "Field can't be left empty!";
                    formFieldsValid.emailId = false;
                }
                else{
                    formErrorMessage.emailId = "";
                    formFieldsValid.emailId = true;
                }
                break;
            default :
            break;
        }
        if( formFieldsValid.firstName && formFieldsValid.secondName && formFieldsValid.mobileNo && formFieldsValid.emailId && formFieldsValid.password) 
        this.setState({formValid : true})
        else
        this.setState({formValid : false})
    }
componentDidUpdate = ( prevProps , prevState ) =>{
        console.log("im componentdidupdate prevProps " , prevProps.Messages.errorMessage );
        //When we click register button registerBtnClicked becomes true
        //So next time when it renders and successMessage aor errorMessage is changed
        //before render i want to change registerBtnClicked to false
        if ( prevProps !== this.props )
        this.setState( { registerBtnClicked : false } ) 
    }

    componentDidMount = () =>{
        this.props.dispatch( setMessageAction( "" , "") ) ;
    }



    render(){
        //console.log("im render" , this.props.Messages.errorMessage);
        const {formErrorMessage , formValid  } = this.state;
        //CONDITION TO CHECK IF USER HAS REGISTERED SUCCESSFULLY
        //1.) POP AN ALERT
        //2.) RESET THE WHOLE FORM TO NULL
        //3.) SETS MESSAGES TO "" AND ""
        //4.) REDIRECTS TO LOGIN
        if ( this.props.Messages.successMessage.length > 0 ){
            if ( this.state.registerBtnClicked ) 
            alert( this.props.Messages.successMessage ) ;
            //this.props.dispatch( setMessageAction ( "" , "" ) );
            return <Redirect push to="/login"/>
        }
        //LOGIN PAGE DISPLAY RENDER
        return(
            <React.Fragment>
                <DocumentTitle title = "Silk Road | Register"/>
                <div className = "container">
                    {/* {JSON.stringify(this.state.registerBtnClicked)} */}
                    <div className = "row align-items-center">
                        <div className="col-lg-8 offset-lg-2 col-md-9 offset-md-2 col-sm-6">
                            <h1 className="text-center card-header display-4" >Sign-Up</h1>
                            <form className="jumbotron card-body" onSubmit={this.handleSubmit}>
                                <div className="form-row ">
                                    <div className="col-md-6 mb-3">
                                        {/* <label for="firstName">First name</label> */}
                                        <input value={this.state.form.firstName} id="firstName" name="firstName" onChange={this.handleChange} type="text" className="form-control"  placeholder="First Name"/>
                                        <div className="valid-feedback">{formErrorMessage.firstName}</div>
                                        <p id="firstName" name="firstName" className="text-danger">{formErrorMessage.firstName}</p>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        {/* <label>Second Name</label> */}
                                        <input value={this.state.form.secondName} id="secondName" name="secondName" onChange={this.handleChange} type="text" className="form-control" placeholder="Second Name"/>
                                        <div className="valid-feedback">{formErrorMessage.secondName}</div>
                                        <p id="secondName" name="secondName" className="text-danger">{formErrorMessage.secondName}</p>
                                    </div>
                                </div>
                                <div className="form-group">
                                    {/* <label>Mobile Number</label> */}
                                    <input value={this.state.form.mobileNo} id="mobileNo" name="mobileNo" onChange={this.handleChange} type="tel" pattern="^[0-9]{10}$"  className="form-control" placeholder="Mobile Number"/>
                                    <div className="valid-feedback">{formErrorMessage.mobileNo}</div>
                                    <p id="mobileNo" name="mobileNo" className="text-danger">{formErrorMessage.mobileNo}</p>
                                </div>
                                <div className="form-group">
                                    {/* <label>Email Id</label> */}
                                    <input value={this.state.form.emailId} id="emailId" name="emailId" onChange={this.handleChange} type="email"  className="form-control" placeholder="Email Id"/>
                                    <div className="valid-feedback">{formErrorMessage.emailId}</div>
                                    <p id="emailId" name="emailId" className="text-danger">{formErrorMessage.emailId}</p>
                                </div>
                                <div className="form-group">
                                    {/* <label>Password</label> */}
                                    <input value={this.state.form.password} id="password" name="password" onChange={this.handleChange} type="password" className="form-control" placeholder="Password"/>
                                    <div className="valid-feedback">{formErrorMessage.password}</div>
                                    <small id="passwordHelpBlock" className="form-text text-muted">
                                    Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                                    </small>
                                    <p id="password" name="password" className="text-danger">{formErrorMessage.password}</p>
                                </div>
                                <div className="form-group">
                                    <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="invalidCheck2" required/>
                                        <label className="form-check-label" htmlFor="invalidCheck2">
                                            Agree to terms and conditions
                                        </label>
                                    </div>
                                </div>
                                <div className = "text-center">
                                    { (!this.state.registerBtnClicked) ? 
                                    <button type="submit" className="btn btn-primary btn-block" disabled={!formValid} >Register</button> 
                                    : 
                                    <Spinner as="span" animation="border" size="md" variant="danger" role="status" aria-hidden="true"/> }
                                </div>
                                <span id="errorMessage" disabled className="text-danger display-6"><em>{this.props.Messages.errorMessage}</em></span>
                                <span id="successMessage" disabled className="text-success display-6"><em>{this.props.Messages.successMessage}</em></span>
                            </form>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

function mapStateToProps({ Messages }) {
    console.log("im mapstate to props");
    return {
      Messages,
    }
  }
  
  export default connect(mapStateToProps)(Register);