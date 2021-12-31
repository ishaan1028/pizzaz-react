
export const getAllPizzasReducer = (state = { pizzas: [] }, action) => {

    switch (action.type) {

        case "GET_PIZZAS_REQUEST": return {
            ...state,
            isLoading: true
        }

        case "GET_PIZZAS_SUCCESS": return {
            pizzas: action.payload,
            isLoading: false
        }

        case "GET_PIZZAS_FAILED": return {
            ...state,
            error: action.payload,
            isLoading: false
        }

        default: return state;

    }

}

export const getPizzaByIdReducer = (state = { pizza: {} }, action) => {

    switch (action.type) {

        case "GET_PIZZA_BY_ID_REQUEST": return {
            isLoading: true
        }

        case "GET_PIZZA_BY_ID_SUCCESS": return {
            pizza: action.payload,
            isLoading: false
        }

        case "GET_PIZZA_BY_ID_FAILED": return {
            error: action.payload,
            isLoading: false
        }

        default: return state;

    }

}


export const addNewPizzaReducer = (state = { pizza: {} }, action) => {

    switch (action.type) {

        case "ADD_PIZZA_REQUEST": return {
            isLoading: true
        }

        case "ADD_PIZZA_SUCCESS": return {
            pizza: action.payload,
            isLoading: false
        }

        case "ADD_PIZZA_FAILED": return {
            error: action.payload,
            isLoading: false
        }

        default: return state;

    }

}

export const editPizzaReducer = (state = {}, action) => {

    switch (action.type) {

        case "EDIT_PIZZA_REQUEST": return {
            isSubmitting: true
        }

        case "EDIT_PIZZA_SUCCESS": return {
            isSubmitting: false
        }

        case "EDIT_PIZZA_FAILED": return {
            isSubmitting: false
        }

        default: return state;

    }

}


export const deletePizzaReducer = (state = {}, action) => {

    switch (action.type) {

        case "DELETE_PIZZA_REQUEST": return {
            isDeleting: true
        }

        case "DELETE_PIZZA_SUCCESS": return {
            isDeleting: false
        }

        case "DELETE_PIZZA_FAILED": return {
            isDeleting: false
        }

        default: return state;

    }

}

