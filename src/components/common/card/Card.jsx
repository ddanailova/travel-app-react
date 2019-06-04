import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Card.scss';
import { stringify } from 'querystring';
import LinkButton from './../LinkButton';

class Card extends Component{
    render(){
        const {data, cardType, buttons}=this.props;
        return(

            <div className="card">
            {
                cardType === "tripDetails" ? 
                    (
                        data.image ? <img src={data.image} alt="Card image cap"/>
                        : <img src="https://static.vecteezy.com/system/resources/previews/000/140/003/non_2x/free-vector-landscape.jpg" alt="Card image cap"/>
                    )
                : <div className="card-header">
                {
                    data.image ? <img src={data.image} alt="Card image cap"/>
                    : <img src="https://static.vecteezy.com/system/resources/previews/000/140/003/non_2x/free-vector-landscape.jpg" alt="Card image cap"/>
                }
                </div>
            }

                <div >
                    <div className="card-body">
                        <h5 className="card-title">{data.destination}</h5>
                        <p className="card-text"><span className="font-italic">Start date: </span>{data.startDate}</p>
                        <p  className="card-text"><span className="font-italic">End date: </span> {data.endDate}</p>
                        <p className="card-text"><span className="font-weight-bold">Status: </span> 
                        { data.privacy ? "Private": "Public"}
                        </p>
                    </div>
                    {
                        cardType === "tripList" ? null 
                        :
                            <ul className="list-group list-group-flush w-100">
                                <li className="list-group-item font-weight-bold" kay="title">Places to visit:</li>
                                {
                                    data.places.length ?
                                        data.places.map(place=><li className="list-group-item" kay={data._id + place}>{place}</li>)
                                        : <li className="list-group-item" key="empty">No places to visit added</li>
                                }
                            </ul>
                    }
                    <div  className="card-body text-center">
                    {
                        buttons.map(button=><LinkButton buttonType={button} itemId={data._id}/>)
                    }

                    </div>
                </div>
            </div>
        )
    }
}

export default Card;
