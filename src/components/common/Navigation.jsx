import React, {Fragment} from 'react';
import { NavLink, Link } from 'react-router-dom';

import {UserConsumer} from '../contexts/userContext';


const Navigation =(props)=>{
    const {isAdmin} = props;
    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar navbar-dark bg-dark">
            <Link className="navbar-brand" to="/"><i className="fas fa-infinity"></i></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <NavLink className="nav-item nav-link" to="/home" activeClassName="active">Home <span className="sr-only">(current)</span></NavLink>
                <NavLink className="nav-item nav-link" to="/featured/all" activeClassName="active">All Featured</NavLink>
                {
                    isAdmin ? (<NavLink className="nav-item nav-link" to="/trip/all" activeClassName="active">All Trips</NavLink>) : (
                        <Fragment>
                            <NavLink className="nav-item nav-link" to="/trip/create" activeClassName="active">Start Planning</NavLink>
                            <NavLink className="nav-item nav-link" to="/trip/mine" activeClassName="active">My Trips</NavLink>
                        </Fragment>
                    )
                }
                <NavLink to="/logout" className="nav-item nav-link" activeClassName="active">Logout</NavLink>
            </div>
            </div>
        </nav>
    );
}

const NavigationWithUserContext = (props)=>{
    return(
        <UserConsumer>
        {
            ({isAdmin, updateUser})=>(<Navigation {...props} isAdmin={isAdmin} updateUser={updateUser}/>)
        }
        </UserConsumer>
    )
}

export default NavigationWithUserContext;