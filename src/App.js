import React, {Component} from 'react';
import { Route, Switch} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomeWithUserContext from './views/home/Home';
import Authentication from './views/authentication/Authentication';
import NotFound from './views/not-found/NotFound';

import {UserProvider, defaultUserState} from './components/contexts/userContext'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state ={
      user:{
        ...defaultUserState,
        updateUser:this.updateUser
      }
    }
  }

   updateUser=(data, cb)=>{
     this.setState((prevState)=>({
      user:{
        ...prevState.user,
        ...data}
    }), cb)
   }

  render(){
    const {user} = this.state;
    return (
      <div className="App">
      <UserProvider value={user}>
      <Switch>
        <Route exact path="/" component={HomeWithUserContext}/>
        <Route path='/login' render={(props)=>(<Authentication {...props} type="login"></Authentication>)}/>
        <Route path='/register' render={(props)=>(<Authentication {...props} type="register"></Authentication>)}/>
        <Route component={NotFound}/>
      </Switch>
      <ToastContainer/>
      </UserProvider>
      </div>
    );
  }
}

export default App;
