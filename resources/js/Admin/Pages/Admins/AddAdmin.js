import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input';
import venodrAxios, { AdminAxios } from '../../../axios';
import { useHistory } from 'react-router';
import { getCompanydetails } from '../../Helpers/HelperFunction';
import { toast } from 'react-toastify';

function AddAdmin() {


    const history = useHistory()
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const handleSubmit = (e) =>{
        e.preventDefault();
        let data = {
            name:name,
            email:email,
            password:password,
            status:1,
            role:0,
        }

        AdminAxios.post('/create-admin',data).then(res=>{
            if(res.status==201){
                toast.success('🦄' + "Admin created", {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setname('')
                setemail('')
                setpassword('')
            }
        }).catch((error) => {
            if (error.response && error.response.status == 422) {
                const errors = error.response.data.errors;
                for (const key in errors) {
                    if (Object.hasOwnProperty.call(errors, key)) {
                        const element = errors[key][0];
                        console.log(element);
                        toast.error('🦄' + element, {
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

    return (
        <div className="row">
              <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Add Admin</h4>
                <form className="form-sample" onSubmit={(e)=>handleSubmit(e)}>
                  {/* <p className="card-description"> Personal info </p> */}
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Name</label>
                        <div className="col-sm-9">
                        <Form.Control  type="text" onChange={(e)=>setname(e.target.value)} value={name} />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Email</label>
                        <div className="col-sm-9">
                        <Form.Control type="email" onChange={(e)=>setemail(e.target.value)} value={email} />
                        </div>
                      </Form.Group>
                    </div>
                  </div>



                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Password</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" onChange={(e)=>setpassword(e.target.value)} value={password}/>
                        </div>
                      </Form.Group>
                    </div>
                    {/* <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Number of Customers</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" onChange={(e)=>setNOC(e.target.value)} value={NOC}/>
                        </div>
                      </Form.Group>
                    </div> */}
                  </div>
                    <button type="submit" className="btn btn-primary mr-2">Submit</button>
                  <button type="reset" className="btn btn-light">Reset</button>
                </form>
              </div>
            </div>
          </div>
        </div>
    )
}

export default AddAdmin
