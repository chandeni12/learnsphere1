import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div
        className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-4 col-md-6">
              <h4 className="text-white mb-3">Quick Link</h4>
              <Link className="btn btn-link" to="/about">
                About Us
              </Link>
              <a className="btn btn-link" href="mailto:chandeni134@gmail.com">
                Contact Us
              </a>
              <Link className="btn btn-link" to="/testimonial">
                Privacy Policy
              </Link>
              <Link className="btn btn-link" to="/contact">
                Terms &amp; Condition
              </Link>
            </div>
            <div className="col-lg-4 col-md-6">
              <h4 className="text-white mb-3">Contact</h4>
              <p className="mb-2">
                <i className="fa fa-map-marker-alt me-3" />
                Madikeri, Karnataka, India
              </p>
              <p className="mb-2">
                <i className="fa fa-phone-alt me-3" />
                <a href="tel:9030465611" className="text-light text-decoration-none">+91 90304 65611</a>
              </p>
              <p className="mb-2">
                <i className="fa fa-envelope me-3" />
                <a href="mailto:chandeni134@gmail.com" className="text-light text-decoration-none">chandeni134@gmail.com</a>
              </p>
              <div className="d-flex pt-2">
                <a
                  className="btn btn-outline-light btn-social"
                  href="https://github.com/chandeni12"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-github" />
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <h4 className="text-white mb-3">Gallery</h4>
              <div className="row g-2 pt-2">
                <div className="col-4">
                  <img
                    className="img-fluid bg-light p-1"
                    src="/img/course-1.jpg"
                    alt=""
                  />
                </div>
                <div className="col-4">
                  <img
                    className="img-fluid bg-light p-1"
                    src="/img/course-2.jpg"
                    alt=""
                  />
                </div>
                <div className="col-4">
                  <img
                    className="img-fluid bg-light p-1"
                    src="/img/course-3.jpg"
                    alt=""
                  />
                </div>
                <div className="col-4">
                  <img
                    className="img-fluid bg-light p-1"
                    src="/img/course-2.jpg"
                    alt=""
                  />
                </div>
                <div className="col-4">
                  <img
                    className="img-fluid bg-light p-1"
                    src="/img/course-3.jpg"
                    alt=""
                  />
                </div>
                <div className="col-4">
                  <img
                    className="img-fluid bg-light p-1"
                    src="/img/course-1.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                ©{" "}
                <a className="border-bottom" href>
                  LearnSphere
                </a>
                , All Right Reserved. Designed By{" "}
                <span className="text-white">Department of MCA Final Year</span>
                <br />
                <br />
              </div>
              <div className="col-md-6 text-center text-md-end">
                <div className="footer-menu">
                  <a href>Home</a>
                  <a href>Cookies</a>
                  <a href>Help</a>
                  <a href>FQAs</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
