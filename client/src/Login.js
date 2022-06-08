import React from 'react'
import './Login.css';
import { Button } from '@material-ui/core'
import Logo from './Logo.png';
import { auth, provider } from './firebase.js';
import axios from './axios';
import {  saveLoginInfo } from './utils/users';
import { useHistory } from "react-router-dom";



function Login() {

    const history = useHistory();
    const signin = (e) =>{
        e.preventDefault();
        auth.signInWithPopup(provider)
            .then(result => {
                let userDataInit = {
                    uid:result.user.uid,
                    displayName:result.user.displayName,
                    photoUrl:result.user.photoURL,
                    email:result.user.email,
                    phone:result.user.phoneNumber,
                    idToken:result.user.getIdToken(),
                    isNewUser:result.additionalUserInfo.isNewUser,
                }

                axios.post('/findUser',{ uid: result.user.uid }).then((result)=>{
                   if(result.data.status){
                    //    console.log(result.data);
                       saveLoginInfo(result.data);
                        return history.push(`/`);
                   }
                   else{
                    //    console.log(result.data);
                    axios.post('/createUser', userDataInit).then(res=>{
                        if(res.data){
                            saveLoginInfo(res.data);
                            return history.push(`/`);
                        }
                    }) 
                   }
                   

                })
                
                
            }).finally(()=>{
              
            })
            .catch(err=>alert(err))
           
    }

    return (
        <div className="login">
            <div className="login__body">
                <img 
                src={Logo}
                alt="GChat" />
                <div className="login__text">
                <h1>Signin to GChat</h1>
                </div>
                <Button onClick={e=>signin(e)}>Login with Google</Button>
            </div>
        </div>
    )
}

export default Login
