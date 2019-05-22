import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Input from '../common/Input';

import {validateInput, validateForm} from '../../utils/formValidations';
import {popUpError, popUpSuccess} from '../../utils/popUpMessageHandler';
import UserService from './../../services/userService';

const defaultInputs = {
    username:'',
    email:'',
    password:'',
    confirmPassword:''
}

class Register extends Component{
    constructor(props){
        super(props);

        this.state = {
            data:{...defaultInputs},
            errors:{...defaultInputs},
            isFormValid:false,
            redirectToLogin:false
        }
    }

    static userService = new UserService();

    handleRegister = (ev)=>{
        ev.preventDefault();
        const userData = {...this.state.data};
        delete userData.confirmPassword;
        Register.userService.register(userData)
            .then(res=>{
                if(res.error){
                    popUpError(res.description)
                }else{
                    popUpSuccess('Registration successful! You can login now.');
                    this.setState({redirectToLogin:true})
                }
            })
            .catch(err=>{
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
        const {data, errors, isFormValid, redirectToLogin} = this.state;
        const {username, email, password, confirmPassword} = data;
        if(redirectToLogin){
            return(
                <Redirect to='login'/>
            )
        }
        return(
            <form onSubmit={this.handleRegister}>
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
                    label="Email"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    handleInputChange={this.handleInputChange}
                    validateInputOnBlur={()=>this.validateInputOnBlur('email', email)}
                    clearErrorsOnFocus={()=>this.clearErrorsOnFocus('email')}
                    isValid={!errors.email}
                    errorMsg={errors.email}
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
                <Input
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    handleInputChange={this.handleInputChange}
                    validateInputOnBlur={()=>this.validateInputOnBlur('confirmPassword', confirmPassword, true, {password})}
                    clearErrorsOnFocus={()=>this.clearErrorsOnFocus('confirmPassword')}
                    isValid={!errors.confirmPassword}
                    errorMsg={errors.confirmPassword}
                />
                <div className="form-group text-center">
                    <button className="btn btn-primary" type="submit" disabled={!isFormValid} >Register</button>
                </div>
            </form>
        );
    }
}

export default Register;