import React, { Component } from 'react';
import Input from '../common/Input';

import inputValidation from '../../utils/inputValidations';

class Register extends Component{
    constructor(props){
        super(props);

        this.state = {
            userName:'',
            email:'',
            password:'',
            confirmPassword:'',
            errors:{
                userName:'',
                email:'',
                password:'',
                confirmPassword:''
            }
        }
    }

    handleSubmit = (ev)=>{
        ev.preventDefault();
        console.dir(this.state)
    }

    handleInputChange = (ev)=>{
        const {name, value}=ev.target;

        this.setState({
            [name]:value
        })

    }

    validateInputOnBlur =(name, value)=>{
        this.setState({
            errors:{
                [name]:inputValidation(name, value)
            }
        })
    }

    clearErrorsOnFocus=()=>{
        this.setState({
            errors:{
                userName:'',
                email:'',
                password:'',
                confirmPassword:''
            }
        })
    }

    render(){
        const {userName, email, password, confirmPassword, errors} = this.state;
        return(
            <form onSubmit={this.handleSubmit}>
                <Input
                    label="User Name"
                    type="text"
                    id="userName"
                    name="userName"
                    value={userName}
                    handleInputChange={this.handleInputChange}
                    validateInputOnBlur={()=>this.validateInputOnBlur('userName', userName)}
                    clearErrorsOnFocus={this.clearErrorsOnFocus}
                    isValid={!errors.userName}
                    errorMsg={errors.userName}
                />
                <Input
                    label="Email"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    handleInputChange={this.handleInputChange}
                    validateInputOnBlur={()=>this.validateInputOnBlur('email', email)}
                    clearErrorsOnFocus={this.clearErrorsOnFocus}
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
                    validateInputOnBlur={()=>this.validateInputOnBlur('password', password)}
                    clearErrorsOnFocus={this.clearErrorsOnFocus}
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
                    validateInputOnBlur={()=>this.validateInputOnBlur('confirmPassword', confirmPassword)}
                    clearErrorsOnFocus={this.clearErrorsOnFocus}
                    isValid={!errors.confirmPassword}
                    errorMsg={errors.confirmPassword}
                />
                <div className="form-group text-center">
                    <button className="btn btn-primary" type="submit" >Register</button>
                </div>
            </form>
        );
    }
}

export default Register;