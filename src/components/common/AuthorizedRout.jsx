import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {UserConsumer} from '../contexts/userContext';

const AutherizedRoute =(props)=>{
    const {criteria, ...otherProps}=props;
    return(
            criteria?(
                <Route {...otherProps}/>
            ):(
                <Redirect to='/'/>
            )
        );
}

const AdminRoute =(props)=>{
    return(
        <UserConsumer>
        {
            ({isAdmin})=>{
                return (
                    <AutherizedRoute
                        {...props} 
                        criteria={isAdmin}
                    />
                )
            }
        }
        </UserConsumer>
    );
}

const UserRoute =(props)=>{
    return(
        <UserConsumer>
        {
            ({username})=>{
                return (
                    <AutherizedRoute
                        {...props} 
                        criteria={username}
                    />
                )
            }
        }
        </UserConsumer>
    );
}

const AnonimusRoute=(props)=>{
    return(
        <UserConsumer>
        {
            ({username})=>{
                return (
                    <AutherizedRoute
                        {...props} 
                        criteria={!username}
                    />
                )
            }
        }
        </UserConsumer>
    );
}

export {AdminRoute, UserRoute, AnonimusRoute};
export default AutherizedRoute;