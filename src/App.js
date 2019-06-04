import React, {Component, lazy, Suspense} from 'react';
import { Route, Switch} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from './components/common/Footer';
import NavigationWithUserContext from './components/common/Navigation';
import LoadingSpinner from './components/common/loading-spinner/LoadingSpinner';
import {AdminRoute, UserRoute, AnonimusRoute} from './components/common/AuthorizedRout';


import {UserProvider, defaultUserState} from './components/contexts/userContext';
import './App.css';

import NotFound from './views/not-found/NotFound';
import LogoutWithUserContext from './views/logout/Logout';

const HomeWithUserContext = lazy(()=>import('./views/home/Home'));
const TripsAll =lazy(()=>import('./views/trips-all/TripsAll'));
const TripDetails =lazy(()=>import('./views/trip-details/TripDetails'));
const EditTrip =lazy(()=>import('./views/edit-trip/EditTrip'));
const CreateTrip =lazy(()=>import('./views/create-trip/CreateTrip'));
const Authentication = lazy(()=>import('./views/authentication/Authentication'));

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
     console.log('update state')
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
            <UserRoute path='/trip/create' render={(props)=>(<CreateTrip {...props}/>)}/>
            <UserRoute path='/trip/edit/:id' render={(props)=>(<EditTrip {...props}/>)}/>
            <UserRoute path='/trip/mine' render={(props)=>(<TripsAll {...props} listType="myTrips"/>)}/>
            <UserRoute path='/logout' render={(props)=>(<LogoutWithUserContext {...props}/>)}/>
            <UserRoute path='/trip/details/:id' render={(props)=>(<TripDetails {...props}/>)}/>
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
