import React, {Component, lazy, Suspense} from 'react';
import { Route, Switch} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavigationWithUserContext from './components/common/Navigation';
import Footer from './components/common/Footer';
import {AdminRoute, UserRoute, AnonimusRoute} from './components/common/AuthorizedRout';
import LoadingSpinner from './components/common/loading-spinner/LoadingSpinner';


import {UserProvider, defaultUserState} from './components/contexts/userContext';
import './App.css';

import NotFound from './views/not-found/NotFound';
const HomeWithUserContext = lazy(()=>import('./views/home/Home'));
const Authentication = lazy(()=>import('./views/authentication/Authentication'));
const CreateTrip =lazy(()=>import('./views/create-trip/CreateTrip.jsx'));
const EditTrip =lazy(()=>import('./views/edit-trip/EditTrip.jsx'));


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
    const {username} = user;
    return (
      <div className="App">
        <UserProvider value={user}>
        {
          username ? <NavigationWithUserContext/> : null
        }
        <Suspense fallback={<LoadingSpinner/>}>
          <Switch>
            <Route exact path="/" component={HomeWithUserContext}/>
            <Route exact path="/home" component={HomeWithUserContext}/>
            <AnonimusRoute path='/login' render={(props)=>(<Authentication {...props} type="login"></Authentication>)}/>
            <AnonimusRoute path='/register' render={(props)=>(<Authentication {...props} type="register"></Authentication>)}/>
            <UserRoute path='/trip/create' render={(props)=>(<CreateTrip/>)}/>
            <UserRoute path='/trip/edit/:id' render={(props)=>(<EditTrip/>)}/>
            <Route component={NotFound}/>
        </Switch>
        </Suspense>
        {
          username ? <Footer/> : null
        }
        <ToastContainer/>
        </UserProvider>
      </div>
    );
  }
}

export default App;
