import React, { Component } from 'react';

class Login extends Component{
    render(){
        return (
        <form>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input  className="form-control" type="email" id="email" name="email" pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required/>
                <div className="invalid-feedback">
                    Please provide a valid email in the format: example@example.com
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input  className="form-control" type="password" id="password" name="password"  pattern="(?=^.{6,24}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$" required/>
                <div className="invalid-feedback">
                    Password should be between 6 an 24 chars and have at least one number and one uppercase!
                </div>
            </div>
            <div className="form-group text-center">
                <button className="btn btn-primary" type="submit">Login</button>
            </div>
        </form>
        );
    }
}

export default Login;
