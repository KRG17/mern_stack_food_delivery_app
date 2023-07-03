import axios from 'axios'

export const baseURL = "http://localhost:5000/food-delivery-app-2023-1e4ab/us-central1/app"

export const validateUserJWTToken = async (token) => {
    try{
        const res = await axios.get(`${baseURL}/api/users/jwtVerification`,{
            headers : {Authorization : "Bearer " + token}
        })
        return res.data.data
    }
    catch(err){
        return null;
    }
}