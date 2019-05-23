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
            redirectToHome:false,
            isFormValid:false
        }
    }
    updateStateParam = (pram, data, cb)=>{
        console.log('in updateStateParam', this.state.isFormValid);
        this.setState((prevState)=>({
         [pram]:data}), cb)
    }
    updateStateArrayParam = (pram, data, cb)=>{
        this.setState((prevState)=>({
         [pram]:{
           ...prevState[pram],
           ...data}
       }), cb)
    }


    handleInputChange = (ev)=>{
        const {name, value, checked}=ev.target;
        if(name==='places'){
            this.setState((prevState)=>({
                data:{
                    ...prevState.data,
                    [name]:value.split(/\s*,\s*/),
                }
            }))
        }else if(name==='privacy'){
            this.setState((prevState)=>({
                data:{
                    ...prevState.data,
                    [name]:checked
                }
            }))
        }else{
            this.setState((prevState)=>({
                data:{
                    ...prevState.data,
                    [name]:value,
                }
            }))
        }

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
                        errors={errors}
                        data={data}
                        isFormValid={isFormValid}
                        clearErrorsOnFocus={this.clearErrorsOnFocus}
                    />
                    <Preview 
                        actionType={actionType}
                        updateStateArrayParam={this.updateStateArrayParam}
                        updateStateParam={this.updateStateParam}
                        isFormValid={this.state.isFormValid}
                        data={data}
                        errors={errors}
                    />
                    <div className="col-2"></div>
                </div>
            </div>
        )
    }
}

export default FormPreviewContainer;