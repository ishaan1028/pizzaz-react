import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { GiFullPizza } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/user.action";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Register() {

    const dispatch = useDispatch();
    const history = useHistory();

    const { error, isLoading } = useSelector(state => state.registerUserReducer);
    const { isLoggedIn } = useSelector(state => state.loginUserReducer);

    const initialValues = {
        name: "",
        email: "",
        password: ""
    }

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Required')
            .min(3, "minimum 3 characters")
            .max(100, "maximum 100 characters"),
        email: Yup.string()
            .email('Invalid email format')
            .required('Required'),
        password: Yup.string()
            .required('Required')
            .min(6, "minimum 6 characters")
            .max(250, "maximum 250 characters")
    });

    const onSubmit = ({ name, email, password }) => {

        dispatch(registerUser(name, email, password, history, formik));


    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    return (
        isLoggedIn ? <Redirect to="/" /> :
            <Container>
                <div className="register">
                    <div className="loginBody">
                        <div className="loginBodyTop">
                            <div className="loginLogo">
                                <span className="logoSVGRed"><GiFullPizza /> </span>
                                <span className="actionText uiBold">Register</span>
                            </div>
                            {
                                error ? <div className="alertCenterDiv">
                                    <Alert variant="danger ">
                                        {error}
                                    </Alert>
                                </div> : null
                            }
                            <Form onSubmit={formik.handleSubmit} >
                                <Form.Group className="mb-3" controlId="formBasicText">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="name" value={formik.values.name} placeholder="Enter name" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {
                                        formik.errors.name && formik.touched.name ?
                                            <Form.Text className="redErrors">
                                                {formik.errors.name}
                                            </Form.Text> : null
                                    }
                                </Form.Group>
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
                                    {isLoading ? <Spinner animation="border" size="sm" /> : "Register"}
                                </Button>
                            </Form>
                        </div>
                        <div className="loginBodyBottom">
                            <p>Have an account?
                                <Link to="/login">
                                    <Button className="pizzaButtonOutline" variant="outline-danger">Log in</Button>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
    )
}