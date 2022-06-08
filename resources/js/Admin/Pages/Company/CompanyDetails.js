import React from 'react'

function CompanyDetails({companyDetails}) {
    return (
        <div className="row">
        <div className="col-md-6">
          <img src={companyDetails.logo} width="120px" className="my-lg-2" />
            <h4 className="text-bold mr-sm-1 mr-lg-1">
              <span className="text-bold mr-1">{companyDetails.name}</span>
              { (companyDetails.verified && companyDetails.verified.status) ?
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
              <span className="ml-1">{ companyDetails.email}</span>
            </p>
            <p className="text-bold mr-sm-1 mr-lg-1 d-flex">
              <span className="mdi mdi-web"></span>
              <span className="mx-1">{ companyDetails.website}</span>
              <a href={companyDetails.website}>|</a>
            </p>
            <p className="text-bold mr-sm-1 mr-lg-1">
                <span className="mdi mdi-map-marker"></span>
                <span className="ml-1">{companyDetails.country}, {companyDetails.state}, {companyDetails.address} - {companyDetails.pincode}</span>
            </p>
        </div>
        <div className="col-md-6">
          <span className="d-flex align-items-baseline border-bottom my-1 py-1">
            <h6 className="text-bold mr-sm-1 mr-lg-1"> Number of Employees: </h6>
            <p>{companyDetails.number_of_employee}</p>
          </span>
          <span className="d-flex align-items-baseline border-bottom my-1 py-1">
            <h6 className="text-bold mr-sm-1 mr-lg-1"> Number of Customers: </h6>
            <p>{companyDetails.number_of_customers}</p>
          </span>
          <span className="d-flex align-items-baseline border-bottom my-1 py-1">
            <h6 className="text-bold mr-sm-1 mr-lg-1"> GSTIN: </h6>
            <p>{companyDetails.GST_IN}</p>
          </span>
          <span className="d-flex align-items-baseline border-bottom my-1 py-1">
            <h6 className="text-bold mr-sm-1 mr-lg-1"> HSC: </h6>
            <p>{companyDetails.HSC}</p>
          </span>
          <span className="d-flex align-items-baseline border-bottom my-1 py-1">
            <h6 className="text-bold mr-sm-1 mr-lg-1"> RC: </h6>
            <p>{companyDetails.RC}</p>
          </span>
          <span className="d-flex align-items-baseline">
            <h6 className="text-bold mr-sm-1 mr-lg-1"> YOE: </h6>
            <p>{
               new Date(companyDetails.YOE).toDateString() }</p>
          </span>
        </div>
      </div>


    )
}

export default CompanyDetails
