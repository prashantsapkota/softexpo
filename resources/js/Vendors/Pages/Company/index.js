import { isFunction } from 'lodash-es';
import React, { useEffect, useState } from 'react'
import { Link, useHistory, withRouter } from 'react-router-dom';
import { getCompanydetails } from '../../Helpers/HelperFunction';
import {Loading} from '../../../Guest/components/Loading'

function index() {
    const history = useHistory()
  const [CompanyDetails, setCompanyDetails] = useState([]);
  const [loading, setloading] = useState(true)
  useEffect(() => {
    getCompanydetails().then((response) => {
      console.log(response);
      setCompanyDetails(response);
      if(response){
        setloading(false)
    }

    })
  }, [])

  const toggleProBanner = () => {
    return document.querySelector('.proBanner').classList.toggle("hide");
  }

  if(!CompanyDetails){
      history.push('/vendor/add-company');
  }

  // console.log(CompanyDetails)
  return (
    <div>
        <div>
          <div className="row">
            <div className="col-12 grid-margin">
              <div className="card companyDetails">
                { loading? <Loading loading={loading} /> :
                <div className="card-body">
                    <div className="align-content-baseline align-items-sm-baseline d-flex justify-content-between w-100">
                  <h3 className="card-title flex-fill">Company Details</h3>
                  <Link className="btn btn-outline-success mx-lg-2 mx-sm-1" to={`/vendor/edit-company/`}>
                      <span className="mdi mdi-pencil-box"></span> Edit
                  </Link>
                  {/* <button className="btn btn-danger mx-lg-2 mx-sm-1">Delete</button> */}
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <img src={CompanyDetails.logo} width="120px" className="my-lg-2" />
                        <h4 className="text-bold mr-sm-1 mr-lg-1">
                          <span className="text-bold mr-1">{CompanyDetails.name}</span>
                          { (CompanyDetails.verified && CompanyDetails.verified.status) ?
                          <span className=" btn-outline-success">
                          <span className="mdi mdi-account-check"></span> Verified
                      </span> :
                            <span className="text-danger ">
                              <span className="mdi mdi-account-off"></span> unverfied
                            </span>
                            }
                        </h4>
                        <p className="text-bold mr-sm-1 mr-lg-1 d-flex">
                          <span className="mdi mdi-email"></span>
                          <span className="ml-1">{ CompanyDetails.email}</span>
                        </p>
                        <p className="text-bold mr-sm-1 mr-lg-1 d-flex">
                          <span className="mdi mdi-web"></span>
                          <span className="mx-1">{ CompanyDetails.website}</span>
                          <a href={CompanyDetails.website}>|</a>
                        </p>
                        <p className="text-bold mr-sm-1 mr-lg-1">
                            <span className="mdi mdi-map-marker"></span>
                            <span className="ml-1">{CompanyDetails.country}, {CompanyDetails.state}, {CompanyDetails.address} - {CompanyDetails.pincode}</span>
                        </p>
                    </div>
                    <div className="col-md-6">
                      <span className="d-flex align-items-baseline border-bottom my-1 py-1">
                        <h6 className="text-bold mr-sm-1 mr-lg-1"> Number of Employees: </h6>
                        <p>{CompanyDetails.number_of_employee}</p>
                      </span>
                      <span className="d-flex align-items-baseline border-bottom my-1 py-1">
                        <h6 className="text-bold mr-sm-1 mr-lg-1"> Number of Customers: </h6>
                        <p>{CompanyDetails.number_of_customers}</p>
                      </span>
                      <span className="d-flex align-items-baseline border-bottom my-1 py-1">
                        <h6 className="text-bold mr-sm-1 mr-lg-1"> GSTIN: </h6>
                        <p>{CompanyDetails.GST_IN}</p>
                      </span>
                      <span className="d-flex align-items-baseline border-bottom my-1 py-1">
                        <h6 className="text-bold mr-sm-1 mr-lg-1"> HSC: </h6>
                        <p>{CompanyDetails.HSC}</p>
                      </span>
                      <span className="d-flex align-items-baseline border-bottom my-1 py-1">
                        <h6 className="text-bold mr-sm-1 mr-lg-1"> RC: </h6>
                        <p>{CompanyDetails.RC}</p>
                      </span>
                      <span className="d-flex align-items-baseline">
                        <h6 className="text-bold mr-sm-1 mr-lg-1"> YOE: </h6>
                        <p>{
                           new Date(CompanyDetails.YOE).toDateString() }</p>
                      </span>
                    </div>
                  </div>
                </div> }
                </div>
              </div>
            </div>
          </div>
          </div>
  )
}

export default withRouter(index)
