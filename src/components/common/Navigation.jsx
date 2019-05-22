import React, {Fragment, Component} from 'react';
import { NavLink, Link, Redirect } from 'react-router-dom';

import {UserConsumer, defaultUserState} from '../contexts/userContext';
import {popUpError, popUpSuccess} from '../../utils/popUpMessageHandler';
import UserService from './../../services/userService';

class Navigation extends Component{
    constructor(props){
        super(props);

        this.state={
            redirectToHome:false
        }
    }
    static userService = new UserService();
    logout =()=>{ 
        const {updateUser} = this.props;
        Navigation.userService.logout().then(res=>{
            if(res.error){
                popUpError(res.description)
            }else{
                popUpSuccess(`Logout successful. Good bye!`);
                Navigation.userService.clearStoredData();
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
    render(){
        const {isAdmin} = this.props;
        const {redirectToHome}=this.state;
        if(redirectToHome){
            return <Redirect to="/"/>
        }

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
                    <NavLink to="#" className="nav-item nav-link" onClick={this.logout} activeClassName="active">Logout</NavLink>
                </div>
                </div>
            </nav>
        )
    }
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