import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Profile() {
  const { user: auth0User, isAuthenticated: isAuth0Authenticated, logout } = useAuth0();
  
  // Read local user state or fallback to default Ankitha profile
  const localUserStr = localStorage.getItem('user');
  const localUser = localUserStr ? JSON.parse(localUserStr) : null;
  const user = auth0User || localUser || { name: "ankitha", role: "student", email: "ankitha@gmail.com" };

  const [courses, setCourses] = useState([]);
  const [totalEnrollments, setTotalEnrollments] = useState(3);
  const [completedCount, setCompletedCount] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);

  // Simulated daily study streak (Mon-Sun)
  const streakDays = [
    { day: "M", active: true },
    { day: "T", active: true },
    { day: "W", active: true },
    { day: "T", active: false },
    { day: "F", active: false },
    { day: "S", active: false },
    { day: "S", active: false }
  ];

  useEffect(() => {
    if (!user || !user.email) return;

    const email = user.email;
    const coursesKey = `courses_state_${email}`;
    let userCoursesStr = localStorage.getItem(coursesKey);

    // Initial pre-population of default courses if empty
    if (!userCoursesStr) {
      const defaultCourses = [
        {
          id: "/courses/mern/react",
          title: "AI",
          progress: 100,
          icon: "fa-brain",
          color: "#60a5fa",
          status: "completed",
          videoRoute: "/courses/mern/react",
          quizRoute: "/test/ai",
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
          quizRoute: "/test/fullstack",
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
          quizRoute: "/test/javascript",
          watchedVideos: [],
          totalVideos: 1
        }
      ];
      localStorage.setItem(coursesKey, JSON.stringify(defaultCourses));
      userCoursesStr = JSON.stringify(defaultCourses);
    }

    const loadCourses = () => {
      const currentCourses = JSON.parse(localStorage.getItem(coursesKey)) || [];
      setCourses(currentCourses);
      setTotalEnrollments(currentCourses.length);
      
      const completed = currentCourses.filter(c => c.status === "completed" || c.progress === 100).length;
      setCompletedCount(completed);

      // Calculate average progress
      if (currentCourses.length > 0) {
        const totalProgress = currentCourses.reduce((sum, c) => sum + (c.progress || 0), 0);
        setOverallProgress(Math.round(totalProgress / currentCourses.length));
      } else {
        setOverallProgress(0);
      }
    };

    loadCourses();

    const handleStorageChange = () => {
      loadCourses();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    if (isAuth0Authenticated) {
      logout({ logoutParams: { returnTo: window.location.origin } });
    } else {
      window.location.href = '/signin';
    }
  };

  // Helper for radial progress circle
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallProgress / 100) * circumference;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .dashboard-body {
          background-color: #0b0f19;
          color: #f8fafc;
          min-height: 100vh;
          font-family: 'Nunito', sans-serif;
          padding-bottom: 50px;
        }
        .mindova-navbar {
          background-color: #0d1220;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          height: 70px;
        }
        .logo-glow {
          font-weight: 800;
          letter-spacing: 0.5px;
          color: #38bdf8;
          text-shadow: 0 0 10px rgba(56, 189, 248, 0.3);
        }
        .role-badge {
          background-color: #10b981;
          color: #fff;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.5px;
          padding: 4px 10px;
          border-radius: 20px;
        }
        .avatar-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 700;
          border: 2px solid #10b981;
        }
        .logout-btn {
          color: #94a3b8;
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          transition: color 0.2s;
        }
        .logout-btn:hover {
          color: #ef4444;
        }
        .glass-card {
          background: rgba(17, 24, 39, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          backdrop-filter: blur(12px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(99, 102, 241, 0.12);
          border-color: rgba(99, 102, 241, 0.25);
        }
        .progress-ring {
          transform: rotate(-90deg);
        }
        .course-card-img {
          height: 150px;
          object-fit: cover;
          border-top-left-radius: 15px;
          border-top-right-radius: 15px;
          opacity: 0.85;
          filter: brightness(0.9);
        }
        .btn-continue {
          background-color: #6366f1;
          color: white;
          border: none;
          font-weight: 600;
          font-size: 13px;
          border-radius: 8px;
          padding: 8px 16px;
          transition: all 0.2s;
        }
        .btn-continue:hover {
          background-color: #4f46e5;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }
        .btn-icon-action {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #94a3b8;
          background: rgba(255, 255, 255, 0.04);
          transition: all 0.2s;
        }
        .btn-icon-action:hover:not(:disabled) {
          background: rgba(139, 92, 246, 0.15);
          color: #c084fc;
          border-color: rgba(139, 92, 246, 0.3);
        }
        .btn-icon-action:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        .streak-dot {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px dashed rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          color: #64748b;
        }
        .streak-dot.active {
          border: 2px solid #10b981;
          background-color: rgba(16, 185, 129, 0.15);
          color: #10b981;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.25);
        }
        .badge-neon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          margin-bottom: 8px;
          transition: transform 0.2s;
        }
        .badge-neon:hover {
          transform: scale(1.1);
        }
        .quick-tile {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(255, 255, 255, 0.02);
          text-decoration: none;
          color: #f8fafc;
          transition: all 0.2s;
        }
        .quick-tile:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
          color: #38bdf8;
        }
      ` }} />

      <div className="dashboard-body">
        
        {/* Top Navbar */}
        <nav className="mindova-navbar d-flex align-items-center justify-content-between px-4 mb-4">
          <div className="d-flex align-items-center gap-2">
            <Link to="/" style={{ textDecoration: "none" }} className="d-flex align-items-center gap-2">
              <i className="fa fa-book-open text-primary" style={{ fontSize: "20px" }}></i>
              <span className="logo-glow fs-4">LearnSphere</span>
            </Link>
          </div>

          <div className="d-flex align-items-center gap-3">
            <Link to="/" className="text-decoration-none text-light font-weight-bold" style={{ fontSize: "14px" }}>Home</Link>
            <Link to="/courses" className="text-decoration-none text-light font-weight-bold" style={{ fontSize: "14px" }}>Courses</Link>
            <span className="role-badge">STUDENT</span>
            <div className="avatar-circle">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <button onClick={handleLogout} className="logout-btn" title="Logout">
              <i className="fa fa-sign-out-alt"></i>
            </button>
          </div>
        </nav>

        {/* Main Content Body */}
        <div className="container px-4">
          
          {/* Greeting Header */}
          <div className="mb-4">
            <h4 style={{ fontWeight: "700" }} className="mb-1 text-white">
              Welcome, {user.name} ({user.role})
            </h4>
            <p className="text-muted mb-0" style={{ fontSize: "14px" }}>Here is your dashboard and learning metrics snapshot.</p>
          </div>

          {/* Top Panel Cards (Profile and Overall Progress side by side) */}
          <div className="row g-4 mb-5">
            
            {/* Student Profile Card */}
            <div className="col-lg-6">
              <div className="glass-card p-4 h-100 d-flex align-items-center gap-4">
                <div style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #4f46e5, #a855f7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "30px",
                  fontWeight: "800",
                  color: "#fff",
                  boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)"
                }}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h5 className="mb-1 text-white" style={{ fontWeight: "700" }}>{user.name}</h5>
                  <p className="text-muted mb-0" style={{ fontSize: "13px" }}>Student Profile</p>
                  <p className="text-muted mb-0" style={{ fontSize: "11px" }}>{user.email || "No email connected"}</p>
                </div>
              </div>
            </div>

            {/* Overall Progress Card */}
            <div className="col-lg-6">
              <div className="glass-card p-4 h-100 d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted mb-1" style={{ fontSize: "13px", fontWeight: "600" }}>Overall Progress</p>
                  <h2 className="mb-1 text-white" style={{ fontWeight: "800" }}>{overallProgress}%</h2>
                  <p className="text-muted mb-0" style={{ fontSize: "12px" }}>Across {totalEnrollments} enrolled courses</p>
                </div>

                {/* SVG Circular Progress Meter */}
                <div className="position-relative" style={{ width: "90px", height: "90px" }}>
                  <svg className="progress-ring" width="90" height="90">
                    {/* Background track circle */}
                    <circle
                      stroke="rgba(255,255,255,0.06)"
                      strokeWidth="8"
                      fill="transparent"
                      r={radius}
                      cx="45"
                      cy="45"
                    />
                    {/* Colored progress circle */}
                    <circle
                      className="progress-ring-circle"
                      stroke="#8b5cf6"
                      strokeWidth="8"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                      r={radius}
                      cx="45"
                      cy="45"
                      style={{ filter: "drop-shadow(0 0 6px rgba(139, 92, 246, 0.5))" }}
                    />
                  </svg>
                  {/* Absolute centered progress text */}
                  <div className="position-absolute top-50 start-50 translate-middle text-white fw-bold" style={{ fontSize: "14px" }}>
                    {overallProgress}%
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="row g-4">
            
            {/* Left side: Progress Activities Courses */}
            <div className="col-lg-8">
              <h5 className="mb-4 text-white" style={{ fontWeight: "700" }}>Progress Activities</h5>
              
              <div className="row g-4">
                {courses.map((course, idx) => {
                  // Fallback images depending on course titles
                  let cardImage = "/img/course-1.jpg";
                  if (course.title.toLowerCase().includes("ai")) {
                    cardImage = "/img/course-3.jpg";
                  } else if (course.title.toLowerCase().includes("web")) {
                    cardImage = "/img/course-2.jpg";
                  }

                  return (
                    <div key={idx} className="col-md-6">
                      <div className="glass-card h-100 d-flex flex-column justify-content-between" style={{ overflow: "hidden" }}>
                        <div>
                          {/* Course Cover Image */}
                          <img src={cardImage} alt={course.title} className="w-100 course-card-img" />
                          
                          <div className="p-4 pb-0">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <h5 className="text-white mb-0" style={{ fontWeight: "700" }}>{course.title}</h5>
                              <div>
                                {course.status === "awaiting" ? (
                                  <span className="badge bg-warning text-dark px-2 py-1" style={{ fontSize: "10px", fontWeight: "700" }}>
                                    Awaiting Approval
                                  </span>
                                ) : (
                                  <span className="badge bg-success text-white px-2 py-1" style={{ fontSize: "10px", fontWeight: "700", backgroundColor: "#10b981" }}>
                                    Enrolled
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <p className="text-muted mb-3" style={{ fontSize: "12px" }}>
                              {course.status === "awaiting" ? "Progress: Lock status" : `Course Progress: ${course.progress}%`}
                            </p>

                            {/* Progress bar container */}
                            {course.status !== "awaiting" && (
                              <div className="progress mb-4" style={{ height: "6px", backgroundColor: "rgba(255,255,255,0.06)" }}>
                                <div 
                                  className="progress-bar" 
                                  role="progressbar" 
                                  style={{ width: `${course.progress}%`, backgroundColor: "#8b5cf6", borderRadius: "10px" }} 
                                  aria-valuenow={course.progress} 
                                  aria-valuemin="0" 
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Card Actions Footer */}
                        <div className="p-4 pt-0 d-flex align-items-center justify-content-between gap-2 mt-3">
                          {course.status === "awaiting" ? (
                            <button className="btn btn-outline-secondary w-100 py-2 border-dashed" disabled style={{ fontSize: "13px", fontWeight: "600" }}>
                              <i className="fa fa-lock me-2"></i>Awaiting Approval
                            </button>
                          ) : (
                            <>
                              <Link to={course.videoRoute} className="btn btn-continue flex-grow-1 text-center text-white py-2" style={{ textDecoration: "none" }}>
                                <i className="fa fa-play me-2"></i>Continue Learning
                              </Link>
                              
                              {/* Direct Quiz Route shortcut */}
                              <Link 
                                to={course.quizRoute || "/test"} 
                                className="btn-icon-action" 
                                title="Take Quiz Test"
                              >
                                <i className="fa fa-question-circle"></i>
                              </Link>

                              {/* Certificate Download shortcut */}
                              <Link 
                                to={course.progress === 100 ? `/certificate?name=${user.name}&course=${course.title}` : "#"} 
                                className={`btn-icon-action ${course.progress !== 100 ? "disabled" : ""}`}
                                style={course.progress === 100 ? { 
                                  backgroundColor: "rgba(139, 92, 246, 0.15)",
                                  color: "#c084fc",
                                  borderColor: "rgba(139, 92, 246, 0.4)" 
                                } : {}}
                                title={course.progress === 100 ? "View Certificate" : "Certificate Locked"}
                                onClick={(e) => {
                                  if (course.progress !== 100) e.preventDefault();
                                }}
                              >
                                <i className="fa fa-certificate"></i>
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right side: Streak, Achievements & Shortcuts */}
            <div className="col-lg-4 d-flex flex-column gap-4">
              
              {/* Daily Learning Streak Card (Unique Component) */}
              <div className="glass-card p-4">
                <h6 className="text-white mb-2" style={{ fontWeight: "700" }}>Daily Study Streak</h6>
                <p className="text-muted mb-3" style={{ fontSize: "12px" }}>Complete course videos to unlock study streak achievements.</p>
                
                <div className="d-flex justify-content-between align-items-center">
                  {streakDays.map((sd, i) => (
                    <div key={i} className="d-flex flex-column align-items-center gap-1">
                      <div className={`streak-dot ${sd.active ? "active" : ""}`}>
                        {sd.active ? "✓" : sd.day}
                      </div>
                      <span className="text-muted" style={{ fontSize: "10px" }}>{sd.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements Badges Card (Unique Component) */}
              <div className="glass-card p-4">
                <h6 className="text-white mb-3" style={{ fontWeight: "700" }}>Unlocked Badges</h6>
                <div className="d-flex flex-wrap gap-3 justify-content-start">
                  
                  {/* Badge 1: AI completed badge */}
                  <div className="d-flex flex-column align-items-center" style={{ width: "70px" }}>
                    <div className="badge-neon" style={{ 
                      backgroundColor: "rgba(99, 102, 241, 0.15)", 
                      color: "#818cf8", 
                      border: "2px solid rgba(99, 102, 241, 0.4)",
                      boxShadow: "0 0 10px rgba(99, 102, 241, 0.3)"
                    }}>
                      <i className="fa fa-brain"></i>
                    </div>
                    <span className="text-white text-center" style={{ fontSize: "10px", fontWeight: "700" }}>AI Pioneer</span>
                  </div>

                  {/* Badge 2: Web Dev completed badge */}
                  <div className="d-flex flex-column align-items-center" style={{ width: "70px" }}>
                    <div className="badge-neon" style={{ 
                      backgroundColor: "rgba(168, 85, 247, 0.15)", 
                      color: "#c084fc", 
                      border: "2px solid rgba(168, 85, 247, 0.4)",
                      boxShadow: "0 0 10px rgba(168, 85, 247, 0.3)"
                    }}>
                      <i className="fa fa-code"></i>
                    </div>
                    <span className="text-white text-center" style={{ fontSize: "10px", fontWeight: "700" }}>Dev Master</span>
                  </div>

                  {/* Badge 3: SQL badge (Locked since progress is 0) */}
                  <div className="d-flex flex-column align-items-center" style={{ width: "70px", opacity: 0.3 }}>
                    <div className="badge-neon" style={{ 
                      backgroundColor: "rgba(255, 255, 255, 0.05)", 
                      color: "#94a3b8", 
                      border: "2px dashed rgba(255, 255, 255, 0.15)"
                    }}>
                      <i className="fa fa-database"></i>
                    </div>
                    <span className="text-muted text-center" style={{ fontSize: "10px" }}>SQL Scholar</span>
                  </div>

                </div>
              </div>

              {/* Quick Actions Shortcuts (Unique Component) */}
              <div className="glass-card p-4">
                <h6 className="text-white mb-3" style={{ fontWeight: "700" }}>Quick Shortcuts</h6>
                <div className="d-flex flex-column gap-2">
                  <Link to="/test" className="quick-tile">
                    <i className="fa fa-laptop-code text-info" style={{ fontSize: "18px" }}></i>
                    <div>
                      <div className="fw-bold" style={{ fontSize: "13px" }}>Take Assessment Quiz</div>
                      <div className="text-muted" style={{ fontSize: "11px" }}>Check your course skills</div>
                    </div>
                  </Link>

                  <Link to="/library" className="quick-tile">
                    <i className="fa fa-book-reader text-warning" style={{ fontSize: "18px" }}></i>
                    <div>
                      <div className="fw-bold" style={{ fontSize: "13px" }}>Resource Library</div>
                      <div className="text-muted" style={{ fontSize: "11px" }}>Read study guides & E-Books</div>
                    </div>
                  </Link>

                  <div className="quick-tile" style={{ cursor: "pointer" }} onClick={() => {
                    alert("Click on the blue message icon on the bottom right corner to start chatting with your AI Tutor Chatbot!");
                  }}>
                    <i className="fa fa-robot text-success" style={{ fontSize: "18px" }}></i>
                    <div>
                      <div className="fw-bold" style={{ fontSize: "13px" }}>Talk to AI Tutor</div>
                      <div className="text-muted" style={{ fontSize: "11px" }}>Solve homework queries instantly</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}
