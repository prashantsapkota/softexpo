import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getSavedLoginInfo } from './users';

const AuthRoutes = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
           getSavedLoginInfo() ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

const GuestRoutes = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
           (!getSavedLoginInfo()) ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export  {AuthRoutes, GuestRoutes};