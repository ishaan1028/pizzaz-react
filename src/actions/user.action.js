import axios from "axios";
import { toast } from "react-toastify";

export const registerUser = (name, email, password, history, formik) => async (dispatch) => {

    dispatch({ type: "REGISTER_USER_REQUEST" });

    try {
        await axios.post("/auth/register", { name, email, password });
        dispatch({ type: "REGISTER_USER_SUCCESS" });
        formik.resetForm();
        toast.success("User registered successfully");
        setTimeout(() => {
            history.push("/login");
        }, 2000);
    }
    catch (err) {
        console.error(err);
        dispatch({ type: "REGISTER_USER_FAILED", payload: err?.response?.data });
    }

}

export const loginUser = (email, password, history) => async (dispatch) => {

    dispatch({ type: "LOGIN_USER_REQUEST" });

    try {
        const { data } = await axios.post("/auth/login", { email, password });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch({ type: "LOGIN_USER_SUCCESS", payload: data.user });
        history.replace("/");
    }
    catch (err) {
        console.error(err);
        dispatch({ type: "LOGIN_USER_FAILED", payload: err?.response?.data });
    }

}

export const logoutUser = (history) => async (dispatch) => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT_USER" });
    toast.success("Logged out. See ya soon...");
    history.replace("/login");

}


export const getAllUsers = () => async (dispatch) => {

    dispatch({ type: "GET_ALL_USERS_REQUEST" });

    try {
        const { data } = await axios.get("/users/admin/allusers", {
            headers: { "token": localStorage.getItem("token") }
        });
        dispatch({ type: "GET_ALL_USERS_SUCCESS", payload: data });
    }
    catch (err) {
        console.error(err);
        dispatch({ type: "GET_ALL_USERS_FAILED", payload: err });
    }

}

export const editRoleAction = (id, users) => async (dispatch) => {

    dispatch({ type: "EDIT_ROLE_REQUEST" });

    try {
        const { data } = await axios.put(`/users/admin/editrole/${id}`, {}, {
            headers: { "token": localStorage.getItem("token") }
        });

        dispatch({
            type: "GET_ALL_USERS_SUCCESS",
            payload: users.map(u => u._id === id ? data : u)
        });

        dispatch({ type: "EDIT_ROLE_SUCCESS" });

        toast.success("User role updated successfully");
    }
    catch (err) {
        console.error(err);
        dispatch({ type: "EDIT_ROLE_FAILED" });
        toast.error("Error updating user role");

    }

}

export const deleteUserAction = (id, users) => async (dispatch) => {

    dispatch({ type: "DELETE_USER_REQUEST" });

    try {
        await axios.delete(`/users/admin/deleteuser/${id}`, {
            headers: { "token": localStorage.getItem("token") }
        });

        dispatch({
            type: "GET_ALL_USERS_SUCCESS",
            payload: users.filter(u => u._id !== id)
        });

        dispatch({ type: "DELETE_USER_SUCCESS" });

        toast.success("User deleted successfully");
    }
    catch (err) {
        console.error(err);
        dispatch({ type: "DELETE_USER_FAILED" });
        toast.error("Error deleting user");

    }

}