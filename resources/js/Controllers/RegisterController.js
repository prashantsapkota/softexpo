import axios from 'axios';
import { now, rest } from 'lodash';
import React, { useState } from 'react'



function RegisterUser({data}) {
    if (data!=null) {
        const access_token = data.token;
        const user_role = data.role;
        const expires_at = now()+1500;
        const remember_me = false;
        const user = JSON.stringify(data.user);
        axios.get('/oauth/authorize',{'access-token':access_token}).then((res)=>{
            console.log(res);
        })

    //storing in localstorage
    const status = localStorage.getItem('slot');
    if (status) {
        localStorage.clear()
    }
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('user_role',user_role);
    localStorage.setItem('expires_at',expires_at);
    localStorage.setItem('remember_me',remember_me );
    localStorage.setItem('user', user);
    localStorage.setItem('slot',true);

    return true;
    }
    return false;

}

export { RegisterUser }


