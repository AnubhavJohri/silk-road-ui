import { combineReducers } from 'redux';
import { loggedUser , Messages  } from "./authedUser";
import { allPosts } from "./authedPost";

export default combineReducers( {
    loggedUser ,
    Messages ,
    allPosts ,
})