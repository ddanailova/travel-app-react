import React, {Component} from 'react';

import Input from './../common/Input';
import './TripForm.scss';

class TripForm extends Component{
    constructor(props){
        super(props);
    }

    handlePreview=(ev)=>{
        ev.preventDefault();
        const {data, errors}=this.props;
        console.log('errors: ',errors);
        console.log('data: ', data)
    }
    render(){
        const {actionType,handleInputChange,validateInputOnBlur,clearErrorsOnFocus, errors, data, isFormValid}=this.props;
        const {destination, startDate, endDate, image, places, privacy}=data;
        return (
            <div className="col-4 bg-light custom-box mr-5">
                <h1 className="text-center pb-3 text-capitalize">{actionType} Trip</h1>
                <form onSubmit={this.handlePreview}>
                    <Input
                        label="Destination"
                        type="text"
                        id="destination"
                        name="destination"
                        value={destination}
                        handleInputChange={handleInputChange}
                        validateInputOnBlur={()=>validateInputOnBlur('destination', destination, true)}
                        clearErrorsOnFocus={()=>clearErrorsOnFocus('destination')}
                        isValid={!errors.destination}
                        errorMsg={errors.destination}
                    />
                    <div className="form-row">
                        <Input
                            label="Start Date"
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={startDate}
                            handleInputChange={handleInputChange}
                            validateInputOnBlur={()=>validateInputOnBlur('startDate', startDate, true)}
                            clearErrorsOnFocus={()=>clearErrorsOnFocus('startDate')}
                            isValid={!errors.startDate}
                            errorMsg={errors.startDate}
                            formGroupClasses="col-md-6"
                        />
                        <Input
                            label="End Date"
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={endDate}
                            handleInputChange={handleInputChange}
                            validateInputOnBlur={()=>validateInputOnBlur('endDate', endDate,true)}
                            clearErrorsOnFocus={()=>clearErrorsOnFocus('endDate')}
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
                        handleInputChange={handleInputChange}
                        validateInputOnBlur={()=>validateInputOnBlur('image', image)}
                        clearErrorsOnFocus={()=>clearErrorsOnFocus('image')}
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
                        handleInputChange={handleInputChange}
                    />
                    <Input
                        label="Keep privacy"
                        type="checkbox"
                        id="privacy"
                        name="privacy"
                        value={image}
                        handleInputChange={handleInputChange}
                    />
                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-primary ml-auto mr-auto">Preview</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default TripForm;