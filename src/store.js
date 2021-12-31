
import { combineReducers, createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

import {
    getAllPizzasReducer,
    addNewPizzaReducer,
    getPizzaByIdReducer,
    editPizzaReducer,
    deletePizzaReducer
} from "./reducers/pizza.reducer";
import {
    createOrderReducer,
    getUserOrdersReducer,
    getAllOrdersReducer,
    deliverOrderReducer
} from "./reducers/order.reducer";
import {
    registerUserReducer,
    loginUserReducer,
    getAllUsersReducer
    , editRoleReducer,
    deleteUserReducer
} from "./reducers/users.reducer";
import cartReducer from "./reducers/cart.reducer";

const reducer = combineReducers({
    getAllPizzasReducer,
    cartReducer,
    registerUserReducer,
    loginUserReducer,
    createOrderReducer,
    getUserOrdersReducer,
    getAllUsersReducer,
    addNewPizzaReducer,
    getPizzaByIdReducer,
    editPizzaReducer,
    deletePizzaReducer,
    getAllOrdersReducer,
    deliverOrderReducer,
    editRoleReducer,
    deleteUserReducer
});

const cartItems = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];

const isLoggedIn = localStorage.getItem("token") ? true : false;
const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
    cartReducer: {
        cartItems
    },
    loginUserReducer: {
        isLoggedIn,
        user
    }
};

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;