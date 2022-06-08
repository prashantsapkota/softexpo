import React from 'react'
import { venodrAxios } from '../../axios';

async function getCompanydetails() {

    const data = await venodrAxios.get("check_vendor_company").then((response) => {
        return response.data }).catch((err)=>{
            alert(err.message);
        })
    return data;
}
function getCurrentVendorId(){

    const token =  localStorage.getItem('access_token');
    return token;
}

function get_current_auth_id(){
    const user = JSON.parse(localStorage.getItem('user'))
    return user.id;
}

function getVendorProfile (){
    const role = localStorage.getItem('user_role');
    const user = JSON.parse(localStorage.getItem('user'))
    return {role, user}
}




export  {getCompanydetails,getCurrentVendorId, getVendorProfile, get_current_auth_id}
