import React, { useEffect, useState } from 'react';
import { venodrAxios } from '../../axios';



function Dashboard(){
    const [LeadsCount, setLeadsCount] = useState('')
    const [SoftwareCount, setSoftwareCount] = useState('')

    useEffect(() => {
        venodrAxios.get('/leads').then(res=>setLeadsCount(res.data.length))
        venodrAxios.get('/all-softwares').then(res=>setSoftwareCount(res.data.length))
    }, [])

    return (
      <div>
        <div className="row page-title-header">
          <div className="col-12">
            <div className="page-header">
              <h4 className="page-title">Dashboard</h4>
              <div className="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
                <ul className="quick-links">
                  <li><a href="!#" onClick={evt =>evt.preventDefault()}>ICE Market data</a></li>
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
                <h2 className="card-title mb-0">Leads Statistics Overview</h2>
                    <div className="wrapper">
                      <h5 className="mb-0">Total Leads</h5>
                      <div className="d-xl-flex align-items-center">
                        <h2 className="font-weight-semibold mb-0">{LeadsCount}</h2>
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
                        <h2 className="font-weight-semibold mb-0">{SoftwareCount}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          {/* <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body d-flex flex-column">
                <div className="wrapper">
                  <h4 className="card-title mb-0">Net Profit Margin</h4>
                  <p>Started collecting data from February 2019</p>
                  <div className="mb-4 rounded-legend" id="net-profit-legend">
                  <ul>
                    <li>
                      <span className="bg-success"></span>Sales
                    </li>
                    <li>
                      <span className="bg-info"></span>Orders
                    </li>
                  </ul>
                  </div>
                </div>
                <Radar data={this.state.netProfitChartData} options={this.state.netProfitOptions} height={280}/>
              </div>
            </div>
          </div> */}

        {/*
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="col-xl-6 col-lg-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body pb-0">
                    <div className="d-flex justify-content-between">
                      <h4 className="card-title mb-0">Total Revenue</h4>
                      <p className="font-weight-semibold mb-0">+1.37%</p>
                    </div>
                    <h3 className="font-weight-medium mb-4">184.42K</h3>
                  </div>
                  <Line data={this.totalRevenueData} options={this.totalRevenueOptions} height={75}/>
                </div>
              </div>
              <div className="col-xl-6 col-lg-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body pb-0">
                    <div className="d-flex justify-content-between">
                      <h4 className="card-title mb-0">Transaction</h4>
                      <p className="font-weight-semibold mb-0">-2.87%</p>
                    </div>
                    <h3 className="font-weight-medium">147.7K</h3>
                  </div>
                  <Line data={this.state.totaltransactionChartData} options={this.state.totaltransactionChartOptions} height={75} id="totaltransactionChart"/>
                </div>
              </div>
              <div className="col-md-12 grid-margin">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title mb-0">Market Overview</h4>
                    <div className="d-flex align-items-center justify-content-between w-100">
                      <p className="mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                      <div className="dropdown">
                        <Dropdown>
                          <Dropdown.Toggle variant="btn btn-outline-secondary dropdown-toggle" id="dropdownMenuButton4">
                          Daily
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item  onClick={this.changeMarketingOneData} >Daily</Dropdown.Item>
                            <Dropdown.Item  onClick={this.changeMarketingTwoData}>Weekly</Dropdown.Item>
                            <Dropdown.Item onClick={this.changeMarketingThreeData}>Monthly</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                    <div className="d-flex align-items-end">
                      <h3 className="mb-0 font-weight-semibold">$36,2531.00</h3>
                      <p className="mb-0 font-weight-medium mr-2 ml-2 mb-1">USD</p>
                      <p className="mb-0 text-success font-weight-semibold mb-1">(+1.37%)</p>
                    </div>
                    <Bar data={this.marketingOverviewData} options={this.marketingOverviewOptions} datasetKeyProvider={this.datasetKeyProvider} height={100} id="marketingOverviewChart1"/>
                  </div>
                </div>
              </div>
              <div className="col-md-12 grid-margin">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h4 className="card-title mb-0">Invoice</h4>
                      <a href="!#" onClick={evt =>evt.preventDefault()}><small>Show All</small></a>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est quod cupiditate esse fuga</p>
                    <div className="table-responsive">
                      <table className="table table-striped table-hover">
                        <thead>
                          <tr>
                            <th>Invoice ID</th>
                            <th>Customer</th>
                            <th>Status</th>
                            <th>Due Date</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>INV-87239</td>
                            <td>Viola Ford</td>
                            <td>Paid</td>
                            <td>20 Jan 2019</td>
                            <td>$755</td>
                          </tr>
                          <tr>
                            <td>INV-87239</td>
                            <td>Dylan Waters</td>
                            <td>Unpaid</td>
                            <td>23 Feb 2019</td>
                            <td>$800</td>
                          </tr>
                          <tr>
                            <td>INV-87239</td>
                            <td>Louis Poole</td>
                            <td>Unpaid</td>
                            <td>25 Mar 2019</td>
                            <td>$463</td>
                          </tr>
                          <tr>
                            <td>INV-87239</td>
                            <td>Vera Howell</td>
                            <td>Paid</td>
                            <td>27 Mar 2019</td>
                            <td>$235</td>
                          </tr>
                          <tr>
                            <td>INV-87239</td>
                            <td>Allie Goodman</td>
                            <td>Unpaid</td>
                            <td>1 Apr 2019</td>
                            <td>$657</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="d-flex align-items-center pb-2">
                          <div className="dot-indicator bg-danger mr-2"></div>
                          <p className="mb-0">Total Sales</p>
                        </div>
                        <h4 className="font-weight-semibold">$7,590</h4>
                        <ProgressBar variant="danger" now={80}/>
                      </div>
                      <div className="col-md-6 mt-4 mt-md-0">
                        <div className="d-flex align-items-center pb-2">
                          <div className="dot-indicator bg-success mr-2"></div>
                          <p className="mb-0">Active Users</p>
                        </div>
                        <h4 className="font-weight-semibold">$5,460</h4>
                        <ProgressBar variant="success" now={50}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 grid-margin stretch-card average-price-card">
                <div className="card text-white">
                  <div className="card-body">
                    <div className="d-flex justify-content-between pb-2 align-items-center">
                      <h2 className="font-weight-semibold mb-0">4,624</h2>
                      <div className="icon-holder">
                        <i className="mdi mdi-briefcase-outline"></i>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <h5 className="font-weight-semibold mb-0">Average Price</h5>
                      <p className="text-white mb-0">Since last month</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-12 grid-margin">
                <div className="card">
                  <div className="card-body">
                    <h1 className="card-title mb-4">Website Audience Metrics</h1>
                    <div className="row">
                      <div className="col-xl-5 col-lg-12">
                        <div className="wrapper border-bottom mb-2 pb-2">
                          <h4 className="font-weight-semibold mb-0">523,200</h4>
                          <div className="d-flex align-items-center">
                            <p className="mb-0">Page Views</p>
                            <div className="dot-indicator bg-secondary ml-auto"></div>
                          </div>
                        </div>
                        <div className="wrapper mb-2 mb-lg-0">
                          <h4 className="font-weight-semibold mb-0">753,098</h4>
                          <div className="d-flex align-items-center">
                            <p className="mb-0">Bounce Rate</p>
                            <div className="dot-indicator bg-primary ml-auto"></div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-7 col-lg-12 d-flex pl-4">
                        <div className="ml-auto">
                          <Bar data={this.realTimeStatisticsData} options={this.realTimeStatisticsOptions} height={100}  id="realtime-statistics"/>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-5">
                      <div className="col-xl-5 col-lg-12">
                        <div className="d-flex align-items-center mb-2">
                          <div className="icon-holder bg-primary text-white py-1 px-3 rounded mr-2">
                            <i className="mdi mdi-buffer icon-sm"></i>
                          </div>
                          <h2 className="font-weight-semibold mb-0">3,605</h2>
                        </div>
                        <p>Since last week</p>
                        <p className="mb-3 mb-lg-0"><span className="font-weight-medium">0.51%</span> (30 days)</p>
                      </div>
                      <div className="col-xl-7 col-lg-12">
                        <div className="mt-n3 ml-auto" id="dashboard-guage-chart"></div>
                        <GaugeChart id="gauge-chart1" textColor="#010101" percent={0.65} arcPadding={0} cornerRadius={0} nrOfLevels={2} colors={["#FF0017", "#eceaea"]} arcsLength={[0.4, 0.25]}  />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 grid-margin">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title mb-4">World sellings</h4>
                    <div className="map-height">
                      <VectorMap
                      map={"world_mill"}
                      height={100}
                      backgroundColor="transparent" //change it to ocean blue: #0077be
                      zoomOnScroll={false}
                      containerClassName="map"
                      regionStyle={{
                        initial: {
                          fill: "#3198f7",
                          "fill-opacity": 1,
                          stroke: "none",
                          "stroke-width": 0,
                          "stroke-opacity": 0
                        },
                        hover: {
                          "fill-opacity": 0.8,
                          cursor: "pointer"
                        },
                        selected: {
                          fill: "#3198f7" //color for the clicked country
                        },
                        selectedHover: {}
                      }}
                      regionsSelectable={true}
                      containerStyle={{
                        width: '100%',
                        height: '100%'
                      }}
                      series={{
                        regions: [
                          {
                            values: mapData, //this is your data
                            scale: ["#3198f7", "#3198f7"], //your color game's here
                            normalizeFunction: "polynomial"
                          }
                        ]
                      }}
                    />
                    </div>
                    <div className="wrapper">
                      <div className="d-flex w-100 pt-2 mt-4">
                        <p className="mb-0 font-weight-semibold">California</p>
                        <div className="wrapper ml-auto d-flex align-items-center">
                          <p className="font-weight-semibold mb-0">26,437</p>
                          <p className="ml-1 mb-0">26%</p>
                        </div>
                      </div>
                      <div className="d-flex w-100 pt-2">
                        <p className="mb-0 font-weight-semibold">Washington</p>
                        <div className="wrapper ml-auto d-flex align-items-center">
                          <p className="font-weight-semibold mb-0">3252</p>
                          <p className="ml-1 mb-0">64%</p>
                        </div>
                      </div>
                      <div className="d-flex w-100 pt-2">
                        <p className="mb-0 font-weight-semibold">Michigan</p>
                        <div className="wrapper ml-auto d-flex align-items-center">
                          <p className="font-weight-semibold mb-0">4,987</p>
                          <p className="ml-1 mb-0">30%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 grid-margin">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title mb-0">Top Performer</h4>
                    <div className="d-flex mt-3 py-2 border-bottom">
                      <img className="img-sm rounded-circle" src="/assets/images/faces/face3.jpg" alt="profile" />
                      <div className="wrapper ml-2">
                        <p className="mb-n1 font-weight-semibold">Ray Douglas</p>
                        <small>162543</small>
                      </div>
                      <small className="text-muted ml-auto">1 Hours ago</small>
                    </div>
                    <div className="d-flex py-2 border-bottom">
                      <span className="img-sm rounded-circle bg-warning text-white text-avatar">OH</span>
                      <div className="wrapper ml-2">
                        <p className="mb-n1 font-weight-semibold">Ora Hill</p>
                        <small>162543</small>
                      </div>
                      <small className="text-muted ml-auto">4 Hours ago</small>
                    </div>
                    <div className="d-flex py-2 border-bottom">
                      <img className="img-sm rounded-circle" src="/assets/images/faces/face4.jpg" alt="profile" />
                      <div className="wrapper ml-2">
                        <p className="mb-n1 font-weight-semibold">Brian Dean</p>
                        <small>162543</small>
                      </div>
                      <small className="text-muted ml-auto">4 Hours ago</small>
                    </div>
                    <div className="d-flex pt-2">
                      <span className="img-sm rounded-circle bg-success text-white text-avatar">OB</span>
                      <div className="wrapper ml-2">
                        <p className="mb-n1 font-weight-semibold">Olive Bridges</p>
                        <small>162543</small>
                      </div>
                      <small className="text-muted ml-auto">7 Hours ago</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">

           <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title mb-0">Recent Events</h4>
                <div className="d-flex py-2 border-bottom">
                  <div className="wrapper">
                    <small className="text-muted">Mar 14, 2019</small>
                    <p className="font-weight-semibold text-gray mb-0">Change in Directors</p>
                  </div>
                  <small className="text-muted ml-auto">Edit event</small>
                </div>
                <div className="d-flex py-2 border-bottom">
                  <div className="wrapper">
                    <small className="text-muted">Mar 14, 2019</small>
                    <p className="font-weight-semibold text-gray mb-0">Other Events</p>
                  </div>
                  <small className="text-muted ml-auto">Edit event</small>
                </div>
                <div className="d-flex py-2 border-bottom">
                  <div className="wrapper">
                    <small className="text-muted">Mar 14, 2019</small>
                    <p className="font-weight-semibold text-gray mb-0">Quarterly Report</p>
                  </div>
                  <small className="text-muted ml-auto">Edit event</small>
                </div>
                <div className="d-flex pt-2">
                  <div className="wrapper">
                    <small className="text-muted">Mar 14, 2019</small>
                    <p className="font-weight-semibold text-gray mb-0">Change in Directors</p>
                  </div>
                  <small className="text-muted ml-auto">Edit event</small>
                </div>
                <a className="d-block mt-5" href="!#" onClick={evt =>evt.preventDefault()}>Show all</a>
              </div>
            </div>
          </div>
           <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between pb-3">
                  <h4 className="card-title mb-0">Activities</h4>
                  <p className="mb-0 text-muted">20 finished, 5 remaining</p>
                </div>
                <ul className="timeline">
                  <li className="timeline-item">
                    <p className="timeline-content"><a href="!#" onClick={evt =>evt.preventDefault()}>Ben Tossell</a> assign you a task</p>
                    <p className="event-time">Just now</p>
                  </li>
                  <li className="timeline-item">
                    <p className="timeline-content"><a href="!#" onClick={evt =>evt.preventDefault()}>Ben Tossell</a> assign you a task</p>
                    <p className="event-time">Just now</p>
                  </li>
                  <li className="timeline-item">
                    <p className="timeline-content"><a href="!#" onClick={evt =>evt.preventDefault()}>Ben Tossell</a> assign you a task</p>
                    <p className="event-time">Just now</p>
                  </li>
                  <li className="timeline-item">
                    <p className="timeline-content"><a href="!#" onClick={evt =>evt.preventDefault()}>Ben Tossell</a> assign you a task</p>
                    <p className="event-time">Just now</p>
                  </li>
                  <li className="timeline-item">
                    <p className="timeline-content"><a href="!#" onClick={evt =>evt.preventDefault()}>Ben Tossell</a> assign you a task</p>
                    <p className="event-time">Just now</p>
                  </li>
                </ul>
                <a className="d-block mt-3" href="!#" onClick={evt =>evt.preventDefault()}>Show all</a>
              </div>
            </div>
          </div>
           <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title mb-0">People Also Watch</h4>
                <div className="table-responsive">
                  <table className="table table-stretched">
                    <thead>
                      <tr>
                        <th>Symbol</th>
                        <th>Last Price</th>
                        <th>Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <p className="mb-1 text-dark font-weight-medium">NFLX</p><small className="font-weight-medium">Netflix, Inc.</small>
                        </td>
                        <td className="font-weight-medium">$250.00</td>
                        <td className="text-success font-weight-medium">+12.64</td>
                      </tr>
                      <tr>
                        <td>
                          <p className="mb-1 text-dark font-weight-medium">TSLA</p><small className="font-weight-medium">Tesla, Inc.</small>
                        </td>
                        <td className="font-weight-medium">$458.00</td>
                        <td className="text-danger font-weight-medium">-14.53</td>
                      </tr>
                      <tr>
                        <td>
                          <p className="mb-1 text-dark font-weight-medium">GOOG</p><small className="font-weight-medium">Alphabet, Inc.</small>
                        </td>
                        <td className="font-weight-medium">$250.00</td>
                        <td  className="text-danger font-weight-medium">+12.64</td>
                      </tr>
                      <tr>
                        <td>
                          <p className="mb-1 text-dark font-weight-medium">AMZN</p><small className="font-weight-medium">Amazon.com, Inc.</small>
                        </td>
                        <td className="font-weight-medium">$546.00</td>
                        <td className="text-success font-weight-medium">+24.34</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <a className="d-block mt-3" href="!#" onClick={evt =>evt.preventDefault()}>Show all</a>
              </div>
            </div>
          </div>
        </div> */
    }
      </div>
    );
}
export default Dashboard;
