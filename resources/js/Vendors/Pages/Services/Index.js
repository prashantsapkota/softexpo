import { Select } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Form, FormControl } from 'react-bootstrap';

function Services() {
    const [Industries, setIndustries] = useState([])
    const [HourlyRates, setHourlyRates] = useState([])
    const [ServiceTypes, setServiceTypes] = useState([])
    const [AERs, setAERs] = useState([])
    const [ServiceCategories, setServiceCategories] = useState([])
    const [CompanyTypes, setCompanyType] = useState([])

    const handleSubmit = e =>{
        e.preventDefault();
    }

    useEffect(() => {
        axios.get('/api/industry').then(res=>{
            console.log(res.data)
            setIndustries(res.data)
        })

        axios.get('/api/hourly_rate').then(res=>{
            console.log(res.data)
            setHourlyRates(res.data)
        })

        axios.get('/api/service_type').then(res=>{
            console.log(res.data)
            setServiceTypes(res.data)
        })

        axios.get('/api/annual_estiamted_revenue').then(res=>{
            console.log(res.data)
            setAERs(res.data)
        })

        axios.get('/api/service_category').then(res=>{
            console.log(res.data)
            setServiceCategories(res.data)
        })


        axios.get('/api/companytype').then(res=>{
            console.log(res.data)
            setCompanyType(res.data)
        })

    }, [])
    return (
        <div className="row">
        <div className="col-12 grid-margin">
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">Company Overview</h3>
                    <form className="form-sample" onSubmit={(e) => handleSubmit(e)}>
                        {/* <p className="card-description"> Personal info </p> */}
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="row">
                                    <label className="col-sm-3 col-form-label">Industry Type</label>
                                    <div className="col-sm-9">
                                    <select className="form-control" onChange={(e) => setNOC(e.target.value)} >
                                                  { Industries.map((ind,key)=>{
                                                      return <option key={key}>{ind.name}</option>
                                                  }) }
                                            </select>
                                    </div>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="row">
                                    <label className="col-sm-3 col-form-label">Hourly Rates</label>
                                    <div className="col-sm-9">
                                    <select className="form-control" onChange={(e) => setNOC(e.target.value)} >
                                                  { HourlyRates.map((ind,key)=>{
                                                      return <option key={key}>{ind.rate}</option>
                                                  }) }
                                            </select>
                                    </div>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="row">
                                    <label className="col-sm-3 col-form-label">Company Type</label>
                                    <div className="col-sm-9">
                                    <select className="form-control" onChange={(e) => setNOC(e.target.value)} >
                                                  { CompanyTypes.map((ind,key)=>{
                                                      return <option key={key}>{ind.name}</option>
                                                  }) }
                                            </select>
                                    </div>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="row">
                                    <label className="col-sm-3 col-form-label">annual_estiamted_revenue</label>
                                    <div className="col-sm-9">
                                    <select className="form-control" onChange={(e) => setNOC(e.target.value)} >
                                                  { AERs.map((ind,key)=>{
                                                      return <option key={key}>{ind.name}</option>
                                                  }) }
                                            </select>
                                    </div>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="row">
                                    <label className="col-sm-3 col-form-label">Service Category</label>
                                    <div className="col-sm-9">
                                    <select className="form-control" >
                                    { ServiceCategories.map((ind,key)=>{
                                                      return <option key={key}>{ind.name}</option>
                                                  }) }

                                        </select>
                                    </div>
                                </Form.Group>
                                </div>
                                <div className="col-md-6">
                                <Form.Group className="row">
                                    <label className="col-sm-3 col-form-label">Full Address</label>
                                    <div className="col-sm-9">
                                        <Form.Control type="text"  />
                                    </div>
                                </Form.Group>
                            </div>

                        </div>
                        {/* <p className="card-description"> Address </p> */}
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row">
                            <label className="col-sm-3 col-form-label">Branch Office</label>
                            <div className="col-sm-9">
                            <FormControl className="w-100">

    {/* <Select
      id="demo-mutiple-chip"
      multiple
      value={}
      onChange={}
      input={<Input id="select-multiple-chip" />}
      renderValue={(selected) => (
        <div className={classes.chips}>
          {selected.map((value) => (
            <Chip key={value} label={value} className={classes.chip} />
          ))}
        </div>
      )}
      MenuProps={MenuProps}
    >
      {Cities.map((name) => (
        <MenuItem key={name.name} value={name.name} style={getStyles(name, personName, theme)}>
          {name.name}
        </MenuItem>
      ))}
    </Select> */}
  </FormControl>
  </div>
                            </div>
                            </div>
                            <div className="col-md-6">
                                <Form.Group className="row">
                                    <label className="col-sm-3 col-form-label">Pin Code</label>
                                    <div className="col-sm-9">
                                        <Form.Control type="text" />
                                    </div>
                                </Form.Group>
                            </div>
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

export default Services
