import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({ path, component: Component }) {

    const { isLoggedIn } = useSelector(state => state.loginUserReducer);

    return <Route
        path={path}
        render={() => {
            return isLoggedIn ? <Component /> : <Redirect to="/login" />
        }}
    />
}
