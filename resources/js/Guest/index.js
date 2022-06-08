import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
const Footer = lazy(()=> import('./components/Footer'));
const Navigation = lazy(()=> import('./components/Navigation'));




function GuestIndex() {
    return (
       <BrowserRouter>
       <Suspense fallback={<div><img src="/images/logo-sample.jpg" alt="loading..."/></div>}>
       <Navigation />
        <AppRoutes />
        <Footer />
        </Suspense>
       </BrowserRouter>
    );
}

export default GuestIndex;

if (document.getElementById('mainApp')) {
    ReactDOM.render(<GuestIndex />, document.getElementById('mainApp'));
}
