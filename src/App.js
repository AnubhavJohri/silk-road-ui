import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch ,Redirect} from 'react-router-dom';
import './App.css';
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from './components/Register';
import Navbar1 from "./components/Navbar";
import Navbar2 from "./components/Navbar1";
import AddPost from "./components/AddPost";
import Home from "./components/Home";
import MyPosts from "./components/MyPosts";



class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <Fragment>
            <Navbar1/>
            <Switch>
              <Route exact path='/home' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/addpost' component={AddPost} />
              <Route exact path='/myposts' component={MyPosts} />
              <Route exact path='/nav' component={Navbar2} />
              <Route exact path='/**' render={()=><Redirect to="/home"/>} />
            </Switch>
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App