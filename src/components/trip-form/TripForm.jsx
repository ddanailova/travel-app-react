import React from 'react';

import Input from './../common/Input';
import './TripForm.scss';

const TripForm =(props)=>{
    const {actionType,errors, data,handleInputChange}=props;
    const {destination, startDate, endDate, image, places, privacy}=data;
    return (
        <div className="col-4 bg-light custom-box mr-5">
            <h1 className="text-center pb-3 text-capitalize">{actionType} Trip</h1>
            <form>
                <Input
                    label="Destination *"
                    type="text"
                    id="destination"
                    name="destination"
                    value={destination}
                    handleInputChange={(ev)=>handleInputChange(ev, true)}
                    isValid={!errors.destination}
                    errorMsg={errors.destination}
                />
                <div className="form-row">
                    <Input
                        label="Start Date *"
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={startDate}
                        handleInputChange={(ev)=>handleInputChange(ev, true)}
                        isValid={!errors.startDate}
                        errorMsg={errors.startDate}
                        formGroupClasses="col-md-6"
                    />
                    <Input
                        label="End Date *"
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={endDate}
                        handleInputChange={(ev)=>handleInputChange(ev, true)}
                        isValid={!errors.endDate}
                        errorMsg={errors.endDate}
                        formGroupClasses="col-md-6"
                    />
                </div>
                <Input
                    label="Image"
                    type="text"
                    id="image"
                    name="image"
                    value={image}
                    handleInputChange={(ev)=>handleInputChange(ev, true)}
                    isValid={!errors.image}
                    errorMsg={errors.image}
                />
                <Input
                    label="Places to visit"
                    example="( example: First Place, Second Place, Third Place )"
                    type="textarea"
                    id="places"
                    name="places"
                    value={places}
                    handleInputChange={(ev)=>handleInputChange(ev)}
                />
                <Input
                    label="Keep private"
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    value={privacy}
                    handleInputChange={(ev)=>handleInputChange(ev)}
                />
            </form>
        </div>
    )
}

export default TripForm;