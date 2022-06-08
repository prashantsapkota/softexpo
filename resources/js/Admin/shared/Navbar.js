import { Button } from 'bootstrap';
import { escape, isEmpty } from 'lodash-es';
import React, { Component, useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import { AdminAxios } from '../../axios';
import { logoutJS } from '../../Controllers/AuthController';
import { redirectApp } from '../../utils';

function Navbar(){
  const toggleOffcanvas = ()=> {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }
  const toggleRightSidebar = () => {
    document.querySelector('.right-sidebar').classList.toggle('open');
  }

  const Signout = (evt)=>{
      evt.preventDefault()
      AdminAxios.post('/logout').then((response)=>{
          if(response.status==204){
                logoutJS().then(()=>{
                redirectApp('/home');
              })
          }
      })

  }
  const [Notifications, setNotifications] = useState([]);
  useEffect(() => {
      AdminAxios.get('/getUnreadNotifications').then((res)=>{
          setNotifications(res.data)
      })
     
  }, [])
  useEffect(() => {
    Notifications.map(notification=>{
        console.log(notification);
        if(notification){

            return MarkAllAsRead(notification.id)
        }
    })

  }, [Notifications])

  const MarkAllAsRead = ( id ) =>{

        return AdminAxios.get(`/notification/done/${id}`);

  }


    return (
      <nav className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-between">
        <a className="navbar-brand brand-logo-mini align-self-center d-lg-none" href="!#" onClick={evt =>evt.preventDefault()}><img src="/assets/images/logo-mini.svg" alt="logo" /></a>
          <button className="navbar-toggler navbar-toggler align-self-center" type="button" onClick={ () => document.body.classList.toggle('sidebar-icon-only') }>
            <i className="mdi mdi-menu"></i>
          </button>
          <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item  nav-profile border-0 pl-4">
              <Dropdown>
                <Dropdown.Toggle className="nav-link count-indicator p-0 toggle-arrow-hide bg-transparent">
                  <i className="mdi mdi-bell-outline"></i>
                  <span className="count bg-success">{Notifications.length}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="navbar-dropdown preview-list">
                  <Dropdown.Item className="dropdown-item py-3 d-flex align-items-center" href="!#" onClick={evt =>evt.preventDefault()}>
                    <p className="mb-0 font-weight-medium float-left"><Trans>You have</Trans> {Notifications.length} <Trans>new notifications</Trans> </p>
                        <Link to="/appAdmin/notifications">
                        <span className="badge badge-pill badge-primary float-right">View all</span>
                        </Link>
                  </Dropdown.Item>
                  {Notifications.map((notification,key)=>{
                      (notification.length>0) && MarkAllAsRead(notification.id)
                      return <div key={key}>
                      <div className="dropdown-divider"></div>
                    <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center" href="!#" onClick={evt =>evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <i className="mdi mdi-alert m-auto text-primary"></i>
                    </div>
                    <div className="preview-item-content py-2">
                      <h6 className="preview-subject font-weight-normal text-dark mb-1">{notification.notification}</h6>
                      <p className="font-weight-light small-text mb-0"> <Trans>Just now</Trans> </p>
                      <Link to={notification.callback} className="badge badge-danger my-1">{notification.type==0 && "Verify"}</Link>
                    </div>
                  </Dropdown.Item>
                      </div>
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </li>
            {/* <li className="nav-item  nav-profile border-0">
              <Dropdown>
                <Dropdown.Toggle className="nav-link count-indicator p-0 toggle-arrow-hide bg-transparent">
                  <i className="mdi mdi-email-outline"></i>
                  <span className="count">7</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="navbar-dropdown preview-list">
                  <Dropdown.Item className="dropdown-item  d-flex align-items-center" href="!#" onClick={evt =>evt.preventDefault()}>
                    <p className="mb-0 font-weight-medium float-left"><Trans>You have</Trans> 7 <Trans>unread mails</Trans> </p>
                    <span className="badge badge-pill badge-primary">View all</span>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center" href="!#" onClick={evt =>evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <img src="/assets/images/faces/face10.jpg" alt="profile" className="img-sm profile-pic" /> </div>
                    <div className="preview-item-content flex-grow py-2">
                      <p className="preview-subject ellipsis font-weight-medium text-dark"><Trans>Marian Garner</Trans> </p>
                      <p className="font-weight-light small-text"> <Trans>The meeting is cancelled</Trans> </p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center" href="!#" onClick={evt =>evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <img src="/assets/images/faces/face12.jpg" alt="profile" className="img-sm profile-pic" /> </div>
                    <div className="preview-item-content flex-grow py-2">
                      <p className="preview-subject ellipsis font-weight-medium text-dark"><Trans>David Grey</Trans> </p>
                      <p className="font-weight-light small-text"> <Trans>The meeting is cancelled</Trans></p>
                    </div>
                  </Dropdown.Item>
                  <div className="dropdown-divider"></div>
                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center" href="!#" onClick={evt =>evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <img src="/assets/images/faces/face1.jpg" alt="profile" className="img-sm profile-pic" /> </div>
                    <div className="preview-item-content flex-grow py-2">
                      <p className="preview-subject ellipsis font-weight-medium text-dark"><Trans>Travis Jenkins</Trans> </p>
                      <p className="font-weight-light small-text"> <Trans>The meeting is cancelled</Trans> </p>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li> */}


            <li className="nav-item  nav-profile border-0">
              <Dropdown>
                <Dropdown.Toggle className="nav-link count-indicator bg-transparent">
                  <img className="img-xs rounded-circle" src="/assets/images/faces/face8.jpg" alt="Profile" />
                </Dropdown.Toggle>
                <Dropdown.Menu className="preview-list navbar-dropdown pb-3">
                  <Dropdown.Item className="dropdown-item p-0 preview-item d-flex align-items-center border-bottom" href="!#" onClick={evt =>evt.preventDefault()}>
                    <div className="d-flex">
                      <div className="py-3 px-4 d-flex align-items-center justify-content-center">
                        <i className="mdi mdi-bookmark-plus-outline mr-0"></i>
                      </div>
                      <div className="py-3 px-4 d-flex align-items-center justify-content-center border-left border-right">
                        <i className="mdi mdi-account-outline mr-0"></i>
                      </div>
                      <div className="py-3 px-4 d-flex align-items-center justify-content-center">
                        <i className="mdi mdi-alarm-check mr-0"></i>
                      </div>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0 mt-2" onClick={evt =>evt.preventDefault()}>
                    <Trans>Manage Accounts</Trans>
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0" onClick={evt =>evt.preventDefault()}>
                    <Trans>Change Password</Trans>
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0" onClick={evt =>evt.preventDefault()}>
                    <Trans>Check Inbox</Trans>
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center border-0" onClick={evt =>Signout(evt)}>
                    <Trans>Sign Out</Trans>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={toggleOffcanvas}>
            <span className="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
    );
  }


export default withRouter(Navbar);
