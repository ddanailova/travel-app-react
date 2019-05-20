const kinveyBaseUrl = "https://baas.kinvey.com/";
const kinveyAppKey = "kid_H1Qu2hyp4";
const kinveyAppSecret = "6454aae378f84f5c80a907753a1cad7c";
// Creates the authentication header
const makeAuth = (type)=> {
    return type === 'basic'
        ?  'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret)
        :  'Kinvey ' + localStorage.getItem('authtoken');
}
const makeUrl=(module, endpoint)=>{
    return kinveyBaseUrl + module + '/' + kinveyAppKey + '/' + endpoint
}
// Creates request object to kinvey
const makeRequest =(method, auth, options={}) => {
    return  {
        method,
        headers: {
            "Authorization": makeAuth(auth),
            "Content-Type": "application/json",
            ...options
        }
    };
}
// Function to return GET promise
const get = (module, endpoint, auth, options) => {
    return fetch(makeUrl(module, endpoint),makeRequest('GET', auth, options));
}
// Function to return POST promise
const post = (module, endpoint, auth, data) => {
    let req = makeRequest('POST', auth);
    req.body= JSON.stringify(data);
    return fetch(makeUrl(module, endpoint),req);
}
// Function to return PUT promise
const update = (module, endpoint, auth, data, options)=> {
    let req = makeRequest('PUT', auth, options);
    req.body= JSON.stringify(data);
    return fetch(makeUrl(module, endpoint),req);
}

// Function to return DELETE promise
const remove = (module, endpoint, auth, options)=> {
    return fetch(makeUrl(module, endpoint),makeRequest('DELETE', auth, options));
}
export {
    get,
    post,
    update,
    remove,
}