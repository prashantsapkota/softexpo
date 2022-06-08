import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer,toast } from 'react-toastify';
import { RegisterUser } from '../Controllers/RegisterController';
import { validator, redirectApp } from '../utils';
export default function Login() {

    const [register, setRegister] = useState(true);
    const [Remail, setRemail] = useState('');
    const [Rname, setRname] = useState('');
    const [Rpassword, setRpassword] = useState('');
    const [LoginEmail, setLoginEmail] = useState('');
    const [LoginPassword, setLoginPassword] = useState('');
    const [loading, setloading] = useState(false);



    const formData = {
        "name": Rname,
        "email": Remail,
        "password": Rpassword,
    }

    const loginData = {
        "email":LoginEmail,
        "password":LoginPassword,
    }

    const showLoginform = (e) => {
        e.preventDefault();
        setRegister(!register);
    }

    const validation = async (data) => {
        const rules = {
            "name": "required",
            "email": "required",
            "password": "required",
        }
        return validator(data, rules);
    }

    const loginValidation = (data) =>{
        const rules = {
            "email": "required",
            "password": "required",
        }
        return validator(data, rules);
    }

    const sendLoginRequest = (e) => {
        e.preventDefault()
        setloading(true);
        if (loginValidation(loginData)) {
            axios.post('/api/vendor_login', loginData).then((response) => {
                console.log(response);
                if (response.status == 200) {
                    if (RegisterUser(response)) {
                        redirectApp('/vendor/dashboard');
                    }
                }

            })
                .catch((error) => {
                    console.log(error.response);
                    if (error.response.status == 422) {
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
                .finally((res) => {
                    console.log(res);
                    setloading(false);
                })
        }
    }





    const sendRegisterRequest = (e) => {
        e.preventDefault()
        setloading(true)
        if (validation(formData)) {
            axios.post('/api/vendor_register', formData).then((response) => {
                console.log(response);
                if (response.status == 200) {
                    if (RegisterUser(response)) {
                        redirectApp('/vendor/dashboard');
                    }
                }

            })
                .catch((error) => {
                    console.log(error.response);
                    if (error.response.status == 422) {
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
                    setloading(false)
                })
                .finally((res) => {
                    console.log(res);

                })
        }
    }
    return (
        <section id="auth" className="about">
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
                <div className="row justify-content-between">
                    <div className="col-lg-12 mt-5 pt-5 pt-lg-0">
                        <div className="row">
                            {register ? (
                                //register form
                                <div className="col-md-8 m-auto mt-lg-5" data-aos="fade-up" data-aos-delay="50">
                                    <i className="bx bx-receipt"></i>
                                    <h4>Register to add your product/Services</h4><br />
                                    <form role="form" className="php-email-form">
                                        <div className="row">
                                            <div className="form-group col-md-8">
                                                <label htmlFor="name">Your Name</label>
                                                <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" onChange={(e) => setRname(e.target.value)} required />
                                            </div>
                                            <div className="form-group col-md-8 mt-3 mt-md-0">
                                                <label htmFor="name">Your Email</label>
                                                <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" onChange={(e) => setRemail(e.target.value)} required />
                                            </div>

                                            <div className="form-group col-md-8 mt-3">
                                                <label htmlFor="name">Password</label>
                                                <input type="password" className="form-control" name="password" id="password" placeholder="********" onChange={(e) => setRpassword(e.target.value)} required />
                                            </div>
                                        </div>
                                        <div className="mt-3 col-md-8">
                                            <span className="d-inline">
                                                <button type="submit" className="btn btn-outline-danger" onClick={(e) => sendRegisterRequest(e)}>{loading ? "Authenticating..." : "Register"}</button>
                                                <button className="btn ml-3" onClick={(e) => showLoginform(e)}>Already have an account? Login</button>
                                            </span>
                                        </div>
                                    </form>
                                </div>) : (
                                    // login form
                                <div className="col-md-8 m-auto mt-lg-5" data-aos="fade-up" data-aos-delay="50">
                                    <i className="bx bx-receipt"></i>
                                    <h4>Login to add your product/Services</h4><br />
                                    <form role="form">
                                        <div className="row">
                                            <div className="form-group col-md-12">
                                                <label htmlFor="name">Your Email</label>
                                                <input type="email" name="email" className="form-control" id="name" placeholder="Email" required onChange={(e) => setLoginEmail(e.target.value)} />
                                            </div>
                                            <div className="form-group col-md-12 mt-3">
                                                <label for="name">Your Password</label>
                                                <input type="password" className="form-control" name="password" id="password" placeholder="************" required onChange={(e) => setLoginPassword(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <span className="d-inline">
                                                <button type="submit" className="btn btn-outline-danger" onClick={(e)=>sendLoginRequest(e)}>{loading ? "Authenticating..." : "Login"}</button>
                                                <button className="btn ml-3 btn-info" onClick={(e) => showLoginform(e)}>Don't have an account? Signup</button>
                                            </span>
                                        </div>
                                    </form>
                                </div>
                            )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
