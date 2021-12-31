import React from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPizza } from '../actions/pizza.action';

export default function AddPizza() {

    const dispatch = useDispatch();

    const { error, isLoading } = useSelector(state => state.addNewPizzaReducer);

    const initialValues = {
        name: "",
        smallPrize: "",
        mediumPrize: "",
        largePrize: "",
        description: "",
        image: "",
        category: ""
    }

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Required')
            .min(1, "minimum 1 characters")
            .max(200, "maximum 200 characters"),
        smallPrize: Yup.number()
            .required('Required'),
        mediumPrize: Yup.number()
            .required('Required'),
        largePrize: Yup.number()
            .required('Required'),
        description: Yup.string()
            .required('Required')
            .min(1, "minimum 1 characters")
            .max(4000, "maximum 4000 characters"),
        image: Yup.string()
            .required('Required'),
        category: Yup.string()
            .required('Required')

    });

    const onSubmit = ({ name, smallPrize, mediumPrize, largePrize, description, image, category }) => {

        const pizza = {
            name, smallPrize, mediumPrize, largePrize, description, image, category
        }

        dispatch(addNewPizza(pizza, formik));

    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    return <div className="adminSubContainer">
        <h4 className="titleAdminNav">
            Add new pizza
        </h4>
        <div className="adminFormBody">
            {
                error ? <div className="alertCenterDiv">
                    <Alert variant="danger ">
                        {error}
                    </Alert>
                </div> : null
            }
            <Form onSubmit={formik.handleSubmit} >
                <Form.Group className="mb-3">
                    <Form.Control type="text" name="name" value={formik.values.name} placeholder="Enter pizza name" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {
                        formik.errors.name && formik.touched.name ?
                            <Form.Text className="redErrors">
                                {formik.errors.name}
                            </Form.Text> : null
                    }
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Control type="text" name="smallPrize" placeholder="Enter small size pizza prize"
                        onChange={formik.handleChange} value={formik.values.smallPrize}
                        onBlur={formik.handleBlur}
                    />
                    {
                        formik.errors.smallPrize && formik.touched.smallPrize ?
                            <Form.Text className="redErrors">
                                {formik.errors.smallPrize}
                            </Form.Text> : null
                    }
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Control type="text" name="mediumPrize" placeholder="Enter medium size pizza prize"
                        onChange={formik.handleChange} value={formik.values.mediumPrize}
                        onBlur={formik.handleBlur}
                    />
                    {
                        formik.errors.mediumPrize && formik.touched.mediumPrize ?
                            <Form.Text className="redErrors">
                                {formik.errors.mediumPrize}
                            </Form.Text> : null
                    }
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Control type="text" name="largePrize" placeholder="Enter large size pizza prize"
                        onChange={formik.handleChange} value={formik.values.largePrize}
                        onBlur={formik.handleBlur}
                    />
                    {
                        formik.errors.largePrize && formik.touched.largePrize ?
                            <Form.Text className="redErrors">
                                {formik.errors.largePrize}
                            </Form.Text> : null
                    }
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Control type="text" name="description" placeholder="Enter pizza description"
                        onChange={formik.handleChange} value={formik.values.description}
                        onBlur={formik.handleBlur}
                    />
                    {
                        formik.errors.description && formik.touched.description ?
                            <Form.Text className="redErrors">
                                {formik.errors.description}
                            </Form.Text> : null
                    }
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Control type="text" name="image" placeholder="Enter pizza image url"
                        onChange={formik.handleChange} value={formik.values.image}
                        onBlur={formik.handleBlur}
                    />
                    {
                        formik.errors.image && formik.touched.image ?
                            <Form.Text className="redErrors">
                                {formik.errors.image}
                            </Form.Text> : null
                    }
                </Form.Group>
                <Form.Select name="category" onChange={formik.handleChange}
                    value={formik.values.category}
                    onBlur={formik.handleBlur} placeholder='se'>
                    <option disabled value="">Select pizza category</option>
                    <option value="veg">Veg</option>
                    <option value="nonveg">Non-veg</option>
                </Form.Select>
                <p>{
                    formik.errors.category && formik.touched.category ?
                        <Form.Text className="redErrors">
                            {formik.errors.category}
                        </Form.Text> : null
                }</p>

                <Button type="submit" className="pizzaButton">
                    {isLoading ? <Spinner animation="border" size="sm" /> : "Submit"}
                </Button>
            </Form>

        </div>
    </div>
}
