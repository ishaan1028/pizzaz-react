import axios from 'axios';
import { toast } from 'react-toastify';
import { emptyCart } from './cart.action';

export const placeOrder = (token, subTotal, history) => async (dispatch, getState) => {

    dispatch({ type: "PLACE_ORDER_REQUEST" });
    const cartItems = getState().cartReducer.cartItems;

    try {
        await axios.post("/orders/create", { token, subTotal, cartItems }, {
            headers: { "token": localStorage.getItem("token") }
        });
        dispatch({ type: "PLACE_ORDER_SUCCESS" });
        dispatch(emptyCart());

        history.push("/orders");

    }
    catch (err) {
        console.error(err);
        dispatch({ type: "PLACE_ORDER_FAILED", payload: "Something went wrong. Try again" });
    }

}

export const getUserOrders = () => async (dispatch) => {

    dispatch({ type: "GET_USER_ORDERS_REQUEST" });

    try {
        const { data } = await axios.get("/orders/userorders", {
            headers: { "token": localStorage.getItem("token") }
        });
        dispatch({ type: "GET_USER_ORDERS_SUCCESS", payload: data });
    }
    catch (err) {
        console.error(err);
        dispatch({ type: "GET_USER_ORDERS_FAILED", payload: err });
    }

}

export const getAllOrders = () => async (dispatch) => {

    dispatch({ type: "GET_ALL_ORDERS_REQUEST" });

    try {
        const { data } = await axios.get("/orders/admin/all", {
            headers: { "token": localStorage.getItem("token") }
        });
        dispatch({ type: "GET_ALL_ORDERS_SUCCESS", payload: data });
    }
    catch (err) {
        console.error(err);
        dispatch({ type: "GET_ALL_ORDERS_FAILED", payload: err });
    }

}

export const deliverOrderAction = (id, orders) => async (dispatch) => {

    dispatch({ type: "DELIVER_ORDER_REQUEST" });

    try {
        const { data } = await axios.put(`/orders/admin/deliver/${id}`, {}, {
            headers: { "token": localStorage.getItem("token") }
        });

        dispatch({
            type: "GET_ALL_ORDERS_SUCCESS",
            payload: orders.map(o => o._id === id ? data : o)
        });
        dispatch({ type: "DELIVER_ORDER_SUCCESS" });
        toast.success("Order delivered!");
    }
    catch (err) {
        console.error(err);
        dispatch({ type: "DELIVER_ORDER_FAILED" });
        toast.error("Error delivering order!");
    }

}