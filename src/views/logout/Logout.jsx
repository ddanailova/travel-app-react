import React, {Component} from 'react';
import LoadingSpinner from './../../components/common/loading-spinner/LoadingSpinner';

import {UserConsumer, defaultUserState} from './../../components/contexts/userContext.js';
import {popUpError, popUpSuccess} from '../../utils/popUpMessageHandler';
import UserService from './../../services/userService';

import './Logout.scss';

class Logout extends Component{
    static userService = new UserService();
    logout =()=>{ 
        const {updateUser} = this.props;
        Logout.userService.logout().then(res=>{
            if(res.error){
                popUpError(res.description)
            }else{
                popUpSuccess(`Logout successful. Good bye!`);
                Logout.userService.clearStoredData();
                updateUser({
                    ...defaultUserState,
                    updateUser
                });
            }
        }).catch(err=>{
            popUpError('Sorry something went wrong with the server.')
            console.log(err)
        })
    }
    componentDidMount(props){
        this.logout();
    }
    render(){
        return (
            <div className="container">
                <LoadingSpinner/>
            </div>
        )
    }
}

const LogoutWithUserContext = (props)=>{
    return(
        <UserConsumer>
        {
            ({isAdmin, updateUser})=>(<Logout {...props}  updateUser={updateUser}/>)
        }
        </UserConsumer>
    )
}

export default LogoutWithUserContext;