import React, { Component, useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import { getCurrentData, isUserLogedIn, logoutJS } from '../../Controllers/AuthController';

function Navbar(){
    const [Profile, setProfile] = useState({})
    const [Query, setQuery] = useState('');

    useEffect(() => {
        if(isUserLogedIn()){
            const data = getCurrentData()
            setProfile(JSON.parse(data.user))
        }
    }, [])

    const toggleOffcanvas = ()=> {
        document.querySelector('.sidebar-offcanvas').classList.toggle('active');
        // toggleRightSidebar();
      }

      const Signout = (e) =>{
          e.preventDefault()
            logoutJS().then(()=>location.reload())
      }

    const HandleSubmit = e =>{
        e.preventDefault()

    }
    return (
      <nav className="navbar col-lg-12 left-0 col-12 p-lg-0 fixed-top d-flex flex-row">
        <div className="navbar-menu-wrapper w-100 d-flex align-items-center justify-content-between">
        <a className="navbar-brand brand-logo-mini align-self-center d-lg-none" href="/" onClick={evt =>evt.preventDefault()}><img src="/assets/images/logo-mini.svg" alt="logo" /></a>
          <ul className="navbar-nav navbar-nav-left header-links align-self-center">
            <li className="nav-item font-weight-semibold d-none  d-md-flex">
               <a  href="/">
                   <img src="/images/logo-sample.jpg" width="75%" />
                </a>
            </li>
           </ul>
          <form className="ml-auto search-form d-none d-md-block" action="/home/search">
            <div className="form-group">
              <input type="search" name="query-text" className="form-control" placeholder="Search Here" onChange={e=>setQuery(e.target.value)}/>
              <input type="submit" className="d-none" />
            </div>
          </form>
          <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item  nav-profile border-0 pl-4">
          <a className="align-self-center nav-link" href="/vendor/dashboard">For Vendors</a>
            </li>
            { Profile.profile_pic ?
            <li className="nav-item  nav-profile border-0">
              <Dropdown>
                <Dropdown.Toggle className="nav-link count-indicator bg-transparent">
                  <img className="img-xs rounded-circle" src={Profile.profile_pic} alt="Profile" />
                </Dropdown.Toggle>
                <Dropdown.Menu className="preview-list navbar-dropdown pb-3">
                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0" onClick={evt =>Signout(evt)}>
                    <p>Sign Out</p>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li> : null }
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={()=>toggleOffcanvas}>
            <span className="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
    );
  }


export default Navbar;
