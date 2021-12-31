import React, { useEffect, useState } from 'react'
import { Container, Alert, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import Checkout from '../components/Checkout';

export default function Cart() {

    const cartItems = useSelector(state => state.cartReducer.cartItems);
    const { isLoggedIn } = useSelector(state => state.loginUserReducer);
    const [subTotal, setSubTotal] = useState(0);

    useEffect(() => {

        const totalPrice = cartItems?.reduce((ans, item) => ans + item.pizza.prices[item.size] * item.quantity, 0);

        setSubTotal(totalPrice);

    }, [cartItems]);

    return <Container>
        <div className="cartWrapper">
            <div className="cartBody">
                <div className="cartLeft">
                    <h2 className="uiBold centerAlign">
                        My Cart
                    </h2>

                    <div className="cartItemsList">
                        {cartItems?.length === 0 && <Alert className='centeringDiv'>
                            Your cart is empty
                        </Alert>}
                        {cartItems?.map(item => <CartItem key={item.pizza._id} item={item} />)}
                    </div>

                </div>
                <div className="cartRight">
                    <h2 className="uiBold centerAlign">
                        Subtotal: Rs. {subTotal} only
                    </h2>
                    {subTotal > 0 && isLoggedIn && <Checkout subTotal={subTotal} />}
                    {subTotal > 0 && !isLoggedIn && <Link to="/login">
                        <Button className='pizzaButton w-100' >
                            Please login to checkout
                        </Button>
                    </Link>}
                    <div className="cardCreds">
                        <h5>Demo card details for checkout</h5>
                        <p>Card number: 4242 4242 4242 4242</p>
                        <p>Date: 12/23</p>
                        <p>CVC: 123</p>
                    </div>
                </div>
            </div>
        </div>
    </Container>
}
