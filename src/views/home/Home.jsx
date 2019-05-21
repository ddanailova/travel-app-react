import React from 'react';
import {Link} from 'react-router-dom';
import {UserConsumer} from '../../components/contexts/userContext';


const Home =(props)=> {
    const {username}=props;
    const isLogged = !!username;
    if(isLogged === true){
        return (
            <div className="jumbotron bg-light translateY-13vh custom-shadow w-75 ml-auto mr-auto">
            <h1 className="display-4 font-weight-normal">Welcome {username}!</h1>
            <p className="lead">Start planning your next trip or check what you have already in store from the navigation bar above.</p>
          </div>
        )
    }

    return(
        <div className="jumbotron guest-view">
            <i className="fas fa-infinity"></i>
            <h1 className="display-4 font-weight-normal">Plan your next trip with us!</h1>
            <p className="lead">This app helps you plan your trip and offers you inspiring ideas for your new adventures.</p>
            <p className="lead">
                <Link className="btn btn-outline-dark btn-lg" to="/register" role="button">Start Planing</Link>
            </p>
        </div>
    );
}

const HomeWithUserContext =(props)=>{
    return(
        <UserConsumer>
            {
                ({username})=>(<Home {...props} username={username}/>)
            }
        </UserConsumer>
    )
}

export default HomeWithUserContext;