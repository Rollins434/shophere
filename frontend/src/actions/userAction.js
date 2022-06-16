import axios from "axios"
import { LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL } from "../constants/userConstant"

export const userLogin =(email,password) => async(dispatch) =>{
    try {
        dispatch({
            type:LOGIN_REQUEST
        })
        const config = {
            headers:{
                'Content-Type' : 'application/json'
            }
        }
        const {data} = await axios.post('/api/users/login',{email,password},config)

        dispatch({
            type:LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem('userInfo',JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error,
          });
    }
}