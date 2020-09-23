import axios from 'axios';


//ONLINE BACKEND SERVICE URL - 
//const backend_url = "https://silk-road-backend.herokuapp.com/"
// const login_url="https://silk-road-backend.herokuapp.com/user/login";
// const register_url="https://silk-road-backend.herokuapp.com/user/register";
// const getAllPosts_url="https://silk-road-backend.herokuapp.com/post/getallposts";
// const addPost_url = "https://silk-road-backend.herokuapp.com/post/addpost";
// var deletePost_url="https://silk-road-backend.herokuapp.com/post/deletepost";

//OFFLINE BACKEND SERVICE LINKS-
const login_url="http://localhost:1111/user/login";
const register_url="http://localhost:1111/user/register";
const getAllPosts_url="http://localhost:1111/post/getallposts";
const addPost_url = "http://localhost:1111/post/addpost";
var deletePost_url="http://localhost:1111/post/deletepost";
//START BACKEND SERVICE BEFORE STARTING USING OFFLINE LINKS




// const login_url="/user/login";
// const register_url="/user/register";


//1.)
//LOGIN FUNCTION
//Used to send Login credentials and 
//verify whether the user 
//If credentials are authentic , recieves user information from the server
export function userLogin(loginCredentials){
    let cred = {};
    cred={
        uname : loginCredentials.userName,
        upass : loginCredentials.userPass,
    }
    return axios.post(login_url , cred)
    .then(res => {
        console.log("response from server=", res.data);
        return res.data;
    })
    .catch(err =>{
        let e = new Error();
        if(err.response)
        e.message = err.response.data.message;
        else
        e.message = "Server not started , Please start backend service!";
        console.log("error=",e.message);     
        throw e;   
    })
}


//2.)
//REGISTER FUNCTIONALITY
export function userRegister(userDetails){
    return axios.post(register_url,userDetails)
    .then( res => {
        console.log("response from server=", res.data.message);
        return res.data.message;
    })
    .catch( err =>{
        let e = new Error();
        if(err.response)
        e.message = err.response.data.message;
        else
        e.message = "Server not started , Please start backend service!";
        //console.log("error=",e.message);        
        throw e;
    })
}



//3.)
//GET ALL POSTS FUNCTIONALITY
//Gets all posts that are displayed on the Home Page
export function getAllPosts(){
    return axios.get(getAllPosts_url)
    .then( res => {
        //console.log("response from server=", res.data.data);
        return res.data.data;
    })
    .catch( err =>{
        let e = new Error();
        if(err.response)
        e.message = err.response.data.message;
        else
        e.message = "Server not started , Please start backend service!";        
        throw e;
    })

}


//4.)
//DELETES A POST OF THE USER
//SENDS POST ID TO DELETE
export function deletePost( postId ,userId ){
    var url = "";
    url = deletePost_url+"/"+postId+"/"+userId;
    console.log("url=",url);
    //deletePost_url = deletePost_url+"/"+postId+"/"+userId;
    return axios.delete( url )
    .then( res => {
        return res.data.message;
    })
    .catch( err =>{
        let e = new Error();
        if(err.response)
        e.message = err.response.data.message;
        else
        e.message = "Server not started , Please start backend service!";        
        throw e;
    })
}


//5.)
//ADD POST FUNCTIONALITY
export function addPost( post ) {
    return axios.post( addPost_url , post )
    .then( res => {
        return res.data.message;
    })
    .catch( err =>{
        let e = new Error();
        if(err.response)
        e.message = err.response.data.message;
        else
        e.message = "Server not started , Please start backend service!";        
        throw e;
    })
}


//6.)
//ADD COMMENTS
export function addComment ( comment ) {
    

}