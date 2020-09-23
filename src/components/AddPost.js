import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DocumentTitle from 'react-document-title';
//import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleAddPost, handleGetAllPosts } from '../actions/authedPost';
import LoadingBar from 'react-top-loading-bar';
import { setMessageAction } from '../actions/authedUser';
import Spinner from 'react-bootstrap/Spinner';


class AddPost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form : {
                title : "" ,
                description : "" ,
                post : "" ,
                anonymous : false
            } ,
            formErrorMessage : {
                title : "" ,
                description : "" ,
                post : "" ,
            } ,
            formFieldsValid : {
                title : "" ,
                description : "" ,
                post : "" ,
            } ,
            formValid : false ,
            successMessage: "",
            errorMessage: "" ,
            registerBtnClicked : false
        }
    }


    handleChange = (event) => {
        const name = event.target.name;
        var value = event.target.value;

        if ( this.state.errorMessage.length !=0 )//ON RECIEVING ERROR MESSAGE WHEN USER CHANGES ANY INFO ERROR MESSAGE SHOUL DISAPPEAR
        this.setState( { errorMessage : "" } ) ;

        if( name === "anonymous" )
        value = event.target.checked ;
        var newForm = {
            ...this.state.form,
            [name]: value,
        };
        this.setState({ form: newForm });
        this.handleValidations(name, value);
    }

    handleValidations = (name , value) =>{
        const { formErrorMessage , formFieldsValid  } = this.state;        
        // console.log(name,value.length);
        switch (name) 
        {
            case 'title':
                if(value.length===0){
                    formErrorMessage.title = "Please Enter a Title for your Post!";
                    formFieldsValid.title = false;
                }
                else{
                    formErrorMessage.title = "";
                    formFieldsValid.title = true;
                }
                break;
            case 'description':
                if(value.length===0){
                    formErrorMessage.description = "Please Enter a Description for your Post!";
                    formFieldsValid.description = false;
                }
                else if(value.length<5){
                    formErrorMessage.description = "Length of the description can't be lesser than 5 alphabets";
                    formFieldsValid.description = false;
                }
                else if( value.length>60){
                    formErrorMessage.description = "Length of the description can't be greater than 60 alphabets";
                    formFieldsValid.description = false;
                }
                else{
                    formErrorMessage.description = "";
                    formFieldsValid.description = true;
                }
                break;
            case 'post':
                if(value.length===0){
                    formErrorMessage.post = "Field can't be left empty!";
                    formFieldsValid.post = false;
                }
                else if(value.length<10){
                    formErrorMessage.post = "Length of the post can't be lesser than 10 alphabets";
                    formFieldsValid.post = false;
                }
                else if(value.length>240){
                    formErrorMessage.post = "Length of the description can't be greater than 240 alphabets";
                    formFieldsValid.post = false;
                }
                else{
                    formErrorMessage.post = "";
                    formFieldsValid.post = true;
                }
                break;
            default :
            break;
        }
        if( formFieldsValid.title && formFieldsValid.description && formFieldsValid.post) 
        this.setState({formValid : true})
        else
        this.setState({formValid : false})
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        var post = {};
        
        this.setState ( { registerBtnClicked : true } )
        if( this.state.form.anonymous )
        post["postAuthorName"] = "Anonymous";
        else
        post["postAuthorName"] = this.props.loggedUser.data.userFirstName +" "+ this.props.loggedUser.data.userSecondName ;
        post["userId"] = this.props.loggedUser.data.userId ;
        post["postDescription"] = this.state.form.description ;
        post["post"] = this.state.form.post ; 
        post["postTitle"] = this.state.form.title ;
        this.LoadingBar.continuousStart(20); // START LOADING BAR WHILE WAITING FOR THE RESPONSE FROM SERVER
        handleAddPost( this.props.dispatch , post ) // SENDING THE POST TO BE POSTED TO THE SERVER
        .then ( success => this.setState( { successMessage : success } , () => {
            this.LoadingBar.complete() ;       //STOP LOADING BAR ON RECIEVING SUCCESS MESSAGE
            alert(this.state.successMessage) ; //TO DISPLAY THE SUCCESS MESSAGE VIA ALERT
            handleGetAllPosts( this.props.dispatch ) ;
            let newForm = {} ;
            newForm["title"] = "" ;
            newForm["description"] = "" ;
            newForm["post"] = "" ;
            this.setState ( { form : newForm , successMessage : "" , registerBtnClicked : false} ) ; //ON RECIEVING SUCCESS MESSAGE RESET THE FORM
        } ) ) 
        .catch ( err => this.setState ( { errorMessage : err.message }  , () => {
            this.LoadingBar.complete()
            this.setState ( { registerBtnClicked : false} ) ;
        }) )  
    }


    render() {
        const { formValid } = this.state ;
        //Case 0 : Used to redirect to any general path on click of any button/link
        if (this.state.redirect) {
            return <Redirect to={this.state.path} />
        }
        //CASE 0 
        //IF USER IS NOT LOGGED IN THIS IF CONDITION WILL RENDER
        if (!this.props.loggedUser.data) {
            return (
                <React.Fragment>
                    <DocumentTitle title="Silk Road | Write Post" />
                    <div className="text-center" style={{ marginTop: "150px" }}>
                        <h1 className="display-3">You're not Logged In!</h1>
                    </div>
                    <br />
                    <div className="text-center ">
                        <button type="button" className="btn btn-primary" onClick={() => this.setState({ path: '/login', redirect: true })}  >Go to Login Page</button>
                    </div>
                </React.Fragment>
            )
        }
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                    <DocumentTitle title="Silk Road | Write Post" />   
                    <LoadingBar height={5} color='white' onRef={ref => (this.LoadingBar = ref)}/>
                        <div className="col-lg-7 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                            <h1 className="display-3 text-center">Write Post</h1>
                            <form onSubmit = {this.handleSubmit}>
                            <div  className="form-group">
                                <label className="form-label">Title</label>
                                <input value = { this.state.form.title } id="title" name="title" onChange={this.handleChange} className="form-control"></input>
                                <span className="text-danger">{this.state.formErrorMessage.title}</span>
                            </div>
                            <div  className="form-group">
                                <label htmlFor="description" className="form-label">About</label>
                                <input value = { this.state.form.description } id="description" name="description" onChange={this.handleChange} className="form-control"></input>
                                <span className="text-danger">{this.state.formErrorMessage.description}</span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="post" className="form-label">Post</label>
                                <textarea value = { this.state.form.post } id="post" name="post" rows="5" onChange={this.handleChange} className="form-control"></textarea>
                                <span className="text-danger">{this.state.formErrorMessage.post}</span>
                            </div>
                            <div className="form-group">
                                <div className="form-check">
                                    <input className="form-check-input" name="anonymous" onChange={this.handleChange} type="checkbox" value="" id="invalidCheck2" />
                                    <label className="form-check-label" htmlFor="invalidCheck2">
                                        Anonymous
                                    </label>
                                </div>
                            </div>
                            
                            <div className = "text-center">
                                { (!this.state.registerBtnClicked) ? 
                                <button type="submit" className="btn btn-primary btn-block" disabled={!formValid} > Post </button> 
                                : 
                                <Spinner as="span" animation="border" size="md" variant="danger" role="status" aria-hidden="true"/> }
                            </div>
                            
                            <div className = "text-center">
                                <span className="text-success">{this.state.successMessage}</span>
                                <br/>
                                <span className="text-danger">{this.state.errorMessage}</span>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}


function mapStateToProps({ loggedUser, Messages }) {
    return {
        loggedUser,
        Messages
    }
}
//connect is a container component that fetches the updated state from the redux store
//and passes the state to props to presentational components
export default connect(mapStateToProps)(AddPost);

