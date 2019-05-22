import React, {Component} from 'react';
import './Preview.scss';

class Preview extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {actionType}=this.props;
        return (                
            
            <div className="col-4 bg-light custom-box">
                <h2 className="text-center pb-3">Preview</h2>
                <div className="card">
                    <img  src="./../../static/images/card-landscape.jpg" alt="Card image cap"/>
                    <div className="wrapper">
                    <div className="card-body">
                        <h5 className="card-title">Barcelona</h5>
                        <p  className="card-text"><span className="font-italic">Start date:</span> 01/07/2019</p>
                        <p  className="card-text"><span className="font-italic">End date:</span> 21/12/2019</p>
                        <p  className="card-text"><span className="font-weight-bold">Status:</span> Public</p>
                    </div>
                    <ul className="list-group list-group-flush w-100">
                        <li className="list-group-item">No places to visit added</li>
                        <li className="list-group-item">First place</li>
                        <li className="list-group-item">Second place</li>
                    </ul>
                    <div  className="card-body text-center">
                        <button className="btn btn-success card-link">Looks Good!</button>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Preview;