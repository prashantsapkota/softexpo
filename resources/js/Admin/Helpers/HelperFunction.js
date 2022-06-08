import axios from '../../axios';
import React from 'react'
import {venodrAxios} from '../../axios';

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



export  {getCompanydetails,getCurrentVendorId}
