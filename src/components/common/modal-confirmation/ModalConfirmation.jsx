import React, {Component} from 'react';

class ModalConfirmation extends Component{
    constructor(props){
      super(props)
    }
    render(){
        const {confirmAction}=this.props;
        return(
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">We need your confirmation</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  Are you sure you want to proceed further?
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>confirmAction('delete','/')} >Confirm</button>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default ModalConfirmation;