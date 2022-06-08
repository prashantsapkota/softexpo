import axios from 'axios'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { redirectApp, validator } from '../utils'
import { LoginAdmin } from './Controllers/LoginController'


function AdminLogin() {
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [loading, setloading] = useState(false)
    const formData = {
        "email": Email,
        "password": Password,
    }

    const validation = async (data) => {
        const rules = {
            "email": "required",
            "password": "required",
        }
        return await validator(data, rules);
    }


    const handleSubmit = (event) =>{
        event.preventDefault();
        setloading(true)
        if(validation(formData)){
            axios.post('/api/admin_login',formData).then((response)=>{
                console.log(response)
                if (response.status == 200) {
                    if (LoginAdmin(response)) {
                        redirectApp('/appAdmin/dashboard');
                    }
                }
            })
            .catch((error) => {
                if (error.response && error.response.status == 422) {
                    setloading(false)
                    const errors = error.response.data.errors;
                    for (const key in errors) {
                        if (Object.hasOwnProperty.call(errors, key)) {
                            const element = errors[key][0];
                            console.log(element);
                            toast.error('🦄'+element, {
                                position: "top-left",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                });
                        }
                    }
                }
            })
        }
    }
    return (
        <div>
        <section className="Form my-4 mx-5">
        <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
     <div className="container">
         <div className="row no-gutters">
             <div className="col-lg-7 px-5 pt-5 m-auto">
                 <h1 className="font-weight-bold py-3">Admin Portal</h1>
                 <h4>Sign into your account</h4>
                 <form>
                     <div className="form-row">
                         <div className="col-lg-7">

                             <input type="email" placeholder="Email-Address" onChange={(e)=>setEmail(e.target.value)} className="form-control my-3 p-4" />
                         </div>
                     </div>
                     <div className="form-row">
                        <div className="col-lg-7">

                            <input type="password" placeholder="******"  onChange={(e)=>setPassword(e.target.value)} className="form-control my-3 p-4" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-lg-7">
                            <button type="button" onClick={(e)=> handleSubmit(e)} className="btn btn-outline-success btn-block mt-3 mb-5">
                                {loading?"Authenticating....":"Login"}
                            </button>
                        </div>
                    </div>
                    <a href="#">Forgot password</a>
                 </form>
             </div>
         </div>
     </div>
 </section>
        </div>
    )
}

export default AdminLogin
