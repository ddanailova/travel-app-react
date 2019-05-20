import React from 'react';

const errors ={
    userName:'This field is required!',
    email:'Please provide a valid email in the format: example@example.com',
    password: 'Password should be between 6 an 24 chars and have at least one number and one uppercase!',
    confirmPassword: 'Passwords should match! Try again'
}

const Input = (props)=>{
    const { label, type, id, name, value, handleInputChange, isValid, errorMsg, validateInputOnBlur, clearErrorsOnFocus}=props
    const validityClass = isValid ? 'form-control' : 'form-control is-invalid'
    return(
        <div className="form-group">
        <label htmlFor="email">{label}</label>
        <input 
            className={validityClass} 
            type={type} 
            id={id} 
            name={name}
            value={value}
            onChange={handleInputChange}
            onBlur={validateInputOnBlur}
            onFocus={clearErrorsOnFocus}
        />
        {
            !isValid ? (
                <div className="invalid-feedback">
                {errorMsg}
            </div>
            ):null
        }

    </div>
    )
}

export default Input;