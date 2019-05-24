import {post, get, update, remove} from '../data/requester'

class TripService {

    getAll = (filter)=>{
        let endpoint='trips';
        if(filter){
            endpoint=`trips?query={${filter}}`;
        }
        return get('appdata', endpoint, 'kinvey')
         .then(rawData=>rawData.json())
     }

    getById =(id)=>{
        const endpoint = `trips/${id}`
        return get('appdata', endpoint, 'kinvey')
         .then(rawData=>rawData.json())
    }

    create =(data)=>{
        return post('appdata', 'trips', 'kinvey', data)
        .then(rawData=>rawData.json())
    }

    update =(id,data)=>{
        const endpoint = `trips/${id}`
        return update('appdata', endpoint, 'kinvey', data)
        .then(rawData=>rawData.json())
    }

    remove = (id)=>{
        const endpoint = `trips/${id}`
        return remove('appdata', endpoint, 'kinvey')
        .then(rawData=>rawData.json())
    }

}

export default TripService;