import React, {Component, Fragment} from 'react';
import TripService from './../../services/tripService';
import {popUpError, popUpSuccess, serverErrorPopUp} from '../../utils/popUpMessageHandler';

import './Preview.scss';

class Preview extends Component{
    static isInputRequired = {
        destination:true, startDate:true, endDate:true, image:false, places:false, privacy:false
    }
    static tripService = new TripService();

    handlePreview=(ev)=>{
        ev.preventDefault();
        const {data, updateStateParam, actionType}=this.props;
        const rawData = {...data};
        delete rawData._id
        if(actionType==="create"){
            Preview.tripService.create(rawData).then(res=>{
                if(res.error){
                    popUpError(res.description)
                }else{
                    popUpSuccess(`Record created! Congrats you are going to ${res.destination}.`);
                    updateStateParam('redirectToHome', true);
                }
            }).catch(err=>serverErrorPopUp(err));
        }else if(actionType==="edit"){
            Preview.tripService.update(data._id, rawData).then(res=>{
                if(res.error){
                    popUpError(res.description)
                }else{
                    popUpSuccess(`Record updated! Don't forget to back your bags for ${res.destination}.`);
                    updateStateParam('redirectToHome', true);
                }
            }).catch(err=>serverErrorPopUp(err));
        }
    }

    render(){
        const {actionType, data, isFormValid}=this.props;
        const {destination, startDate, endDate, image, places, privacy}=data;
        return (                
            
            <div className="col-4 bg-light custom-box">
                <h2 className="text-center pb-3">Preview</h2>
                <div className="card">
                    <img  src={image? image : 'https://static.vecteezy.com/system/resources/previews/000/140/003/non_2x/free-vector-landscape.jpg'} alt={`${destination} view`}/>
                    <div className="wrapper">
                    <div className="card-body">
                        <h5 className="card-title">{destination}</h5>
                        <p  className="card-text"><span className="font-italic">Start date:</span> {startDate}</p>
                        <p  className="card-text"><span className="font-italic">End date:</span> {endDate}</p>
                        <p  className="card-text"><span className="font-weight-bold">Status:</span> {(privacy || privacy ==='true')?'Private':'Public'}</p>
                    </div>
                    <ul className="list-group list-group-flush w-100">
                    {   (!places || (places.length===1 && !places[0])) ? <li className="list-group-item">No places to visit added</li>:
                        <Fragment>
                        {
                            places.map(place=>(<li className="list-group-item" key={place}>{place}</li>))
                        }
                        </Fragment>
                    }
                    </ul>
                    <div  className="card-body text-center">
                        <button className="btn btn-success card-link" onClick={this.handlePreview} disabled={!isFormValid} >Looks Good!</button>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Preview;