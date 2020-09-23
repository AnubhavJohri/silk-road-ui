import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DocumentTitle from 'react-document-title';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleDeletePost, handleGetAllPosts } from '../actions/authedPost';


class MyPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            successMessage : "" ,
            errorMessage : ""
        }
    }

    

    //2.)
    //DISPLAYS ALL POSTS IN FORM OF CARDS
    DisplayPostsInCards = ( allPosts ) => {
        //SENDS ALL POSTS TO FilterLoggedUserPosts()
        //RETURNS null OR array of posts of logged-in User 
        const posts = this.FilterLoggedUserPosts( allPosts );

        //CONDITION 1 :
        //IF FilterLoggedUserPosts( allPosts ) returns array of posts of logged-in User
        //DISPLAYS ALL LOGGED IN USER POSTS
        if( posts ){
        return (
            posts.map((p, index) => {
                return (
                    <React.Fragment key = {index}>
                        <div className = "col-lg-12 col-md-12 col-sm-12" key = {index} id={index}>
                            <div className="card" key = {index} id={index}>
                                <div className="card-header">
                                    <div className = "card-title display-4"><b>{p.postTitle}</b></div>
                                </div>
                                <div className="card-body">
                                <span><b>Post Description :</b> {p.postDescription} </span>
                                <br/>
                                <p>
                                    <b>Post :</b>
                                    <br/>
                                    {p.post} 
                                </p>
                                <br/>
                                <p className="text-center">
                                  <span><em>Author : {p.postAuthorName}</em></span>
                                  <br/>
                                     <span><em>Written on {p.postTime.toLocaleString()}</em></span>
                                </p>
                                </div>
                                <div className ="card-footer" >
                                    <button type="button" className="btn btn-danger btn-block" onClick={()=>this.DeletePost(p.postId)} >DeletePost</button>
                                </div>
                            </div>
                        </div>
                        <br/>
                    </React.Fragment>
                )
            })
        )
        }
        //CONDITION 2 : IF USER HAS WRITTEN NO POST YET!
        else{
        return (
                <React.Fragment>
                    <div className="text-center" style={{marginTop : "150px"}}>
                        <h1 className="display-3">No Posts to Display!</h1>
                    </div>
                    <br/>
                    <div className="text-center ">
                        <button type="button" className="btn btn-success" onClick={()=>this.setState({path:'/addpost' , redirect:true})}  >Write Something</button>
                    </div>
                </React.Fragment>          
            ) 
        }
    }

    //3.)
    //RETURNS ONLY THE POSTS OF LOGGED IN USER
    //Called by 2. DisplayPostsInCards()
    //RETURNS null if no post of user and posts array if user has written posts before
    FilterLoggedUserPosts = ( posts ) =>{ 
        const userId = this.props.loggedUser.data.userId ;
        //FILTERS OUT ONLY THE POSTS OF LOGGED IN USER
        let userPosts = posts.filter( p => p.userId === userId  )
        //IF NO POSTS TO DISPLAY RETURNS null
        if (userPosts.length === 0)
        return null ;
        //ELSE IF POSTS TO DISPLAY RETURNS POSTS ARRAY
        else
        return userPosts ;
        //this.DisplayPostsInCards( userPosts )
    }

    //4.)
    //DELETES A USER POST ON CLICK OF A DELETE BUTTON
    DeletePost = ( postId ) => { 
            handleDeletePost( postId ,this.props.loggedUser.data.userId ).then( res => {
            alert(res);
            handleGetAllPosts( this.props.dispatch ) ;
        }).catch(err => {
            alert(err.message)
        })
    }




    render() {
        //console.log("render home allPosts=",this.props.allPosts);
        //Case 0 : Used to redirect to any general path on click of any button/link
        if(this.state.redirect){
            return <Redirect to={this.state.path}/>
        }
        //CASE 1 
        //IF USER IS NOT LOGGED IN THIS IF CONDITION WILL RENDER
        if(!this.props.loggedUser.data)
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
        //CASE 2:
        //IF USER IS LOGGED IN THIS WILL RENDER
        return (
            <React.Fragment>
                {/* {JSON.stringify(this.props.allPosts)} */}
                <div className="container-fluid">
                    <DocumentTitle title="Silk Road | MyPosts" />
                    <div className="row">
                        <div className="col-lg-2 col-md-2 col-sm-0" ></div>
                        <div className="col-lg-7 col-md-7 col-sm-12" style={{ background: "lightblue" }}>
                            {this.props.allPosts ?  this.DisplayPostsInCards( this.props.allPosts ) : <h1 className="display-3">Loading...</h1>}
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12" ></div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


function mapStateToProps({ loggedUser, allPosts }) {
    console.log("im home mapstateto props=", allPosts);
    return {
        loggedUser,
        allPosts
    }
}

export default connect(mapStateToProps)(MyPosts);