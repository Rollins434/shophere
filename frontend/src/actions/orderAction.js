import { ORDER_CREATE_REQUEST,ORDER_CREATE_SUCCESS,ORDER_CREATE_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL } from "../constants/orderConstant";
import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
    console.log(order)
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      dispatch({
        type: ORDER_CREATE_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(`/api/orders`,order, config);
  
      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const getOrderDetails = (id) => async (dispatch, getState) => {

    try {
      const {
        userLogin: { userInfo },
      } = getState();
      dispatch({
        type: ORDER_DETAILS_REQUEST,
      });
      const config = {
        headers: {
       
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/orders/${id}`, config);
  
      dispatch({
        type: ORDER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };