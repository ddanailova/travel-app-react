import React from 'react';
import {Link} from 'react-router-dom';

const LinkButton = (props)=>{
    const {buttonType, itemId} = props;
    const defaultClass ="btn card-link btn-primary ";
    let extraClasses="";
    let linkPath="";
    let buttonText="";
    let shouldOpenModal=false;

    switch(buttonType){
        case 'details': linkPath=`/trip/details/${itemId}`; buttonText="Details"; 
            break;
        case 'edit': linkPath=`/trip/edit/${itemId}`; buttonText="Edit";
            break;
        case 'delete': linkPath=``; buttonText="Delete"; extraClasses="btn-danger"; shouldOpenModal=true;
            break;
        default:
            break;
    }
    const extendedClass = defaultClass + extraClasses;
    if(shouldOpenModal){
        return(
            <Link to={linkPath} className={extendedClass} data-toggle="modal" data-target="#exampleModalCenter">{buttonText}</Link>
        )
    }
    return(
        <Link to={linkPath} className={extendedClass}>{buttonText}</Link>
    )
}

export default LinkButton;