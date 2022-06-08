import React, { useEffect, useState } from 'react'
import { AdminAxios } from '../../axios'

function Dashboard() {
    const [CatCount, setCatCount] = useState('')
    const [SoftCount, setSoftCount] = useState('')
    const [LeadsCount, setLeadsCount] = useState('')
    useEffect(() => {
        AdminAxios.get('/all-leads').then(res=>setLeadsCount(res.data.length))
        AdminAxios.get('/all-softwares').then(res=>setSoftCount(res.data.length))
        AdminAxios.get('/all-categories').then(res=>setCatCount(res.data.length))
    }, [])
    return (
        <div>
            <div className="row page-title-header">
          <div className="col-12">
            <div className="page-header">
              <h4 className="page-title">Dashboard</h4>
              <div className="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
                <ul className="quick-links">
                  <li><a href="!#" onClick={evt =>evt.preventDefault()}>Market data</a></li>
                  <li><a href="!#" onClick={evt =>evt.preventDefault()}>Own analysis</a></li>
                </ul>
                <ul className="quick-links ml-auto">
                  <li><a href="!#" onClick={evt =>evt.preventDefault()}>Settings</a></li>
                  <li><a href="!#" onClick={evt =>evt.preventDefault()}>Analytics</a></li>
                  <li><a href="!#" onClick={evt =>evt.preventDefault()}>Watchlist</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
         <div className="row">
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title mb-0">Categories Statistics Overview</h2>
                    <div className="wrapper">
                      <h5 className="mb-0">Total Categories</h5>
                      <div className="d-xl-flex align-items-center">
                        <h2 className="font-weight-semibold mb-0">{CatCount}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title mb-0">Softwares</h2>
                    <div className="wrapper">
                      <h5 className="mb-0">Total Products</h5>
                      <div className="d-xl-flex align-items-center">
                        <h2 className="font-weight-semibold mb-0">{SoftCount}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title mb-0">Leads</h2>
                    <div className="wrapper">
                      <h5 className="mb-0">Total Leads Generated</h5>
                      <div className="d-xl-flex align-items-center">
                        <h2 className="font-weight-semibold mb-0">{LeadsCount}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
        </div>
    )
}

export default Dashboard
