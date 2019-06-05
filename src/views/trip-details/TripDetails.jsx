import React, {Component} from 'react';
import Card from '../../components/common/card/Card';
import LoadingSpinner from './../../components/common/loading-spinner/LoadingSpinner';

import TripService from './../../services/tripService';
import {popUpError, serverErrorPopUp} from '../../utils/popUpMessageHandler';
import ModalConfirmation from '../../components/common/modal-confirmation/ModalConfirmation';

class TripDetails extends Component{
    constructor(props){
        super(props);

        this.state = {
            trip:null,
            isLaoding:false
        }
    }

    static tripService = new TripService();
    componentDidMount(){
        const {id} =this.props.match.params;

        this.setState({
            isLaoding:true
        })
        TripDetails.tripService.getById(id).then(res=>{
            if(res.error){
                popUpError(res.description)
            }else{
                const filteredRes = {
                        _id:res._id,
                        destination:res.destination,
                        startDate:res.startDate,
                        endDate:res.endDate,
                        image:res.image,
                        places:res.places,
                        privacy:res.privacy
                    }
                this.setState({
                    trip:filteredRes, 
                    isLoading:false
                })
            }
        }).catch(err=>serverErrorPopUp(err));
    }
    
    render(){
        const {trip, isLoading}=this.state;
        if(isLoading || trip === null){
            return <LoadingSpinner/>
        } 
        return (        
            <div className="translateY-13vh bg-light custom-box w-75 ml-auto mr-auto mb-5">
                <Card {...this.props} data={trip} cardType="tripDetails" buttons={['edit','delete']}/>
            </div>
        );
    }
}

export default TripDetails;