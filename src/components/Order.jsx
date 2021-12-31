import React from 'react'

export default function Order({ order, firstId }) {
    return (
        <div className={order._id === firstId ? "orderBody latestOrder" : 'orderBody'} >
            <div className="orderBodyLeft">
                <h5 className="orderTitle">
                    Items
                </h5>
                <ul className="orderItemsList">
                    {
                        order.orderItems.map(item =>
                            <li key={item.pizza.name} className="orderItem">
                                <p className="orderItemDetails">
                                    {item.pizza.name} [{item.size}] * {item.quantity} =
                                    {" "}{item.pizza.prices[item.size] * item.quantity}
                                </p>
                            </li>
                        )
                    }
                </ul>

            </div>
            <div className="orderBodyCenter">
                <h5 className="orderTitle">
                    Address
                </h5>
                <div className="addressDiv">
                    <p>Street: {order.shippingAddress.street}</p>
                    <p>City: {order.shippingAddress.city}</p>
                    <p>Country: {order.shippingAddress.country}</p>
                    <p>Pincode: {order.shippingAddress.pincode}</p>
                </div>

            </div>
            <div className="orderBodyRight">
                <h5 className="orderTitle">
                    Order Info
                </h5>
                <div className="orderInfoDiv">
                    <p>Amount paid: {order.orderAmount}</p>
                    <p>Ordered: {(new Date(order.createdAt)).toUTCString()}</p>
                    <p>Transaction ID: {order.transactionId}</p>
                    <p>Order ID: {order._id}</p>
                    <p>Order status: {order.isDelivered ? "Delivered" : "Delivery pending"}</p>
                </div>

            </div>
        </div>
    )
}
