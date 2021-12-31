
export const registerUserReducer = (state = {}, action) => {
    switch (action.type) {

        case "REGISTER_USER_REQUEST": return {
            isLoading: true
        }

        case "REGISTER_USER_SUCCESS": return {
            isLoading: false,
        }

        case "REGISTER_USER_FAILED": return {
            error: action.payload,
            isLoading: false
        }

        default: return state;

    }
}

export const loginUserReducer = (state = {}, action) => {
    switch (action.type) {

        case "LOGIN_USER_REQUEST": return {
            isLoading: true
        }

        case "LOGIN_USER_SUCCESS": return {
            isLoading: false,
            isLoggedIn: true,
            user: action.payload
        }

        case "LOGIN_USER_FAILED": return {
            error: action.payload,
            isLoading: false
        }

        case "LOGOUT_USER": return {
            isLoggedIn: false
        }

        default: return state;

    }
}

export const getAllUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {

        case "GET_ALL_USERS_REQUEST": return {
            isLoading: true
        }

        case "GET_ALL_USERS_SUCCESS": return {
            isLoading: false,
            users: action.payload
        }

        case "GET_ALL_USERS_FAILED": return {
            error: action.payload,
            isLoading: false
        }

        default: return state;

    }
}

export const editRoleReducer = (state = {}, action) => {
    switch (action.type) {

        case "EDIT_ROLE_REQUEST": return {
            isUpdating: true
        }

        case "EDIT_ROLE_SUCCESS": return {
            isUpdating: false,
        }

        case "EDIT_ROLE_FAILED": return {
            isUpdating: false
        }

        default: return state;

    }
}

export const deleteUserReducer = (state = {}, action) => {
    switch (action.type) {

        case "DELETE_USER_REQUEST": return {
            isDeleting: true
        }

        case "DELETE_USER_SUCCESS": return {
            isDeleting: false,
        }

        case "DELETE_USER_FAILED": return {
            isDeleting: false
        }

        default: return state;

    }
}