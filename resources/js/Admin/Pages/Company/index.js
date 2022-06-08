import { isFunction } from 'lodash-es';
import React, { useEffect, useState } from 'react'
import { Link, useHistory, withRouter } from 'react-router-dom';
import { getCompanydetails } from '../../Helpers/HelperFunction';
import CompanyDetails from './CompanyDetails';

function index() {
    const history = useHistory()
  const [companyDetails, setCompanyDetails] = useState([]);
  useEffect(() => {
    getCompanydetails().then((response) => {
      console.log(response);
      setCompanyDetails(response);
    })
  }, [])

  const toggleProBanner = () => {
    return document.querySelector('.proBanner').classList.toggle("hide");
  }

  if(!CompanyDetails){
      history.push('/vendor/addCompany');
  }

  // console.log(CompanyDetails)
  return (
    <div>
        <div>
          <div className="row">
            <div className="col-12 grid-margin">
              <div className="card">
                  <CompanyDetails companyDetails={companyDetails} />
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default withRouter(index)
