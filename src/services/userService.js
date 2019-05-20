import {post, get, update} from '../data/requester'
const ADMINROLEID = '7d6ed2c1-4d61-4521-a578-844b3f0570d1';

class UserService {
    constructor(){
        this._adminId=ADMINROLEID
    }

    get adminId() {
        return this._adminId
    }
    
    register = (userData)=>{
       return post('user', '', 'basic', userData)
        .then(rawData=>rawData.json())
    }

    login = (userData)=>{
      return  post('user', 'login', 'basic', userData)
        .then(rawData=>rawData.json())
    }

    logout = ()=>{
      let logoutData = {
        authtoken: localStorage.getItem('authtoken')
      };
      return post('user', '_logout', 'kinvey', logoutData)
    }

    getUserById =(id)=>{
      return get('user', id, 'kinvey')
      .then(rawData=>rawData.json())
    }

    update=(id, data)=>{
      return update('user', id, 'kinvey', data)
      .then(rawData=>rawData.json())
    }

    isUserAdmin=(body)=>{
      let isAdmin = false;
      if(body._kmd.roles){
        body._kmd.roles.forEach(role=>{
          if(role.roleId === ADMINROLEID){
            isAdmin=true;
          }
        })
      }
      return isAdmin;
    }

    storeUserData=(body, isAdmin)=>{
      localStorage.setItem('authtoken', body._kmd.authtoken);
      localStorage.setItem('userId', body._id);
      localStorage.setItem('username', body.username);
      localStorage.setItem('isAdmin', isAdmin);
      if(isAdmin){
        localStorage.setItem('adminRoleId', ADMINROLEID);
      }
    }

    clearStoredData=()=>{
        localStorage.clear();
    }
}

export default UserService;