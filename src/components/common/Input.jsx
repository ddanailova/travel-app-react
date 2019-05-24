import React from 'react';

const Input = (props)=>{
    const { label, type, id, name, value, example, handleInputChange, isValid, errorMsg, validateInputOnBlur, clearErrorsOnFocus, formGroupClasses:extraFormGroupClasses}=props;
    const validityClass = isValid ? 'form-control' : 'form-control is-invalid';
    const formGroupClasses = extraFormGroupClasses ? `form-group ${extraFormGroupClasses}` : 'form-group';
    if(type === 'checkbox'){
        return (
            <div className="form-group">
                <div className="form-check">
                    <input 
                        className="form-check-input" 
                        type={type}
                        id={id}
                        name={name}
                        defaultChecked={value}
                        onClick ={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor={id}>
                    {label}
                    </label>
                </div>
            </div>
        )
    }else if(type==='textarea'){
        return (
            <div className="form-group">
            <label htmlFor={id}>{label} <span className="font-italic text-secondary">{example}</span></label>
                <textarea 
                    className="form-control" 
                    id={id} 
                    rows="3"
                    name={name}
                    onChange={handleInputChange}
                    defaultValue={value}/>
            </div>
        )
    }

    return(
        <div className={formGroupClasses}>
        <label htmlFor={id}>{label}</label>
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