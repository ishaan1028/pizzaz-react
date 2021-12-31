import { NavLink, useHistory } from "react-router-dom";
import { Nav, Container, Navbar, NavDropdown } from "react-bootstrap";
import { GiFullPizza } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions/user.action";

function Header() {

    const { cartItems } = useSelector(state => state.cartReducer);
    const { isLoggedIn, user } = useSelector(state => state.loginUserReducer);

    const history = useHistory();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser(history));
    }

    return <header className="headerMain">
        <Navbar className="headerNavbar" collapseOnSelect expand="lg" variant="light">
            <Container>
                <NavLink className="headerNavbarLogo" to="/">
                    <span className="logoSVG"><GiFullPizza /> </span>
                    <span className="logoText">PIZZAZ</span>
                </NavLink>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <NavLink exact activeStyle={{ color: "yellow" }} className="navLinks"
                            to="/">
                            Home
                        </NavLink>
                        {
                            isLoggedIn ?
                                <NavDropdown title={user?.name} id="basic-nav-dropdown">

                                    <NavDropdown.Item href="#" onClick={() => history.push("/orders")}>
                                        Orders
                                    </NavDropdown.Item>
                                    {
                                        user.isAdmin && <NavDropdown.Item href="#" onClick={() => history.push("/admin")}>
                                            Admin-Panel
                                        </NavDropdown.Item>
                                    }
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#" onClick={handleLogout}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown> : <>
                                    <NavLink exact activeStyle={{ color: "yellow" }} className="navLinks"
                                        to="/login">
                                        Login
                                    </NavLink>
                                    <NavLink exact activeStyle={{ color: "yellow" }} className="navLinks"
                                        to="/register">
                                        register
                                    </NavLink>
                                </>
                        }
                        <NavLink activeStyle={{ color: "yellow" }} className="navLinks"
                            to="/cart">
                            Cart {cartItems?.length}
                        </NavLink>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>

}

export default Header;