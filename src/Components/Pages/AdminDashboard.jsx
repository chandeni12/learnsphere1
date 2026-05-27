import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AdminDashboard() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [notification, setNotification] = useState("");

  // Seed default data for ankitha if it doesn't exist yet, so there is something to display
  const seedDefaultData = () => {
    const ankithaKey = 'courses_state_ankitha@gmail.com';
    if (!localStorage.getItem(ankithaKey)) {
      const defaultCourses = [
        {
          id: "/courses/mern/react",
          title: "AI",
          progress: 100,
          icon: "fa-brain",
          color: "#60a5fa",
          status: "completed",
          videoRoute: "/courses/mern/react",
          watchedVideos: ["mock_video_1"],
          totalVideos: 1
        },
        {
          id: "/courses/fullstack",
          title: "WEB DEVELOPMENT",
          progress: 100,
          icon: "fa-laptop-code",
          color: "#a78bfa",
          status: "completed",
          videoRoute: "/courses/fullstack",
          watchedVideos: ["mock_video_2"],
          totalVideos: 1
        },
        {
          id: "/courses/fullstack/sql",
          title: "SQL",
          progress: 0,
          icon: "fa-database",
          color: "#f59e0b",
          status: "awaiting",
          videoRoute: "/courses/fullstack/sql",
          watchedVideos: [],
          totalVideos: 1
        }
      ];
      localStorage.setItem(ankithaKey, JSON.stringify(defaultCourses));
    }
  };

  const loadPendingRequests = () => {
    seedDefaultData();
    const pending = [];
    
    // Scan localStorage for any course with "awaiting" status
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("courses_state_")) {
        const email = key.replace("courses_state_", "");
        try {
          const courses = JSON.parse(localStorage.getItem(key)) || [];
          courses.forEach(course => {
            if (course.status === "awaiting") {
              pending.push({
                email: email,
                studentName: email.split('@')[0],
                course: course.title,
                courseId: course.id,
                storageKey: key
              });
            }
          });
        } catch (e) {
          console.error("Error parsing course state", e);
        }
      }
    }
    setPendingRequests(pending);
  };

  useEffect(() => {
    loadPendingRequests();

    const handleStorage = () => {
      loadPendingRequests();
    };

    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const handleApprove = (storageKey, courseId, studentName, courseTitle) => {
    try {
      const courses = JSON.parse(localStorage.getItem(storageKey)) || [];
      const updatedCourses = courses.map(c => {
        if (c.id === courseId) {
          return { ...c, status: "active", progress: 0 };
        }
        return c;
      });
      localStorage.setItem(storageKey, JSON.stringify(updatedCourses));
      
      // Notify other components of the update
      window.dispatchEvent(new Event('storage'));
      loadPendingRequests();

      setNotification(`Approved ${studentName}'s enrollment request for ${courseTitle}!`);
      setTimeout(() => setNotification(""), 4000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleReject = (storageKey, courseId, studentName, courseTitle) => {
    try {
      const courses = JSON.parse(localStorage.getItem(storageKey)) || [];
      const updatedCourses = courses.filter(c => c.id !== courseId);
      localStorage.setItem(storageKey, JSON.stringify(updatedCourses));
      
      window.dispatchEvent(new Event('storage'));
      loadPendingRequests();

      setNotification(`Rejected ${studentName}'s enrollment request for ${courseTitle}.`);
      setTimeout(() => setNotification(""), 4000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <>
      <Navbar />

      <div className="py-5" style={{ backgroundColor: "#0b0f19", color: "#f8fafc", minHeight: "90vh" }}>
        <div className="container">
          {/* Welcome greeting banner */}
          <div className="mb-4">
            <h4 style={{ fontWeight: "300", color: "#cbd5e1" }}>
              Welcome, <span style={{ fontWeight: "700", color: "#fff" }}>admin</span> (admin)
            </h4>
          </div>

          {/* Stats Cards Row */}
          <div className="row g-4 mb-5">
            <div className="col-lg-3 col-sm-6">
              <div className="p-4 text-center" style={{ backgroundColor: "#111827", borderRadius: "15px", border: "1px solid #1f2937" }}>
                <p style={{ color: "#9ca3af", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.5px" }} className="mb-2">Total Users</p>
                <h2 className="text-primary mb-0" style={{ fontWeight: "800" }}>11</h2>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="p-4 text-center" style={{ backgroundColor: "#111827", borderRadius: "15px", border: "1px solid #1f2937" }}>
                <p style={{ color: "#9ca3af", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.5px" }} className="mb-2">Total Courses</p>
                <h2 className="text-primary mb-0" style={{ fontWeight: "800", color: "#8b5cf6" }}>35</h2>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="p-4 text-center" style={{ backgroundColor: "#111827", borderRadius: "15px", border: "1px solid #1f2937" }}>
                <p style={{ color: "#9ca3af", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.5px" }} className="mb-2">Students</p>
                <h2 className="text-primary mb-0" style={{ fontWeight: "800", color: "#ec4899" }}>4</h2>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="p-4 text-center" style={{ backgroundColor: "#111827", borderRadius: "15px", border: "1px solid #1f2937" }}>
                <p style={{ color: "#9ca3af", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.5px" }} className="mb-2">Instructors</p>
                <h2 className="text-primary mb-0" style={{ fontWeight: "800", color: "#f59e0b" }}>3</h2>
              </div>
            </div>
          </div>

          {/* Interactive alert notification */}
          {notification && (
            <div className="alert alert-success border-0 text-white mb-4" style={{ backgroundColor: "#10b981", borderRadius: "10px" }} role="alert">
              <i className="fa fa-check-circle me-2"></i> {notification}
            </div>
          )}

          {/* Pending Enrollment Requests Table */}
          <div className="mb-5">
            <h5 className="mb-4 text-white" style={{ fontWeight: "600" }}>Pending Enrollment Requests</h5>
            <div className="p-4" style={{ backgroundColor: "#111827", borderRadius: "15px", border: "1px solid #1f2937" }}>
              <div className="table-responsive">
                <table className="table table-borderless align-middle mb-0" style={{ color: "#cbd5e1" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #1f2937", color: "#fff" }}>
                      <th className="pb-3" style={{ fontWeight: "600" }}>Student</th>
                      <th className="pb-3" style={{ fontWeight: "600" }}>Course</th>
                      <th className="pb-3 text-center" style={{ fontWeight: "600" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingRequests.length > 0 ? (
                      pendingRequests.map((req, idx) => (
                        <tr key={idx}>
                          <td className="py-3">
                            <span className="d-block text-white" style={{ fontWeight: "500" }}>{req.studentName}</span>
                            <span className="text-muted" style={{ fontSize: "12px" }}>{req.email}</span>
                          </td>
                          <td className="py-3 text-white" style={{ fontWeight: "500" }}>{req.course}</td>
                          <td className="py-3 text-center">
                            <div className="d-flex justify-content-center gap-2">
                              <button 
                                className="btn btn-success d-flex align-items-center justify-content-center" 
                                style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#10b981", borderColor: "#10b981" }}
                                onClick={() => handleApprove(req.storageKey, req.courseId, req.studentName, req.course)}
                              >
                                <i className="fa fa-check"></i>
                              </button>
                              <button 
                                className="btn btn-danger d-flex align-items-center justify-content-center" 
                                style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#ef4444", borderColor: "#ef4444" }}
                                onClick={() => handleReject(req.storageKey, req.courseId, req.studentName, req.course)}
                              >
                                <i className="fa fa-times"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center py-4 text-muted">No pending enrollment requests.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Student Progress Report Table */}
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="text-white mb-0" style={{ fontWeight: "600" }}>Student Progress Report</h5>
              <button 
                className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2" 
                style={{ borderRadius: "8px", backgroundColor: "#6366f1", borderColor: "#6366f1", fontWeight: "600" }}
                onClick={handleDownloadPDF}
              >
                <i className="fa fa-download"></i> Download PDF
              </button>
            </div>
            
            <div className="p-4" style={{ backgroundColor: "#111827", borderRadius: "15px", border: "1px solid #1f2937" }}>
              <div className="table-responsive">
                <table className="table table-borderless align-middle mb-0" style={{ color: "#cbd5e1" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #1f2937", color: "#fff" }}>
                      <th className="pb-3" style={{ fontWeight: "600" }}>Student Name</th>
                      <th className="pb-3 text-center" style={{ fontWeight: "600" }}>Enrolled Courses</th>
                      <th className="pb-3 text-center" style={{ fontWeight: "600" }}>Certificates</th>
                      <th className="pb-3" style={{ fontWeight: "600" }}>Avg Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Row 1 */}
                    <tr style={{ borderBottom: "1px solid #1f2937" }}>
                      <td className="py-3">
                        <span className="d-block text-white" style={{ fontWeight: "500" }}>Anwitha</span>
                        <span className="text-muted" style={{ fontSize: "12px" }}>anw@gmail.com</span>
                      </td>
                      <td className="py-3 text-center text-white" style={{ fontWeight: "500" }}>4</td>
                      <td className="py-3 text-center">
                        <span className="badge px-2 py-1 text-white" style={{ backgroundColor: "#0698a3", borderRadius: "5px" }}>4</span>
                      </td>
                      <td className="py-3 w-25">
                        <div className="d-flex align-items-center gap-3">
                          <span className="text-white" style={{ fontSize: "13px", fontWeight: "500" }}>100%</span>
                          <div className="progress flex-grow-1" style={{ height: "6px", backgroundColor: "#1f2937" }}>
                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: "100%" }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    
                    {/* Row 2 */}
                    <tr style={{ borderBottom: "1px solid #1f2937" }}>
                      <td className="py-3">
                        <span className="d-block text-white" style={{ fontWeight: "500" }}>Ash</span>
                        <span className="text-muted" style={{ fontSize: "12px" }}>ash@gmail.com</span>
                      </td>
                      <td className="py-3 text-center text-white" style={{ fontWeight: "500" }}>1</td>
                      <td className="py-3 text-center">
                        <span className="badge px-2 py-1 text-white" style={{ backgroundColor: "#374151", borderRadius: "5px" }}>0</span>
                      </td>
                      <td className="py-3 w-25">
                        <div className="d-flex align-items-center gap-3">
                          <span className="text-white" style={{ fontSize: "13px", fontWeight: "500" }}>0%</span>
                          <div className="progress flex-grow-1" style={{ height: "6px", backgroundColor: "#1f2937" }}>
                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: "0%" }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 3 */}
                    <tr style={{ borderBottom: "1px solid #1f2937" }}>
                      <td className="py-3">
                        <span className="d-block text-white" style={{ fontWeight: "500" }}>ankitha</span>
                        <span className="text-muted" style={{ fontSize: "12px" }}>ankitha@gmail.com</span>
                      </td>
                      <td className="py-3 text-center text-white" style={{ fontWeight: "500" }}>2</td>
                      <td className="py-3 text-center">
                        <span className="badge px-2 py-1 text-white" style={{ backgroundColor: "#0698a3", borderRadius: "5px" }}>2</span>
                      </td>
                      <td className="py-3 w-25">
                        <div className="d-flex align-items-center gap-3">
                          <span className="text-white" style={{ fontSize: "13px", fontWeight: "500" }}>100%</span>
                          <div className="progress flex-grow-1" style={{ height: "6px", backgroundColor: "#1f2937" }}>
                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: "100%" }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 4 */}
                    <tr>
                      <td className="py-3">
                        <span className="d-block text-white" style={{ fontWeight: "500" }}>Ash</span>
                        <span className="text-muted" style={{ fontSize: "12px" }}>ash@gmail.com</span>
                      </td>
                      <td className="py-3 text-center text-white" style={{ fontWeight: "500" }}>3</td>
                      <td className="py-3 text-center">
                        <span className="badge px-2 py-1 text-white" style={{ backgroundColor: "#0698a3", borderRadius: "5px" }}>3</span>
                      </td>
                      <td className="py-3 w-25">
                        <div className="d-flex align-items-center gap-3">
                          <span className="text-white" style={{ fontSize: "13px", fontWeight: "500" }}>100%</span>
                          <div className="progress flex-grow-1" style={{ height: "6px", backgroundColor: "#1f2937" }}>
                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: "100%" }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
