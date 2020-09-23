import { SET_LOGGED_USER_DETAILS, SET_MESSAGE_ACTION } from "../actions/authedUser";

export function loggedUser(state = {data:null,isError:''}, action){
    switch(action.type){
        case SET_LOGGED_USER_DETAILS:
            if(action.isError){
                return ({
                    data : null,
                    isError : action.isError
                })
            }
            else if(action.loggedInUserDetails){
                return ({
                    data : action.loggedInUserDetails,
                    isError : ""
                })
            }
            else{
                //console.log("in default state",state);
                //return state;
                return {data:null,isError:''} ;
            }
        default:
            return state;
    }
}

export function Messages (state = {successMessage : "" , errorMessage : ""} , action){
    switch(action.type){
        case SET_MESSAGE_ACTION :
            if(action.successMessage.length>0){
                return ({
                    successMessage : action.successMessage,
                    errorMessage : ""
                })
            }
            else if(action.errorMessage.length>0){
                return ({
                    successMessage : "",
                    errorMessage : action.errorMessage
                })
            }
            else{
                //return state;
                return ({
                    successMessage : "",
                    errorMessage : ""
                })
            }
        default :
        return state;
    }
}