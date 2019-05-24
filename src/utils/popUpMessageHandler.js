import { toast } from 'react-toastify';

const popUpError =(message)=>{
    toast.error(message,{
        closeButton: false,
        position: toast.POSITION.TOP_RIGHT,
        autoClose:3000,
      } )
}

const popUpSuccess =(message)=>{
    toast.success(message,{
        closeButton: false,
        position: toast.POSITION.TOP_RIGHT,
        autoClose:6000,
      } )
}

const popUpInfo =(message)=>{
    toast.info(message,{
        closeButton: false,
        position: toast.POSITION.TOP_CENTER,
        autoClose:8000,
      } )
}

const serverErrorPopUp = (err)=>{
  popUpError('Sorry something went wrong with the server.')
  console.log(err)
}

export {popUpError, popUpSuccess, popUpInfo, serverErrorPopUp}