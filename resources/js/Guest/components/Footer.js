import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
   <div>
<footer id="footer">
{/* <div className="footer-newsletter">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-lg-6">
        <h4>Join Our Newsletter</h4>
        <p>To get updates about new products</p>
        <form action="" method="post">
          <input type="email" name="email" />
          <input type="submit" value="Subscribe" />
        </form>
      </div>
    </div>
  </div>
</div> */}

<div className="footer-top">
  <div className="container">
    <div className="row">

      <div className="col-lg-4 col-md-6 footer-contact">
        <h3>SoftExpo</h3>
        <p>
          <strong>Phone:</strong> +1 5589 55488 55<br/>
          <strong>Email:</strong> info@softexpo.com<br/>
        </p>
      </div>

      <div className="col-lg-4 col-md-6 footer-links">
        <h4>Useful Links</h4>
        <ul>
          <li><i className="bx bx-chevron-right"></i> <a href="/">Home</a></li>
          {/* <li><i className="bx bx-chevron-right"></i> <a href="#">Explore</a></li> */}
          <li><i className="bx bx-chevron-right"></i> <a href="/home/vendorlogin">For Vendors</a></li>
          <li>
          <i className="bx bx-chevron-right"></i> <Link to="/home/guestlogin">For Users</Link>
          </li>
        </ul>
      </div>


      <div className="col-lg-4 col-md-6 footer-links">
        <h4>Our Social Networks</h4>

        <div className="social-links mt-3">
          <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
          <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
          <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
          <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a>
        </div>
      </div>

    </div>
  </div>
</div>

<div className="container py-4">
  <div className="copyright">
    &copy; Copyright <strong><span> SoftExpo </span></strong>. All Rights Reserved
  </div>
  <div className="credits">
    Designed by <a href="#">Prashant Sapkota</a>
  </div>
</div>
</footer>
<a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
        </div>
    )
}
