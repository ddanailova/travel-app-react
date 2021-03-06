import React, {Component} from 'react';
import FormPreviewContainer from './../../components/common/FormPreviewContainer';
import LoadingSpinner from './../../components/common/loading-spinner/LoadingSpinner';

import TripService from './../../services/tripService';
import {popUpError, serverErrorPopUp} from '../../utils/popUpMessageHandler';

class EditTrip extends Component {
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

        EditTrip.tripService.getById(id).then(res=>{
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
        return(<FormPreviewContainer actionType="edit" tripData={trip}/>)
    }
}

export default EditTrip;