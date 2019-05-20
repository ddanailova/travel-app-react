import React, {Component} from 'react';
import {Route, Switch, NavLink} from 'react-router-dom';

import Login from './../../components/login/Login';
import Register from './../../components/register/Register';

import './Authentication.scss';

const Authentication =(props)=>{

        const {path} = props.match;
        return(         
            <div className="card text-center custom-shadow">
            <div className="card-header bg-dark">
            <ul className="nav nav-tabs ">
                <li className="nav-item">
                    <NavLink className="nav-link" to='/register' activeClassName="active">Register</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to='/login' activeClassName="active">Login</NavLink>
                </li>
            </ul>
            </div>
            <div className="card-body">
                {
                    path ==='/login'? <Login/> : <Register/>
                }
            </div>
            </div>
        );
}

export default Authentication;