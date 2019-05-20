import React, {Component} from 'react';
import { Route, Switch} from "react-router-dom";

import Home from './views/home/Home';
import Authentication from './views/authentication/Authentication';
import NotFound from './views/not-found/NotFound';

import {UserProvider, defaultUserState} from './components/contexts/userContext'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state ={
      user:defaultUserState
    }
  }

   updateUser=(data)=>{
     this.setState({
       user:data
     })
   }

  render(){
    const {user} = this.state;
    return (
      <div className="App">
      <UserProvider value={user}>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path='/login' render={(props)=>(<Authentication {...props} type="login"></Authentication>)}/>
          <Route path='/register' render={(props)=>(<Authentication {...props} type="register"></Authentication>)}/>
          <Route exact path="/" component={Home}/>
          <Route component={NotFound}/>
        </Switch>
      </UserProvider>
      </div>
    );
  }
}

export default App;
