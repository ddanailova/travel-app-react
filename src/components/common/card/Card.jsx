import React from 'react';
import './Card.scss';
import LinkButton from './../LinkButton';

const Card =(props)=>{
    const {data, cardType, buttons}=props;
    let cardStyleClass="card ";
    if(cardType === "tripDetails"){
        cardStyleClass+="flex-row";
    }
    return(

        <div className={cardStyleClass}>
            <div className="card-header">
             {
                 data.image ? <img src={data.image} alt={`${data.destination} view`}/>
                 : <img src="https://static.vecteezy.com/system/resources/previews/000/140/003/non_2x/free-vector-landscape.jpg" alt='Default view'/>
             }
             </div>

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
                    buttons ? (buttons.map(button=><LinkButton buttonType={button} itemId={data._id}/>)) : null
                }

                </div>
            </div>
        </div>
    )
}

export default Card;
