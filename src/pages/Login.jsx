import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { GiFullPizza } from "react-icons/gi";

import { Link, useHistory, Redirect } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/user.action";

export default function Login() {

    const dispatch = useDispatch();
    const history = useHistory();

    const { isLoggedIn, error, isLoading } = useSelector(state => state.loginUserReducer);

    const initialValues = {
        email: "admin@gmail.com",
        password: "admin123"
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email format')
            .required('Required'),
        password: Yup.string()
            .required('Required')
            .min(6, "minimum 6 characters")
            .max(100, "maximum 100 characters")
    });

    const onSubmit = ({ email, password }) => {

        dispatch(loginUser(email, password, history));

    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    return (
        isLoggedIn ? <Redirect to="/" /> :
            <Container >
                <div className="login">

                    <div className="loginBody">
                        <div className="loginBodyTop">
                            <div className="loginLogo">
                                <span className="logoSVGRed"><GiFullPizza /> </span>
                                <span className="actionText uiBold">Login</span>
                            </div>
                            {
                                error ? <div className="centeringDiv">
                                    <Alert className="w-100" variant="danger ">
                                        {error}
                                    </Alert>
                                </div> : null
                            }
                            <Form onSubmit={formik.handleSubmit} >
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name="email" placeholder="Enter email"
                                        onChange={formik.handleChange} value={formik.values.email}
                                        onBlur={formik.handleBlur}
                                    />
                                    {
                                        formik.errors.email && formik.touched.email ?
                                            <Form.Text className="redErrors">
                                                {formik.errors.email}
                                            </Form.Text> : null
                                    }
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password"
                                        value={formik.values.password} placeholder="Min 6 characters" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {
                                        formik.errors.password && formik.touched.password ?
                                            <Form.Text className="redErrors">
                                                {formik.errors.password}
                                            </Form.Text> : null
                                    }
                                </Form.Group>
                                <Button type="submit" className="pizzaButton">
                                    {isLoading ? <Spinner animation="border" size="sm" /> : "Log in"}
                                </Button>
                            </Form>
                        </div>
                        <div className="loginBodyBottom">
                            <p>Dont have an account?
                                <Link to="/register">
                                    <Button className="pizzaButtonOutline" variant="outline-danger">Register</Button>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
    )
}
