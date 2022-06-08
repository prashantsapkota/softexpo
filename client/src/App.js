import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch} from 'react-router-dom';
import './App.css';
import Chat from './Chat';
import Login from './Login';
import {AuthRoutes, GuestRoutes} from './utils/route';
import Home from './Home';
import { registerServiceWorker } from "./serviceWorker";
import NewGroup from './NewGroup';
import Sidebar from './Sidebar';
function App() {

  // const route = location.href

  useEffect(()=>{
      async function registerSW(){
        await registerServiceWorker().then(()=>{
          console.log("service worker registered")
        })
      }
      registerSW();
     
  },[])

  useEffect(() => {
    var v = document.body;
    v.className = "application_home";
  }, [])
    

  return (
       <Router>
         <Switch>  
          <GuestRoutes path="/login" component={Login} ></GuestRoutes>
          <div className="app">  
          <div className="app_body">
          <Sidebar />
          <AuthRoutes path="/thread/:roomId/:isgroup?" component={Chat} ></AuthRoutes>
          <AuthRoutes path="/createNewRoom" component={NewGroup} ></AuthRoutes>
          <AuthRoutes path="/" component={Home} exact></AuthRoutes>
          </div>
        </div>
          </Switch>
        </Router>
     
  );
}

export default App;
