import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Input from '../common/Input';
import {UserConsumer} from '../contexts/userContext';

import {validateInput, validateForm} from '../../utils/formValidations';
import {popUpError, popUpSuccess} from '../../utils/popUpMessageHandler';
import UserService from './../../services/userService';

const defaultInputs = {
    username:'',
    password:'',
}

class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            data:{...defaultInputs},
            errors:{...defaultInputs},
            isFormValid:false,
            redirectToHome:false
        }
    }

    static userService = new UserService();

    handleLogin = (ev)=>{
        ev.preventDefault();
        const {updateUser}=this.props;
        const userData = {...this.state.data};
        delete userData.confirmPassword;
        Login.userService.login(userData).then(res=>{
            if(res.error){
                popUpError(res.description)
            }else{
                popUpSuccess(`Login successful! Welcome ${res.username}`);
                Login.userService.storeUserData(res);
                updateUser({
                    username:res.username,
                    userId:res._id,
                    isAdmin:Login.userService.isUserAdmin(res)
                },this.setState({redirectToHome:true}));
            }
        }).catch(err=>{
            popUpError('Sorry something went wrong with the server.')
            console.log(err)
        })
    }

    handleInputChange = (ev)=>{
        const {name, value}=ev.target;

        this.setState((prevState)=>({
            data:{
                ...prevState.data,
                [name]:value,
            }
        }))
    }

    validateInputOnBlur =(name, value, required, other)=>{
        this.setState({
            errors:{
                ...this.state.errors,
                [name]:validateInput(name, value, required, other)
            }
        },() => this.setState({
            isFormValid:validateForm(this.state.errors, this.state.data)
        }))
    }

    clearErrorsOnFocus=(name)=>{
        this.setState({
            errors:{
                ...this.state.errors,
                [name]:'',
            }
        })
    }
    render(){
        const {data, errors, isFormValid, redirectToHome} = this.state;
        const {username, password} = data;
        if(redirectToHome){
            return(
                <Redirect to='/'/>
            )
        }
        return (
        <form onSubmit={this.handleLogin}>
            <Input
                label="User Name"
                type="text"
                id="username"
                name="username"
                value={username}
                handleInputChange={this.handleInputChange}
                validateInputOnBlur={()=>this.validateInputOnBlur('username', username, true)}
                clearErrorsOnFocus={()=>this.clearErrorsOnFocus('username')}
                isValid={!errors.username}
                errorMsg={errors.username}
            />
            <Input
                label="Password"
                type="password"
                id="password"
                name="password"
                value={password}
                handleInputChange={this.handleInputChange}
                validateInputOnBlur={()=>this.validateInputOnBlur('password', password, true)}
                clearErrorsOnFocus={()=>this.clearErrorsOnFocus('password')}
                isValid={!errors.password}
                errorMsg={errors.password}
            />
            <div className="form-group text-center">
                <button className="btn btn-primary" type="submit" disabled={!isFormValid} >Login</button>
            </div>
        </form>
        );
    }
}

const LoginWithUserContext = (props)=>{
    return(
        <UserConsumer>
        {
            ({updateUser})=>(<Login {...props} updateUser={updateUser}/>)
        }
        </UserConsumer>
    )
}

export default LoginWithUserContext;
