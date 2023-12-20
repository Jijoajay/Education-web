import axios from "axios"

export default axios.create({
    baseURL: "http://127.0.0.1:4500",
    withCredentials:true,
    headers:{
        'Content-Type': 'application/json',  // set header so server knows we are sending json data
    }
})