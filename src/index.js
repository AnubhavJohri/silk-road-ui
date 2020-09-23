import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//Redux components
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";
import middlewares from "./middlewares";
// import { combineReducers } from 'redux';
// import { sessionReducer } from 'redux-react-session';
// import { sessionService } from 'redux-react-session';

// const reducers = {
//     rootReducer ,
//     session: sessionReducer
//   };
// const reducer = combineReducers(reducers);

//const store = createStore(rootReducer, middlewares)
//const store = createStore(reducer, middlewares);

// const validateSession = (session) => {
//     // check if your session is still valid
//     return true;
//   }
// const options = { refreshOnCheckAuth: true, redirectPath: '/home', driver: 'COOKIES', validateSession };

// sessionService.initSessionService(store, options)
//   .then(() => console.log('Redux React Session is ready and a session was refreshed from your storage'))
//   .catch(() => console.log('Redux React Session is ready and there is no session in your storage'));

const store = createStore(rootReducer, middlewares)

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
