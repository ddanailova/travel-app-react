import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Input from '../common/Input';

import {validateInput, validateForm} from '../../utils/formValidations';
import {popUpError, popUpSuccess, serverErrorPopUp} from '../../utils/popUpMessageHandler';
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
                serverErrorPopUp(err);
            })
    }

    handleInputChange = (ev, required, other)=>{
        const {name, value}=ev.target;
        console.log(value)
        this.setState((prevState)=>({
            data:{
                ...prevState.data,
                [name]:value,
            }
        }), this.setState((prevState)=>({
            errors:{
                ...prevState.errors,
                [name]:validateInput(name, value, required, other)
            }
        }),() => this.setState((prevState)=>({
            isFormValid:validateForm(prevState.errors, prevState.data)
        }))))
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
                    label="User Name *"
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    handleInputChange={(ev)=>this.handleInputChange(ev, true)}
                    isValid={!errors.username}
                    errorMsg={errors.username}
                />
                <Input
                    label="Email"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    handleInputChange={(ev)=>this.handleInputChange(ev)}
                    isValid={!errors.email}
                    errorMsg={errors.email}
                />
                <Input
                    label="Password *"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    handleInputChange={(ev)=>this.handleInputChange(ev, true)}
                    isValid={!errors.password}
                    errorMsg={errors.password}
                />
                <Input
                    label="Confirm Password *"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    handleInputChange={(ev)=>this.handleInputChange(ev, true, {password})}
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