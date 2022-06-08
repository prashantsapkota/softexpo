import React from 'react'
import { Link, withRouter } from 'react-router-dom'

function About() {
    return (

    <section id="about" className="about">
      <div className="container">

        <div className="row justify-content-between">
          <div className="col-lg-5 d-flex align-items-center justify-content-center about-img">
            <img src="/images/second.png" className="img-fluid" alt="" data-aos="zoom-in" />
          </div>
          <div className="col-lg-6 pt-5 pt-lg-0">
            <h3 data-aos="fade-up">
            Growth is never by mere chance; it is the result of forces working together.
            </h3>

            <div className="row mt-5">
              <div className="col-md-6" data-aos="fade-up" data-aos-delay="100">
                <i className="bx bx-receipt"></i>
                <h4>Want to be a Vendor?</h4>
               <a href="/vendor/dashboard" className="btn py-3 btn-danger mt-3">BE A VENDOR</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    )
}

export default withRouter(About)
