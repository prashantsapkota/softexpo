import axios from 'axios';
import React from 'react'

function isVendorLogin(){
    //gvs- getvendorstatus
   var data = getCurrentData();
//    console.log(data)
   for (const key in data) {
       if (Object.hasOwnProperty.call(data, key)) {
           const element = data[key];
           if (element==null) {
            return false;
           }
           continue;
       }
   }

   if (!checkTokenExpiry()) {
       return false;
   }
   return true;

}

function getCurrentData(){
    var data = {
        token: localStorage.getItem('access_token'),
        role: localStorage.getItem('user_role'),
        expiry: localStorage.getItem('expires_at'),
        slot: localStorage.getItem('slot'),
        user: localStorage.getItem('user')
    }
    return data;
}

function checkTokenExpiry(){
    var date = localStorage.getItem('expires_at');
    Date.parse(date);
    return true;
}

async function logoutJS(){
    localStorage.removeItem('access_token')
    localStorage.removeItem('user_role');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('remember_me' );
    localStorage.removeItem('user');
    localStorage.removeItem('slot');
}


function isUserLogedIn(){
    var data = getCurrentData()
    if (data.role=="enduser") {
        return true;
    }
    return false;
}

function getUseriD(){
    var data = getCurrentData()
    if (data.role=="enduser") {
        const id = JSON.parse(data.user).id;
        return id;
    }
}

export { isVendorLogin,logoutJS, isUserLogedIn, getCurrentData, getUseriD }

