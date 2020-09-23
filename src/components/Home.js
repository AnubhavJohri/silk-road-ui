import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DocumentTitle from 'react-document-title';
//import { Redirect } from 'react-router-dom';
import { Dropdown , DropdownButton } from 'react-bootstrap';
import { connect } from 'react-redux';
import { handleGetAllPosts } from "../actions/authedPost";
import LoadingBar from 'react-top-loading-bar';
import Comments from './Comments';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           showComments : false
        }
        //console.log("im constructor===== " , this.props.allPosts);
    }

    //1.)
    //GETS ALL POSTS FROM THE SERVICE
    //STORES ALL POSTS IN REDUX STORE
    componentDidMount = () => {
        this.LoadingBar.continuousStart(20);
        handleGetAllPosts(this.props.dispatch);
        //console.log("componentDidMount home allPosts=",this.props.allPosts);
    }

    //2.)
    //DISPLAYS ALL POSTS IN FORM OF CARDS
    DisplayPostsInCards = ( posts ) => {
        return (
            posts.map((p, index) => {
                return (
                    <React.Fragment key = {index}>
                        <div className = "col-lg-12 col-md-12 col-sm-12" key = {index}>
                            <div className="card">
                                <div className="card-header">
                                    <span className = "card-title display-4"><b>{p.postTitle}</b></span>
                                    <br/>
                                    <span><em>About : {p.postDescription} </em> </span>
                                    <br/>
                                    <span ><em>Author : {p.postAuthorName}</em></span>
                                </div>
                                <div className="card-body">
                                <p>
                                    <b>Post :</b>
                                    <br/>
                                    {p.post} 
                                </p>
                                <div style = {{ textAlign : "right" }}>
                                    <span ><em>Written on {p.postTime.toLocaleString()}</em></span>
                                </div>
                                </div>
                                {/* -----------------------------------ADD COMMENTS HERE----------------------------------- */}
                                {/* <span onClick={()=>this.setState({showComments:true})} className="display-6">Comments</span>
                                {this.state.showComments?<Comments comments={p.postComments}/>:<span></span>} */}
                            </div>
                        </div>
                        <br/>
                    </React.Fragment>
                )
            })
        )
    }


    render() {
        //CONDITION TO STOP LOADING BAR FROM LOADING 
        console.log("==",this.props.Messages.errorMessage.length);     
        if( this.LoadingBar && this.props.Messages.errorMessage.length > 0 )
        this.LoadingBar.complete(); //1 TO STOP IF AN ERROR MESSAGE IS RECIEVED FROM THE SERVER
        else if( this.LoadingBar &&  this.props.allPosts )
        this.LoadingBar.complete(); //2 TO STOP IF ALL POSTS ARE RECIEVED AS THEY SHOULD

        return (
            <React.Fragment>
                {/* {JSON.stringify(this.props.allPosts)} */}
                <div className="container-fluid">
                    <DocumentTitle title="Silk Road | Home" />
                    <LoadingBar height={5} color='white' onRef={ref => (this.LoadingBar = ref)}/>
                    <div className="row">
                        <div className="col-lg-2 col-md-2 col-sm-0" ></div>
                        <div className="col-lg-7 col-md-7 col-sm-12" style={{ background: "lightblue" }}>
                            {this.props.allPosts ? this.DisplayPostsInCards(this.props.allPosts) : this.props.Messages.errorMessage.length>0 ? <h1 className="display-3">{this.props.Messages.errorMessage}</h1>  : <h1 className="display-3">Loading...</h1>}
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12" ></div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


function mapStateToProps({ loggedUser, allPosts , Messages }) {
    console.log("im home mapstateto props=", Messages);
    return {
        loggedUser,
        allPosts ,
        Messages
    }
}

export default connect(mapStateToProps)(Home);