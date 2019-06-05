import React, {Component} from 'react';
import isEqual from "react-fast-compare";
import {Redirect} from 'react-router-dom';
import {validateInput, validateForm} from './../../utils/formValidations.js';
import { DEFAULT_INPUTS, DEFAULT_ERROR_FIELDS, ERROR_FIELDS_FOR_VALID_FORM } from './../../static/formInputConstants.js';

import TripForm from './../trip-form/TripForm';
import Preview from './../preview/Preview';


class FormPreviewContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            data:{...DEFAULT_INPUTS},
            initialData:{},
            errors:{...DEFAULT_ERROR_FIELDS},
            redirectToHome:false,
            isFormValid:false
        }
    }

    static getDerivedStateFromProps(props, state){
        const isDataCommingFromProps= props.actionType==='edit' && Object.keys(props.tripData).length;
        if( isDataCommingFromProps && !isEqual(state.initialData, props.tripData)){
            return {
                data:{...props.tripData},
                initialData:{...props.tripData},
                errors:{...ERROR_FIELDS_FOR_VALID_FORM},
                redirectToHome:false,
                isFormValid:true
            }
        }
        
        return state
    }
    updateStateParam = (pram, data, cb)=>{
        this.setState({
         [pram]:data}, cb)
    }

    updateStateArrayParam = (pram, data, cb)=>{
        this.setState((prevState)=>({
         [pram]:{
           ...prevState[pram],
           ...data}
       }), cb)
    }


    handleInputChange = (ev, required, other)=>{
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
            }),()=> this.setState((prevState)=>({
                errors:{
                    ...prevState.errors,
                    [name]:validateInput(name, value, required, other)
                }
            }),() => this.setState((prevState)=>({
                isFormValid:validateForm(prevState.errors, prevState.data)
            }))))
        }
    }  


    render(){
        const {actionType}=this.props;
        const {errors, data, isFormValid, redirectToHome} =this.state;
        
        if(redirectToHome){
            return(<Redirect to='/'/>)
        }
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
                    />
                    <Preview 
                        actionType={actionType}
                        updateStateArrayParam={this.updateStateArrayParam}
                        updateStateParam={this.updateStateParam}
                        isFormValid={isFormValid}
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