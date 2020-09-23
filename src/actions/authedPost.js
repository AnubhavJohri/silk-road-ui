import { getAllPosts, deletePost, addPost } from "../utils/api";
import { setMessageAction } from "../actions/authedUser";
export const SET_ALL_POSTS = "SET_ALL_POSTS";

//1.)
//ACTION DISPATCHER
//GETS ALL POSTS FROM SERVER AND STORES IN REDUX STORE
export function handleGetAllPosts(dispatch){
    getAllPosts().then( posts => {
        dispatch( setAllPosts(posts) );
        dispatch(setMessageAction ( "" , "" ))
    }).catch( err => {
        //console.log("in action error =" , err.message);
        dispatch(setMessageAction ( "" , err.message ));
    })
}

//2.)
//DELETES THE POST YOU WANT TO DELETE
//DOESN'T DISPATCH AN ACTION
//SIMPLY MAKES CALL TO api.js FOR DELETING POST
export function handleDeletePost( postId , userId ){
    return deletePost( postId , userId )
    .then( res => {
        return res;
    })
    .catch(err => {
        let e = new Error();
        e.message = err.message;
        throw e;
    })
}


//3.)
//ACTION DISPATCHER
export function handleAddPost( dispatch , post ){
    return addPost( post )
    .then( res => res)
    .catch( err =>{
        let e = new Error();
        e.message = err.message ;       
        throw e;
    });
}


//1.)
//Action
export function setAllPosts( posts ){
    return (
        {
            type : SET_ALL_POSTS,
            allPosts : posts
        }
    )
}


