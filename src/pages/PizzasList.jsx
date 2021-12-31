import React, { useEffect, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { deletePizzaAction, getAllPizzas } from '../actions/pizza.action';
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import Loader from '../components/Loader';
import { useHistory } from 'react-router-dom';

export default function PizzasList() {

    const dispatch = useDispatch();
    const history = useHistory();
    const { pizzas, isLoading, error } = useSelector(state => state.getAllPizzasReducer);
    const { isDeleting } = useSelector(state => state.deletePizzaReducer);

    useEffect(() => {

        dispatch(getAllPizzas());

    }, [dispatch]);


    const [deletePizzaShow, setDeletePizzaShow] = useState(false);
    const [deletePizzaId, setdeletePizzaId] = useState();

    const handleDeletePizzaShow = (id) => {
        setdeletePizzaId(id)
        setDeletePizzaShow(true);
    }

    const handleDeletePizzaClose = () => setDeletePizzaShow(false);

    const handleDeletePizzaOperation = () => {
        dispatch(deletePizzaAction(deletePizzaId, pizzas));
        handleDeletePizzaClose();
    }


    return <div className="adminSubContainer">
        <h4 className="titleAdminNav">
            {pizzas?.length} Pizzas
        </h4>
        <Loader isLoading={isLoading || isDeleting} error={error}>
            <Table striped bordered responsive className="adminTables">
                <thead >
                    <tr>
                        <th>Name</th>
                        <th>Prices</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pizzas.map(pizza =>
                            <tr key={pizza._id}>
                                <td>{pizza.name}</td>
                                <td>
                                    <p>Small: {pizza.prices.small}</p>
                                    <p>Medium: {pizza.prices.medium}</p>
                                    <p>Large: {pizza.prices.large}</p>
                                </td>
                                <td>{pizza.category}</td>
                                <td>
                                    <p className="pizzaListActions">
                                        <span className="deletePizzaListIcon"
                                            onClick={() => handleDeletePizzaShow(pizza._id)}>
                                            <AiFillDelete />
                                        </span>
                                        <span className="updatePizzaListIcon"
                                            onClick={() => history.push(`/admin/editpizza/${pizza._id}`)}>
                                            <AiOutlineEdit />
                                        </span>
                                    </p>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </Loader>
        <Modal show={deletePizzaShow} onHide={handleDeletePizzaClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Pizza?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this pizza?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleDeletePizzaClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDeletePizzaOperation}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}
