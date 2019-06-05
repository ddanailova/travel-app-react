import React, {Component, Fragment} from 'react';
import { Redirect } from 'react-router-dom';

import TripService from '../../../services/tripService';
import {popUpError,popUpSuccess, serverErrorPopUp} from '../../../utils/popUpMessageHandler';
import './ActionButtonWithConfirmation.scss';

class ActionButtonWithConfirmation extends Component{
    constructor(props){
        super(props);

        this.state={
            wasConfirmed:false
        }
    }
    static tripService = new TripService();

    actionConfirmed = (actionType, id)=>{
        if(actionType==='delete'){
            ActionButtonWithConfirmation.tripService.remove(id).then(res=>{
                if(res.error){
                    popUpError(res.description)
                }else{
                    popUpSuccess('The record was deleted successfully!');
                    this.setState({
                        wasConfirmed:true
                    })
                }
            }).catch(err=>serverErrorPopUp(err));
        }
    }
    render(){
        const {wasConfirmed}=this.state;

        if(wasConfirmed){
            return <Redirect to="/"/>
        }

        const {actionType, itemId} = this.props;
        const defaultClass ="btn card-link btn-primary ";
        let extraClasses="";
        let buttonText="";

        switch(actionType){
            case 'delete': buttonText="Delete"; extraClasses="btn-danger";
                break;
            default:
                break;
        }

        const extendedClass = defaultClass + extraClasses;

        return(
            <Fragment>
                <button type="button" className={extendedClass} data-toggle="modal" data-target="#exampleModal">
                {buttonText}
                </button>
   
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                   <div className="modal-dialog" role="document">
                       <div className="modal-content">
                           <div className="modal-header">
                               <h5 className="modal-title" id="exampleModalLabel">We need your confirmation before we proceed</h5>
                               <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                   <span aria-hidden="true">&times;</span>
                               </button>
                           </div>
                           <div className="modal-body">
                               {`Are you sure you want to ${actionType} this record?`}
                           </div>
                           <div className="modal-footer">
                               <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>this.actionConfirmed(actionType, itemId)}>Confirm</button>
                           </div>
                       </div>
                   </div>
                </div>
            </Fragment>
        )
    }
}

export default ActionButtonWithConfirmation;