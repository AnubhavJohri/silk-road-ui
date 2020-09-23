import { userLogin, userRegister } from "../utils/api";

export const SET_LOGGED_USER_DETAILS = 'SET_LOGGED_USER_DETAILS';
export const SET_MESSAGE_ACTION = 'SET_MESSAGE_ACTION';

export function handleSetAuthedUser (dispatch, loginCredentials){
userLogin(loginCredentials)
    .then( user => {
        dispatch(setLoggedInUserDetails( user , ""));
    })
    .catch( err =>{
        console.log("in action",err.message);
        dispatch(setLoggedInUserDetails( null , err.message));
    })
}

export function handleRegisterUser (dispatch , userDetails){
    userRegister(userDetails)
    .then( successMessage =>{
        dispatch( setMessageAction( successMessage , "" ));
    })
    .catch( err => {
        dispatch( setMessageAction( "" , err.message ) );
    });
}

//HANDLES LOGOUT AND EVENTS WHERE WE NEED TO CHANGE THE USERDATA OBJECT
// export function handleChangeUserData (dispatch , userData , isError ){
//     dispatch (setLoggedInUserDetails ( userData , isError ) ); 
// }
export function setLoggedInUserDetails (loggedInUserDetails,isError) {
    return {
      type: SET_LOGGED_USER_DETAILS,
      loggedInUserDetails,
      isError,
    }
  }

  export function setMessageAction ( successMessage , errorMessage ){
      return {
          type : SET_MESSAGE_ACTION,
          successMessage,
          errorMessage
      }
  }