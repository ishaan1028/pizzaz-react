import React from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { placeOrder } from '../actions/order.action';

export default function Checkout({ subTotal }) {

    const dispatch = useDispatch();
    const history = useHistory();
    const { isLoading, error } = useSelector(state => state.createOrderReducer);

    const tokenHandler = (token) => {
        dispatch(placeOrder(token, subTotal, history));
    }

    return (
        <div>
            <StripeCheckout
                amount={subTotal * 100}
                shippingAddress
                stripeKey='pk_test_51KBg3uSHge9UlUwhwTHIXmn6Jas6K5lQzM1T0wfvOGpdwDmytA3hzPuWfcorQo1WOUwdQEYR68c7css8wVmkGrVX00e1jKi2I6'
                token={tokenHandler}
                currency='INR'
            >
                <div className="payoutBtnDiv">
                    {
                        error && <div className="centeringDiv">
                            <Alert className="w-100" variant="danger ">
                                {error}
                            </Alert>
                        </div>
                    }
                    {
                        !error && <Button className='pizzaButton' >
                            {isLoading ? <Spinner animation="border" size="sm" /> : "Pay"}
                        </Button>
                    }

                </div>
            </StripeCheckout>

        </div>
    )
}
