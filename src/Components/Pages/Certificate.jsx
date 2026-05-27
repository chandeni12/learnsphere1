import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function Certificate() {
  const query = new URLSearchParams(useLocation().search);
  const studentName = query.get("name") || "ankitha";
  const courseName = query.get("course") || "AI";
  const dateStr = query.get("date") || "May 9, 2026";

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* CSS style overrides to ensure the print hides the action buttons and backgrounds fit */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background-color: #fff !important;
            color: #000 !important;
          }
          .certificate-container {
            border: 15px double #1e3a8a !important;
            padding: 40px !important;
            box-shadow: none !important;
          }
        }
      `}} />

      <div className="py-5 d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: "#f1f5f9", minHeight: "100vh" }}>
        
        {/* Navigation / Action bar */}
        <div className="no-print mb-4 d-flex gap-3">
          <Link to="/profile" className="btn btn-outline-dark px-4" style={{ borderRadius: "30px", fontWeight: "600" }}>
            <i className="fa fa-arrow-left me-2"></i>Back to Dashboard
          </Link>
          <button onClick={handlePrint} className="btn btn-primary px-4" style={{ borderRadius: "30px", fontWeight: "600", backgroundColor: "#8b5cf6", borderColor: "#8b5cf6" }}>
            <i className="fa fa-print me-2"></i>Print / Save as PDF
          </button>
        </div>

        {/* Certificate Card */}
        <div className="certificate-container p-5 text-center bg-white shadow-lg position-relative" style={{
          width: "90%",
          maxWidth: "850px",
          border: "15px double #1e3a8a",
          borderRadius: "4px",
          color: "#1e293b",
          boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
          paddingTop: "60px !important",
          paddingBottom: "60px !important"
        }}>
          {/* Certificate Header Decoration */}
          <div className="mb-4">
            <i className="fa fa-award text-warning" style={{ fontSize: "56px" }}></i>
          </div>

          <h1 className="mb-4" style={{ 
            fontFamily: "'Georgia', serif", 
            fontWeight: "bold", 
            color: "#1e3a8a", 
            letterSpacing: "1px",
            fontSize: "36px"
          }}>
            CERTIFICATE OF COMPLETION
          </h1>
          
          <p className="mb-4" style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontStyle: "italic", 
            fontSize: "18px",
            color: "#64748b" 
          }}>
            This certifies that
          </p>

          <h2 className="mb-4 text-primary" style={{ 
            fontFamily: "'Georgia', serif", 
            fontWeight: "bold", 
            fontSize: "32px",
            borderBottom: "2px solid rgba(59, 130, 246, 0.2)",
            display: "inline-block",
            paddingBottom: "8px",
            paddingLeft: "30px",
            paddingRight: "30px",
            minWidth: "250px"
          }}>
            {studentName}
          </h2>

          <p className="mb-4 mt-2" style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontStyle: "italic", 
            fontSize: "18px",
            color: "#64748b" 
          }}>
            has successfully completed the course
          </p>

          <h3 className="mb-5 text-uppercase" style={{ 
            fontWeight: "800", 
            fontSize: "26px",
            letterSpacing: "2px",
            color: "#0f172a"
          }}>
            {courseName}
          </h3>

          {/* Date & Signature Columns */}
          <div className="row mt-5 pt-4 justify-content-between px-4">
            <div className="col-4 text-center">
              <div className="pb-2 border-bottom border-dark" style={{ fontWeight: "600", fontSize: "15px" }}>
                {dateStr}
              </div>
              <div className="text-muted mt-2" style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>Date</div>
            </div>
            
            <div className="col-4 text-center">
              <div className="pb-2 border-bottom border-dark" style={{ 
                fontFamily: "'Brush Script MT', cursive, sans-serif", 
                fontSize: "20px", 
                fontWeight: "bold",
                color: "#1e3a8a"
              }}>
                LearnSphere Academy
              </div>
              <div className="text-muted mt-2" style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>Authorized Sign</div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
