import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../actions/order.action';
import Loader from '../components/Loader';
import Order from '../components/Order';

export default function Orders() {

    const dispatch = useDispatch();
    const { orders, isLoading, error } = useSelector(state => state.getUserOrdersReducer);

    useEffect(() => {
        dispatch(getUserOrders());
    }, [dispatch]);

    return <Loader isLoading={isLoading} error={error}>
        <Container>
            <div className="ordersWrapper">
                <h2 className="uiBold centerAlign titleH2">
                    My Orders
                </h2>
                <div className="ordersList">
                    {
                        orders?.map(order => <Order key={order._id} order={order} firstId={orders[0]._id} />)
                    }
                </div>
            </div>

        </Container>
    </Loader>
}
