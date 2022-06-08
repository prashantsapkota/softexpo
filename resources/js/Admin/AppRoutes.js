import React, { Component,Suspense, lazy } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import AdminRoutes from '../Guest/components/AdminRoutes';
import Index from './Pages/Admins/Index';
import Menubar from './Pages/Appsetting/Menubar';
import Companies from './Pages/Company/Companies';
const Notifications = lazy(()=>import('./Pages/Notifications/Notifications'));
import Spinner from './shared/Spinner';
const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const CompanyVerify = lazy(()=>import('./Pages/Company/CompanyVerify'))
const Software = lazy(()=>import('./Pages/DataEntry/Software'))
const ServiceCategory = lazy(()=>import('./Pages/DataEntry/ServiceCategory'))
const ComapnyType = lazy(()=>import('./Pages/DataEntry/ServiceCompany'))
const Industry = lazy(()=>import('./Pages/DataEntry/ServiceIndustry'))
const Rate = lazy(()=>import('./Pages/DataEntry/ServiceRate'))
const AddAdmins = lazy(()=>import('./Pages/Admins/AddAdmin'))


class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <AdminRoutes exact path="/appAdmin/dashboard" component={ Dashboard } />
          <AdminRoutes exact path="/appAdmin/notifications" component={ Notifications } />
          <AdminRoutes exact path="/appAdmin/companies" component={ Companies } />
          <AdminRoutes path="/appAdmin/verify-companies/:company?" component={CompanyVerify} />
          <AdminRoutes path="/appAdmin/data-entry-software-categories" component={Software} />
          <AdminRoutes path="/appAdmin/data-entry-service-categories" component={ServiceCategory} />
          <AdminRoutes path="/appAdmin/data-entry-service-company-type" component={ComapnyType} />
          <AdminRoutes path="/appAdmin/data-entry-service-industry" component={Industry} />
          <AdminRoutes path="/appAdmin/data-entry-service-rate" component={Rate} />
          <AdminRoutes path="/appAdmin/app-setting-menubar" component={Menubar} />
          <AdminRoutes path="/appAdmin/admins" component={Index} />
          <AdminRoutes path="/appAdmin/create-admins" component={AddAdmins} />

          <Redirect to="/appAdmin/dashboard" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
