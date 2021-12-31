import React, { useEffect, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteUserAction, editRoleAction, getAllUsers } from '../actions/user.action';
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import Loader from '../components/Loader';


export default function UsersList() {

    const dispatch = useDispatch();
    const { users, isLoading, error } = useSelector(state => state.getAllUsersReducer);
    const { isUpdating } = useSelector(state => state.editRoleReducer);
    const { isDeleting } = useSelector(state => state.deleteUserReducer);
    const { user: currentUser } = useSelector(state => state.loginUserReducer);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);


    const [deleteUserShow, setDeleteUserShow] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState();

    const handleDeleteUserShow = (id) => {
        setDeleteUserId(id);
        setDeleteUserShow(true);
    }

    const handleDeleteUserClose = () => setDeleteUserShow(false);

    const handleDeleteUserOperation = () => {
        dispatch(deleteUserAction(deleteUserId, users));
        handleDeleteUserClose();
    }

    const handleEditRole = (id) => {
        dispatch(editRoleAction(id, users));
    }

    return <div className="adminSubContainer">
        <h4 className="titleAdminNav">
            Users
        </h4>
        <Loader isLoading={isLoading || isUpdating || isDeleting} error={error}>

            <Table striped bordered responsive className="adminTables">
                <thead >
                    <tr>
                        <th>User Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map(user =>
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span className="userListActions">
                                        {user.isAdmin ? "Admin " : "User "}
                                        {
                                            user._id === currentUser._id ? null :
                                                <span className="pizzaListActions">
                                                    <span className="updatePizzaListIcon"
                                                        onClick={() => handleEditRole(user._id)}>
                                                        <AiOutlineEdit />
                                                    </span>
                                                </span>
                                        }

                                    </span>

                                </td>
                                <td>
                                    <p className="pizzaListActions">
                                        {user._id === currentUser._id ? "N/A" :
                                            <span className="deletePizzaListIcon"
                                                onClick={() => handleDeleteUserShow(user._id)}>
                                                <AiFillDelete />
                                            </span>
                                        }
                                    </p>
                                </td>
                            </tr>)
                    }

                </tbody>
            </Table>
        </Loader>
        <Modal show={deleteUserShow} onHide={handleDeleteUserClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete User?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this user permanently?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleDeleteUserClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDeleteUserOperation}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}
