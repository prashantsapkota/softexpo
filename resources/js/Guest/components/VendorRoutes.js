import React from 'react';
import { Route } from 'react-router-dom';
import { isVendorLogin } from '../../Controllers/AuthController';
import { redirectApp } from '../../utils';

const VendorRoutes = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isVendorLogin() ?
                <Component {...props} />
            : redirectApp('/home/vendorlogin')
        )} />
    );
};

export default VendorRoutes;
