import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { AdminAxios } from '../../../axios'
import {Loading} from '../../../Guest/components/Loading'

function Companies() {
    const [Companies, setCompanies] = useState([])
    const [loading, setloading] = useState(false)
    useEffect(() => {
        AdminAxios.get('/company/all').then((res) => {
            console.log(res)
            setCompanies(res.data)
        })
    }, [])


    const handleStatus = (event, id) =>{
        // event.preventDefault();
        setloading(true)
        console.log(event.target)
        AdminAxios.post('/vendor/status',{id: id}).then(res=>{
            if(res.status==200){
                setloading(false)
            }

        })
    }

    return (
        <div>
            <div className="row">
                <div className="col-9 grid-margin">
                    {Companies.map((v, k) => {
                        let status = (v.vendor.status==1) ? true : false;
                        return (
                            <div className="card companyDetails mb-4" key={k}>
                                <div className="card-header d-flex">
                                    <h4 className="flex-fill">{v.name}</h4>
                                    <span className="d-flex admin_company">
                                        {/* <Loading loading={loading} /> */}
                                        <Form>
                                            <Form.Check
                                                type="switch"
                                                id={"custom-switch"+k}
                                                label="Status"
                                                defaultChecked={status}
                                                onChange={e=>handleStatus(e,v.vendor.id)}
                                            />
                                        </Form>
                                    </span>

                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <img src={v.logo} width="120px" className="my-lg-2" style={{ maxHeight: "100px" }} />

                                        </div>
                                        <div className="col-md-6">
                                            <p className="text-bold mr-sm-1 mr-lg-1 d-flex">
                                                <span className="mdi mdi-email"></span>
                                                <span className="ml-1">{v.email}</span>
                                            </p>
                                            <p className="text-bold mr-sm-1 mr-lg-1 d-flex">
                                                <span className="mdi mdi-web"></span>
                                                <span className="mx-1">{v.website}</span>
                                                <a href={v.website}>|</a>
                                            </p>

                                            <span className="d-flex align-items-baseline my-1 py-1">
                                                <h6 className="text-bold mr-sm-1 mr-lg-1"> RC: </h6>
                                                <p>{v.RC}</p>
                                            </span>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default Companies
