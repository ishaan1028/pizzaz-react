
const cartReducer = (state = { cartItems: [] }, action) => {

    switch (action.type) {

        case "ADD_TO_CART":

            const itemAlreadyExists = state.cartItems.find(item => item.pizza._id === action.payload.pizza._id);

            if (itemAlreadyExists) {
                return {
                    cartItems: state.cartItems.map(item => item.pizza._id === action.payload.pizza._id ?
                        action.payload : item)
                }
            }
            else {
                return {
                    cartItems: [...state.cartItems, action.payload]
                }
            }

        case "DELETE_FROM_CART":

            return {
                cartItems: state.cartItems.filter(item => item.pizza._id !== action.payload)
            }

        case "EMPTY_CART":

            return {
                cartItems: []
            }

        default: return state;

    }

}

export default cartReducer;