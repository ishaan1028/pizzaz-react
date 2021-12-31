export const createOrderReducer = (state = {}, action) => {
    switch (action.type) {

        case "PLACE_ORDER_REQUEST": return {
            isLoading: true
        }

        case "PLACE_ORDER_SUCCESS": return {
            isLoading: false
        }

        case "PLACE_ORDER_FAILED": return {
            error: action.payload,
            isLoading: false
        }

        default: return state;

    }
}


export const getUserOrdersReducer = (state = { orders: [] }, action) => {

    switch (action.type) {

        case "GET_USER_ORDERS_REQUEST": return {
            isLoading: true
        }

        case "GET_USER_ORDERS_SUCCESS": return {
            orders: action.payload,
            isLoading: false
        }

        case "GET_USER_ORDERS_FAILED": return {
            error: action.payload,
            isLoading: false
        }

        default: return state;

    }

}

export const getAllOrdersReducer = (state = { orders: [] }, action) => {

    switch (action.type) {

        case "GET_ALL_ORDERS_REQUEST": return {
            isLoading: true
        }

        case "GET_ALL_ORDERS_SUCCESS": return {
            orders: action.payload,
            isLoading: false
        }

        case "GET_ALL_ORDERS_FAILED": return {
            error: action.payload,
            isLoading: false
        }

        default: return state;

    }

}

export const deliverOrderReducer = (state = {}, action) => {

    switch (action.type) {

        case "DELIVER_ORDER_REQUEST": return {
            isDelivering: true
        }

        case "DELIVER_ORDER_SUCCESS": return {
            isDelivering: false
        }

        case "DELIVER_ORDER_FAILED": return {
            isDelivering: false
        }

        default: return state;

    }

}