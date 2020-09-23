import { SET_ALL_POSTS } from "../actions/authedPost";

export function allPosts(state = null , action ){
    //console.log("in reducer authedPoster",action);
    switch(action.type){
        case SET_ALL_POSTS:
            if(action.allPosts)
            {
                return action.allPosts;
            }
            else
            return null;
        default :
        return state;
     }
}