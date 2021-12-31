import React from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { NavLink, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import AddPizza from './AddPizza'
import EditPizza from './EditPizza'
import OrdersList from './OrdersList'
import PizzasList from './PizzasList'
import UsersList from './UsersList'

export default function Admin() {

    const { user } = useSelector(state => state.loginUserReducer);

    return !user.isAdmin ? <Redirect to="/" /> : <Container>
        <div className="adminWrapper">
            <h2 className="uiBold centerAlign titleH2">
                Admin Panel
            </h2>

            <ul className="adminNav">
                <NavLink activeStyle={{ color: "red" }} to="/admin/users">
                    <li className="adminNavItem">
                        Users
                    </li>
                </NavLink>
                <NavLink activeStyle={{ color: "red" }} to="/admin/pizzas">
                    <li className="adminNavItem">
                        Pizzas
                    </li>
                </NavLink>
                <NavLink activeStyle={{ color: "red" }} to="/admin/addpizza">
                    <li className="adminNavItem">
                        Add-Pizza
                    </li>
                </NavLink>
                <NavLink activeStyle={{ color: "red" }} to="/admin/orders">
                    <li className="adminNavItem">
                        Orders
                    </li>
                </NavLink>
            </ul>

            <Switch>
                <Route path="/admin" exact>
                    <UsersList />
                </Route>
                <Route path="/admin/users" exact>
                    <UsersList />
                </Route>
                <Route path="/admin/pizzas" exact>
                    <PizzasList />
                </Route>
                <Route path="/admin/addpizza" exact>
                    <AddPizza />
                </Route>
                <Route path="/admin/orders" exact>
                    <OrdersList />
                </Route>
                <Route path="/admin/editpizza/:id" exact>
                    <EditPizza />
                </Route>
            </Switch>
        </div>
    </Container>
}

