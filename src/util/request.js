import axios from "axios";

const base_url = "http://localhost:8081/api/";

export const request = (url="", method ="get", data= {} ) =>{
    return axios ({
        url: base_url + url,
        method: method,
        data: data,
        headers: {},
    })
    .then((res) => res.data) 
    .catch((error)=> {
        console.log(error);
    })
    
}