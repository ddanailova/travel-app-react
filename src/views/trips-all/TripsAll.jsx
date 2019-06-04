import React, {Component} from 'react';

import Card from './../../components/common/card/Card';
import LoadingSpinner from './../../components/common/loading-spinner/LoadingSpinner';

import TripService from './../../services/tripService';
import {popUpError, serverErrorPopUp} from '../../utils/popUpMessageHandler';

import './TripsAll.scss';

class TripsAll extends Component{
    constructor(props){
        super(props);

        this.state={
            trips:[],
            isLoading:false
        }
    }

    static tripService = new TripService();
    componentDidMount(){
        const {listType}=this.props;
        this.setState({isLoading:true});

        if(listType==='myTrips'){
            const userId= localStorage.getItem('userId');
            // const filter =`_acl:{creator:"${userId}"}`;
            TripsAll.tripService.getAll().then(res=>{
                if(res.error){
                    popUpError(res.description)
                }else{
                    const filteredRes = res.reduce((acc, curr)=>{
                        acc.push({
                            _id:curr._id,
                            destination:curr.destination,
                            startDate:curr.startDate,
                            endDate:curr.endDate,
                            image:curr.image,
                            places:curr.places,
                            privacy:curr.privacy
                        })
                        return acc
                    },[])
                    this.setState({
                        trips:filteredRes, 
                        isLoading:false
                    })
                }
            }).catch(err=>serverErrorPopUp(err));
        }

    }

    render(){
        const {trips, isLoading}=this.state;
        if(isLoading){
            return <LoadingSpinner/>
        }
        return(
            <div calss="container">
            <div className="wrapper translateY-13vh w-100">
                <h1 className="text-center mb-5 font-weight-bold">Trips List</h1> 
                {
                    trips.length ?
                        trips.map(trip=><div className="list-item bg-light custom-box" key={trip._id}><Card data={trip} cardType="tripList" buttons={['details']}></Card></div>)
                    :
                        <div className="emptyView text-center ml-auto mr-auto">
                            <h3 >Sorry, you have not added any trips yet ...</h3>
                        </div>
                }
            </div>
        </div>
        );
    }
}

export default TripsAll;