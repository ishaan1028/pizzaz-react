import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { deliverOrderAction, getAllOrders } from '../actions/order.action';

export default function OrdersList() {

    const dispatch = useDispatch();
    const { orders, isLoading, error } = useSelector(state => state.getAllOrdersReducer);
    const { isDelivering } = useSelector(state => state.deliverOrderReducer);

    useEffect(() => {

        dispatch(getAllOrders());

    }, [dispatch]);

    const handleDeliver = (id) => {
        dispatch(deliverOrderAction(id, orders));
    }

    return <div className="adminSubContainer">
        <h4 className="titleAdminNav">
            Orders
        </h4>
        <Loader isLoading={isLoading || isDelivering} error={error}>
            <Table striped bordered responsive className="adminTables">
                <thead >
                    <tr>
                        <th>Order ID</th>
                        <th>Email</th>
                        <th>User</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders?.map(order =>
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.email}</td>
                                <td>{order.userId}</td>
                                <td>{order.orderAmount}</td>
                                <td>{(new Date(order.createdAt)).toDateString()}</td>
                                <td>
                                    {order.isDelivered ? <span className='orderStatusSpan'>Delivered</span> : <Button onClick={() => handleDeliver(order._id)} variant='outline-primary' >Deliver</Button>}
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </Loader>
    </div>
}
