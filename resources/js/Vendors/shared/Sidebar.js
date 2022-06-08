import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { getVendorProfile } from '../Helpers/HelperFunction';
// import {  } from 'react-i18next';

class Sidebar extends Component {
  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({[menuState] : false});
    } else if(Object.keys(this.state).length === 0) {
      this.setState({[menuState] : true});
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({[i]: false});
      });
      this.setState({[menuState] : true});
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({[i]: false});
    });


    const dropdownPaths = [
      {path:'/vendor/apps', state: 'appsMenuOpen'},
      {path:'/basic-ui', state: 'basicUiMenuOpen'},
      {path:'/vendor/software', state: 'softwaresOpen'},
      {path:'/form-elements', state: 'formElementsMenuOpen'},
      {path:'/tables', state: 'tablesMenuOpen'},
      {path:'/icons', state: 'iconsMenuOpen'},
      {path:'/charts', state: 'chartsMenuOpen'},
      {path:'/user-pages', state: 'userPagesMenuOpen'},
      {path:'/error-pages', state: 'errorPagesMenuOpen'},
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({[obj.state] : true})
      }
    }));

    const vendorProfile = getVendorProfile();
    this.setState({user:vendorProfile.user,role:vendorProfile.role})

  }
  render () {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="text-center sidebar-brand-wrapper d-flex align-items-center">
          <a className="sidebar-brand brand-logo" href="#">VENDOR DASHBOARD</a>
          <a className="sidebar-brand brand-logo-mini pt-3" href="#"><img src="/assets/images/logo-mini.svg" alt="logo" /></a>
        </div>
        <ul className="nav">
          {/*
           */}

          <li className={ this.isPathActive('/vendor/dashboard') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/vendor/dashboard">
              <i className="mdi mdi-television menu-icon"></i>
              <span className="menu-title"><>Dashboard</></span>
            </Link>
          </li>
          <li className={ this.isPathActive('/vendor/leads') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/vendor/leads">
              <i className="mdi mdi-television menu-icon"></i>
              <span className="menu-title"><>Leads</></span>
            </Link>
          </li>
          <li className={ this.isPathActive('/vendor/company') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/vendor/company/">
              <i className="mdi mdi-television menu-icon"></i>
              <span className="menu-title"><>Company Profile</></span>
            </Link>
          </li>
          <li className={ this.isPathActive('/vendor/software') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.softwaresOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('softwaresOpen') } data-toggle="collapse">
              <i className="mdi mdi-crosshairs-gps menu-icon"></i>
              <span className="menu-title"><>Softwares</></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.softwaresOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/vendor/add-software') ? 'nav-link active' : 'nav-link' } to="/vendor/add-software"><>Add New</></Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/vendor/software') ? 'nav-link active' : 'nav-link' } to="/vendor/software"><>Manage</></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/vendor/services') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/vendor/services/">
              <i className="mdi mdi-television menu-icon"></i>
              <span className="menu-title"><>Add Service</></span>
            </Link>
          </li>



        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    const vendorProfile = getVendorProfile();
    this.setState({user:vendorProfile.user,role:vendorProfile.role})
    // add className 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {

      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);
