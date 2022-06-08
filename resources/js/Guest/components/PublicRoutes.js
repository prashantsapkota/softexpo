import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PublicRoutes = ({component: Component, ...rest}) => {
    // console.log("here");
    return (
        
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
                <Component {...props} />
        )} />
    );
};

export default PublicRoutes;