import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
const Home = lazy(()=> import('./Pages/Home'));
import { BrowserRouter } from 'react-router-dom';


function VendorApp() {
    return (
        <BrowserRouter>
         <Suspense fallback={<div><img src="/images/logo-sample.jpg" alt="loading..."/></div>}>
           <Home />
        </Suspense>
      </BrowserRouter>
    );
}

export default VendorApp;

if (document.getElementById('vendorApp')) {
    ReactDOM.render(<VendorApp />, document.getElementById('vendorApp'));
}
