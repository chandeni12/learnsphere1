import React from "react";

export default function About() {
  return (
    <>
      <div className="container-fluid py-5" style={{ backgroundColor: "#0a1128", color: "#cbd5e1" }}>
        <div className="container py-5">
          <div className="row g-5 align-items-center">
            <div
              className="col-lg-6 wow fadeInUp"
              data-wow-delay="0.1s"
              style={{ minHeight: "400px" }}
            >
              <div className="position-relative h-100">
                <img
                  className="img-fluid w-100 h-100"
                  src="/img/about.jpg"
                  alt="about jpg"
                  style={{ objectFit: "cover", borderRadius: "8px", border: "1px solid #1e293b" }}
                />
              </div>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="d-flex align-items-center mb-3">
                <h6 className="text-primary text-uppercase mb-0" style={{ letterSpacing: "2px", fontWeight: "700", fontSize: "14px" }}>
                  About Us
                </h6>
                <div style={{ width: "80px", height: "2px", backgroundColor: "#3b82f6", marginLeft: "15px" }}></div>
              </div>
              <h1 className="mb-4 text-white" style={{ fontWeight: "700" }}>Welcome to LearnSphere</h1>
              <p className="mb-4" style={{ color: "#94a3b8", fontSize: "15px", lineHeight: "1.6" }}>
                Welcome to our LearnSphere platform, where education meets
                innovation. With our interactive courses, experienced
                instructors, and cutting-edge technology, learning has never
                been more engaging or accessible.
              </p>
              <p className="mb-4" style={{ color: "#94a3b8", fontSize: "15px", lineHeight: "1.6" }}>
                Join our community of lifelong learners and discover the endless
                opportunities for growth and development.
              </p>
              <div className="row gy-3 gx-4 mb-4">
                <div className="col-sm-6">
                  <p className="mb-0 text-white" style={{ fontSize: "15px" }}>
                    <span className="text-primary me-2 fw-bold" style={{ fontSize: "18px" }}>→</span> Skilled Instructors
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0 text-white" style={{ fontSize: "15px" }}>
                    <span className="text-primary me-2 fw-bold" style={{ fontSize: "18px" }}>→</span> Online Classes
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0 text-white" style={{ fontSize: "15px" }}>
                    <span className="text-primary me-2 fw-bold" style={{ fontSize: "18px" }}>→</span> International Certificate
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0 text-white" style={{ fontSize: "15px" }}>
                    <span className="text-primary me-2 fw-bold" style={{ fontSize: "18px" }}>→</span> Skilled Instructors
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0 text-white" style={{ fontSize: "15px" }}>
                    <span className="text-primary me-2 fw-bold" style={{ fontSize: "18px" }}>→</span> Online Classes
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0 text-white" style={{ fontSize: "15px" }}>
                    <span className="text-primary me-2 fw-bold" style={{ fontSize: "18px" }}>→</span> International Certificate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
