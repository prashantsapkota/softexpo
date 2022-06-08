import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { AdminAxios } from '../../../axios';
import CompanyDetails from './CompanyDetails';

function CompanyVerify() {
   const { company } = useParams();
   const history = useHistory()
    const [CurrentCompany, setCurrentCompany] = useState('')
    useEffect(() => {
        console.log(company)
        AdminAxios.get(`company/show/${company}`).then((res)=>{
            setCurrentCompany(res.data);
        })
    }, [])
    const handleApprove = (e) =>{
        e.preventDefault();
        AdminAxios.get(`/company/approve/${company}`).then((res)=>{
            if (res.status==200) {
                history.push('/appAdmin/company')
            }
        })

    }
    return (
        <div className="row">
        <div className="col-12 grid-margin">
      <div className="card companyDetails">
        <div className="card-body">
          <h4 className="card-title">Verify Company</h4>
          <CompanyDetails companyDetails={CurrentCompany} />
          </div>
          <div className="card-footer">
              <div className="d-flex">
                  <button className="btn btn-outline-success mx-1" onClick={(e)=>handleApprove(e)}>Approve</button>
                  <button className="btn btn-outline-danger mx-1">Reject</button>
              </div>
          </div>
          </div>
          </div>
          </div>

    )
}

export default CompanyVerify
