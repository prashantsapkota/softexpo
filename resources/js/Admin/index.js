import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
const Home = lazy(()=> import('./Pages/Home'));
import { BrowserRouter } from 'react-router-dom';


function AdminApp() {
    return (
        <BrowserRouter>
         <Suspense fallback={<div>loading..</div>}>
           <Home />
        </Suspense>
      </BrowserRouter>
    );
}

export default AdminApp;


if (document.getElementById('adminApp')) {
    ReactDOM.render(<AdminApp />, document.getElementById('adminApp'));
}
