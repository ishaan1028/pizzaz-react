import axios from 'axios';
import { toast } from 'react-toastify';

export const getAllPizzas = () => async (dispatch) => {

    dispatch({ type: "GET_PIZZAS_REQUEST" });

    try {
        const { data } = await axios.get("/pizzas/all");
        dispatch({ type: "GET_PIZZAS_SUCCESS", payload: data });
    }
    catch (err) {
        console.error(err);
        dispatch({ type: "GET_PIZZAS_FAILED", payload: err });
    }

}

export const getPizzaById = (id) => async (dispatch) => {

    dispatch({ type: "GET_PIZZA_BY_ID_REQUEST" });

    try {
        const { data } = await axios.get(`/pizzas/${id}`);
        dispatch({ type: "GET_PIZZA_BY_ID_SUCCESS", payload: data });
    }
    catch (err) {
        console.error(err);
        dispatch({ type: "GET_PIZZA_BY_ID_FAILED", payload: "Something went wrong" });
    }

}

export const filterPizzas = (keyword, filter) => async (dispatch) => {

    dispatch({ type: "GET_PIZZAS_REQUEST" });

    try {
        const { data } = await axios.get("/pizzas/all");
        const searchResults = data.filter(pizza => pizza.name.toLowerCase().includes(keyword));
        dispatch({
            type: "GET_PIZZAS_SUCCESS",
            payload: filter === "all" ? searchResults : searchResults.filter(pizza => pizza.category === filter)
        });
    }
    catch (err) {
        console.error(err);
        dispatch({ type: "GET_PIZZAS_FAILED", payload: err });
    }

}

export const addNewPizza = (pizza, formik) => async (dispatch) => {

    dispatch({ type: "ADD_PIZZA_REQUEST" });

    try {
        const { data } = await axios.post("/pizzas/admin/addpizza", { ...pizza }, {
            headers: { "token": localStorage.getItem("token") }
        });
        dispatch({ type: "ADD_PIZZA_SUCCESS", payload: data });
        formik.resetForm();
        toast.success("New pizza added successfully!")
    }
    catch (err) {
        console.error(err);
        dispatch({ type: "ADD_PIZZA_FAILED", payload: "Something went wrong" });
    }

}

export const editPizzaAction = (pizza, id) => async (dispatch) => {

    dispatch({ type: "EDIT_PIZZA_REQUEST" });

    try {
        await axios.put(`/pizzas/edit/${id}`, { ...pizza }, {
            headers: { "token": localStorage.getItem("token") }
        });
        dispatch({ type: "EDIT_PIZZA_SUCCESS" });
        toast.success("Pizza updated successfully!");
    }
    catch (err) {
        console.error(err);
        dispatch({ type: "EDIT_PIZZA_FAILED" });
        toast.error("Error updating Pizza. Try later.");
    }

}

export const deletePizzaAction = (id, pizzas) => async (dispatch) => {

    dispatch({ type: "DELETE_PIZZA_REQUEST" });

    try {
        await axios.delete(`/pizzas/delete/${id}`, {
            headers: { "token": localStorage.getItem("token") }
        });

        dispatch({
            type: "GET_PIZZAS_SUCCESS",
            payload: pizzas.filter(pizza => pizza._id !== id)
        });
        dispatch({ type: "DELETE_PIZZA_SUCCESS" });
        toast.success("Pizza deleted successfully!");
    }
    catch (err) {
        console.error(err);
        dispatch({ type: "DELETE_PIZZA_FAILED" });
        toast.error("Error deleting Pizza. Try later.");
    }

}