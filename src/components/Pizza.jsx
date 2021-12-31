import React from 'react';
import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '../actions/cart.action';


export default function Pizza({ pizza }) {

    const dispatch = useDispatch();

    const [size, setSize] = useState("small");
    const [quantity, setQuantity] = useState(1);

    const [showModal, setShowModal] = useState(false);

    const handleModalClose = () => setShowModal(false);
    const handleModalShow = () => setShowModal(true);

    const handleSizeChange = ({ target: { value } }) => {
        setSize(value);
    }

    const handleQuantityChange = ({ target: { value } }) => {
        setQuantity(value);
    }

    const handleAddToCart = () => {
        dispatch(addToCart(pizza, size, quantity));
        toast.success("Pizza added to cart");
    }

    return <div className="pizzaBody">
        <h5 onClick={handleModalShow} className='pizzaName uiBold'>{pizza.name}</h5>
        <div className="pizzaImageDiv">
            <img src={pizza.image} className="pizzaImage" alt="Pizza"
                onClick={handleModalShow}
            />
        </div>


        <p className="pizzaPricePara uiBold">
            Price: Rs. {pizza.prices[size] * quantity}
        </p>
        <div className="pizzaDetailsDiv uiBold">
            <p className="pizzaDetailText">
                Size
            </p>
            <Form.Select value={size} onChange={handleSizeChange}>
                {
                    pizza.sizes.map(s =>
                        <option key={s} value={s}>{s}</option>
                    )
                }
            </Form.Select>
        </div>
        <div className="pizzaDetailsDiv uiBold">
            <p className="pizzaDetailText">
                Quantity
            </p>
            <Form.Select value={quantity} onChange={handleQuantityChange}>
                {
                    [...Array(10).keys()].map(x =>
                        <option key={x} value={x + 1}>{x + 1}</option>
                    )
                }
            </Form.Select>
        </div>

        <div className="addToCartButtonDiv">
            <Button className='pizzaButton' onClick={handleAddToCart}>Add to cart</Button>
        </div>

        <Modal show={showModal} onHide={handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>{pizza.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <div className="modalPizzaImageDiv">
                    <img src={pizza.image} alt="Pizza" className="modalPizzaImage" />
                </div>

                <p className="pizzaDescriptionPara">
                    {pizza.description}
                </p>

            </Modal.Body>
            <Modal.Footer>
                <Button className='pizzaButton w-100' onClick={handleModalClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>

    </div>
}
