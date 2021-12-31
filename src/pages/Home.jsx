import React, { useEffect } from 'react';
import Pizza from "../components/Pizza";
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPizzas } from '../actions/pizza.action';
import Loader from '../components/Loader';
import Features from '../components/Features';

export default function Home() {

    const dispatch = useDispatch();
    const { pizzas, isLoading, error } = useSelector(state => state.getAllPizzasReducer);

    useEffect(() => {

        dispatch(getAllPizzas());

    }, [dispatch]);

    return <Container>
        <div className="homePage">
            <div className="homeFeatures">
                <Features />
            </div>
            <Loader isLoading={isLoading} error={error}>
                <div className="pizzazList">
                    {
                        pizzas?.map(pizza => <Pizza key={pizza._id} pizza={pizza} />)
                    }
                </div>
            </Loader>
        </div>
    </Container>
}
