import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { FaMinus, FaPlus } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { addToCart, deleteFromCart } from '../actions/cart.action';


export default function CartItem({ item }) {

    const dispatch = useDispatch();

    const handleSizeChange = ({ target: { value } }) => {
        dispatch(addToCart(item.pizza, value, +item.quantity));
    }
    const handleQuantityChange = (op) => {

        if (op === "plus" && +item.quantity < 10) {
            dispatch(addToCart(item.pizza, item.size, +item.quantity + 1));

        }
        else if (op === "minus" && +item.quantity > 1) {
            dispatch(addToCart(item.pizza, item.size, +item.quantity - 1));
        }

    }

    const [deletePizzaShow, setDeletePizzaShow] = useState(false);
    const [deletePizzaId, setdeletePizzaId] = useState();

    const handleDeletePizzaShow = (id) => {
        setdeletePizzaId(id)
        setDeletePizzaShow(true);
    }

    const handleDeletePizzaClose = () => setDeletePizzaShow(false);

    const handleDeleteCartItem = () => {
        dispatch(deleteFromCart(deletePizzaId));
    }

    return <div className='cartItemBody'>
        <div className="cartItemBodyLeft">
            <div className="pizzaNameAndSize">
                <h5 className='uiBold'>{item.pizza.name}</h5>
                <Form.Select value={item.size} onChange={handleSizeChange}>
                    {
                        item.pizza.sizes.map(s =>
                            <option key={s} value={s}>{s}</option>
                        )
                    }
                </Form.Select>
            </div>

            <p className="cartItemPricePara uiBold">
                Price = {+item.quantity} * {item.pizza.prices[item.size]} = {+item.quantity * item.pizza.prices[item.size]}
            </p>

            <p className="cartItemQuantityPara uiBold">
                <span className="quantityTextSpan">Quantity</span>
                <span className="quantityChangerSpan">
                    <span className="plusIcon" onClick={() => handleQuantityChange("plus")}>
                        <FaPlus />
                    </span>
                    <span className="quantiyValue">
                        {+item.quantity}
                    </span>
                    <span className="minusIcon" onClick={() => handleQuantityChange("minus")}>
                        <FaMinus />
                    </span>
                </span>
            </p>

        </div>
        <div className="cartItemBodyLeft">
            <div className="cartItemImageAndDelete">
                <img src={item.pizza.image} alt="pizza" className="cartItemImage" />

                <span className="deleteIcon" onClick={() => handleDeletePizzaShow(item.pizza._id)}>
                    <AiFillDelete />
                </span>
            </div>

        </div>

        <Modal show={deletePizzaShow} onHide={handleDeletePizzaClose}>
            <Modal.Header closeButton>
                <Modal.Title>Remove Item?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to remove this item from cart?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleDeletePizzaClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDeleteCartItem}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>

    </div>
}
