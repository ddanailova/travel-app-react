import React, {Component, Fragment} from 'react';
import {Redirect} from 'react-router-dom';

import {validateInput, validateForm} from '../../../utils/formValidations.js';
import {popUpError, popUpSuccess} from '../../../utils/popUpMessageHandler';

import TripForm from './../../trip-form/TripForm';
import Preview from './../../preview/Preview';


const defaultInputs = {
    destination:'',
    image:'',
    places:'',
    startDate:'',
    endDate:'',
    privacy:false
}

class FormPreviewContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            data:{...defaultInputs},
            errors:{...defaultInputs},
            isFormValid:false,
            redirectToHome:false
        }
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
        const {actionType}=this.props;
        const {errors, data, isFormValid} =this.state;
        return(
            <div className="container">
                <div className="row translateY-13vh pb-5">
                    <div className="col-2"></div>
                    <TripForm 
                        actionType={actionType}
                        handleInputChange={this.handleInputChange}
                        validateInputOnBlur={this.validateInputOnBlur}
                        clearErrorsOnFocus={this.clearErrorsOnFocus}
                        errors={errors}
                        data={data}
                        isFormValid={isFormValid}
                    />
                    <Preview actionType={actionType}/>
                    <div className="col-2"></div>
                </div>
            </div>
        )
    }
}

export default FormPreviewContainer;