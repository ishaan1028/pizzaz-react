
export const addToCart = (pizza, size, quantity) => (dispatch, getState) => {

    const cartItem = {
        pizza,
        quantity,
        size
    }

    dispatch({ type: "ADD_TO_CART", payload: cartItem });

    const cartItems = getState().cartReducer.cartItems;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

}

export const deleteFromCart = (id) => (dispatch, getState) => {

    dispatch({ type: "DELETE_FROM_CART", payload: id });

    const cartItems = getState().cartReducer.cartItems;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

}

export const emptyCart = () => (dispatch) => {

    dispatch({ type: "EMPTY_CART" });
    localStorage.removeItem("cartItems");

}