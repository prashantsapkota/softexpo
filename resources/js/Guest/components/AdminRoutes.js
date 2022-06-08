import React from 'react';
import { Route } from 'react-router-dom';
import { isAdminLogin } from '../../Admin/Controllers/LoginController';
import { redirectApp } from '../../utils';

const AdminRoutes = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isAdminLogin() ?
                <Component {...props} />
            : redirectApp('/home/adminlogin')
        )} />
    );
};

export default AdminRoutes;
