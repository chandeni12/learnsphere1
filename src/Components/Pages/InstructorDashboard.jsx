import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [courses, setCourses] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [students, setStudents] = useState([]);
  
  // Form states
  const [newCourse, setNewCourse] = useState({ title: "", description: "", category: "Web Dev", duration: "", thumbnail: "" });
  const [newVideo, setNewVideo] = useState({ courseId: "", title: "", videoUrl: "", pdfUrl: "" });
  const [newQuiz, setNewQuiz] = useState({ courseId: "", question: "", o1: "", o2: "", o3: "", o4: "", correct: "o1", timer: "10" });
  const [profile, setProfile] = useState({ name: "Dr. Chandeni", skills: "Full-Stack Web Dev, Cloud Architecture, Databases", experience: "8+ Years in Teaching MCA Courses", email: "chandeni134@gmail.com", github: "https://github.com/chandeni12" });

  const [notification, setNotification] = useState("");

  // Initial load
  useEffect(() => {
    loadGlobalData();
  }, []);

  const loadGlobalData = () => {
    // 1. Load instructor created courses
    const defaultCourses = [
      { id: "/courses/mern/react", title: "AI", category: "AI", duration: "10 Hrs" },
      { id: "/courses/fullstack", title: "WEB DEVELOPMENT", category: "Web Dev", duration: "12 Hrs" },
      { id: "/courses/fullstack/sql", title: "SQL", category: "Database", duration: "8 Hrs" }
    ];
    const storedCoursesStr = localStorage.getItem("instructor_courses");
    const storedCourses = storedCoursesStr ? JSON.parse(storedCoursesStr) : [];
    setCourses([...defaultCourses, ...storedCourses]);

    // 2. Load quizzes
    const storedQuizzesStr = localStorage.getItem("instructor_quizzes");
    const storedQuizzes = storedQuizzesStr ? JSON.parse(storedQuizzesStr) : [
      { id: 1, courseId: "/courses/mern/react", question: "What is AI?", correct: "Artificial Intelligence" },
      { id: 2, courseId: "/courses/fullstack/sql", question: "What does SQL stand for?", correct: "Structured Query Language" }
    ];
    setQuizzes(storedQuizzes);

    // 3. Scan localStorage for student progress
    const studentList = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("courses_state_")) {
        const email = key.replace("courses_state_", "");
        if (email === "admin@gmail.com" || email === "instructor@gmail.com") continue;
        try {
          const studentCourses = JSON.parse(localStorage.getItem(key)) || [];
          studentCourses.forEach(c => {
            studentList.push({
              name: email.split('@')[0],
              email: email,
              courseTitle: c.title,
              progress: c.progress || 0,
              status: c.status
            });
          });
        } catch (e) {
          console.error(e);
        }
      }
    }

    // Add static fallback student data if empty
    if (studentList.length === 0) {
      studentList.push(
        { name: "ankitha", email: "ankitha@gmail.com", courseTitle: "AI", progress: 100, status: "completed" },
        { name: "ankitha", email: "ankitha@gmail.com", courseTitle: "WEB DEVELOPMENT", progress: 100, status: "completed" },
        { name: "Anwitha", email: "anw@gmail.com", courseTitle: "SQL", progress: 100, status: "completed" },
        { name: "Ash", email: "ash@gmail.com", courseTitle: "Java Core", progress: 35, status: "active" }
      );
    }
    setStudents(studentList);
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 4000);
  };

  // Handlers
  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title) return;
    const courseId = `/courses/custom-${Date.now()}`;
    const newCourseObj = {
      ...newCourse,
      id: courseId,
      lessons: []
    };
    const storedCoursesStr = localStorage.getItem("instructor_courses");
    const storedCourses = storedCoursesStr ? JSON.parse(storedCoursesStr) : [];
    const updated = [...storedCourses, newCourseObj];
    localStorage.setItem("instructor_courses", JSON.stringify(updated));
    
    // Auto-enroll default student Ankitha in the new course as Awaiting Approval to show admin approval flow
    const ankithaKey = 'courses_state_ankitha@gmail.com';
    const ankithaCourses = JSON.parse(localStorage.getItem(ankithaKey)) || [];
    if (!ankithaCourses.find(c => c.id === courseId)) {
      ankithaCourses.push({
        id: courseId,
        title: newCourse.title.toUpperCase(),
        progress: 0,
        icon: "fa-book-open",
        color: "#10b981",
        status: "awaiting",
        videoRoute: courseId,
        watchedVideos: [],
        totalVideos: 1
      });
      localStorage.setItem(ankithaKey, JSON.stringify(ankithaCourses));
      window.dispatchEvent(new Event('storage'));
    }

    setNewCourse({ title: "", description: "", category: "Web Dev", duration: "", thumbnail: "" });
    loadGlobalData();
    showNotification(`Successfully created course: ${newCourse.title}! (Ankitha enrolled as awaiting approval)`);
  };

  const handleDeleteCourse = (courseId) => {
    const storedCoursesStr = localStorage.getItem("instructor_courses");
    const storedCourses = storedCoursesStr ? JSON.parse(storedCoursesStr) : [];
    const updated = storedCourses.filter(c => c.id !== courseId);
    localStorage.setItem("instructor_courses", JSON.stringify(updated));
    loadGlobalData();
    showNotification("Course deleted successfully.");
  };

  const handleUploadVideo = (e) => {
    e.preventDefault();
    if (!newVideo.courseId || !newVideo.title || !newVideo.videoUrl) return;
    
    // Add lessons to local courses storage
    const storedCoursesStr = localStorage.getItem("instructor_courses");
    const storedCourses = storedCoursesStr ? JSON.parse(storedCoursesStr) : [];
    const updated = storedCourses.map(c => {
      if (c.id === newVideo.courseId) {
        const lessons = c.lessons || [];
        return {
          ...c,
          lessons: [...lessons, { title: newVideo.title, videoUrl: newVideo.videoUrl, pdfUrl: newVideo.pdfUrl }]
        };
      }
      return c;
    });
    localStorage.setItem("instructor_courses", JSON.stringify(updated));
    
    setNewVideo({ courseId: "", title: "", videoUrl: "", pdfUrl: "" });
    loadGlobalData();
    showNotification("Video lecture successfully assigned to module!");
  };

  const handleCreateQuiz = (e) => {
    e.preventDefault();
    if (!newQuiz.courseId || !newQuiz.question) return;
    const storedQuizzesStr = localStorage.getItem("instructor_quizzes");
    const storedQuizzes = storedQuizzesStr ? JSON.parse(storedQuizzesStr) : [];
    const updated = [...storedQuizzes, {
      id: Date.now(),
      courseId: newQuiz.courseId,
      question: newQuiz.question,
      options: [newQuiz.o1, newQuiz.o2, newQuiz.o3, newQuiz.o4],
      correct: newQuiz[newQuiz.correct],
      timer: newQuiz.timer
    }];
    localStorage.setItem("instructor_quizzes", JSON.stringify(updated));
    
    setNewQuiz({ courseId: "", question: "", o1: "", o2: "", o3: "", o4: "", correct: "o1", timer: "10" });
    loadGlobalData();
    showNotification("Created new assessment quiz successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/signin';
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .instructor-body {
          background-color: #0b0f19;
          color: #f8fafc;
          min-height: 100vh;
          font-family: 'Nunito', sans-serif;
        }
        .sidebar {
          width: 250px;
          background-color: #0d1220;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          height: 100vh;
          position: sticky;
          top: 0;
        }
        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          color: #94a3b8;
          text-decoration: none;
          font-weight: 600;
          border-radius: 8px;
          margin: 4px 15px;
          transition: all 0.2s;
          cursor: pointer;
        }
        .sidebar-link:hover, .sidebar-link.active {
          color: #38bdf8;
          background-color: rgba(56, 189, 248, 0.08);
        }
        .main-panel {
          flex-grow: 1;
          padding: 40px;
        }
        .glass-card {
          background: rgba(17, 24, 39, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          backdrop-filter: blur(12px);
          padding: 24px;
        }
        .form-control-dark {
          background-color: #111827 !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: #fff !important;
          border-radius: 8px;
        }
        .form-control-dark:focus {
          border-color: #38bdf8 !important;
          box-shadow: 0 0 0 0.25rem rgba(56, 189, 248, 0.25) !important;
        }
        .badge-cyan {
          background-color: rgba(56, 189, 248, 0.12);
          color: #38bdf8;
          border: 1px solid rgba(56, 189, 248, 0.3);
          border-radius: 12px;
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 700;
        }
        .table-dark-custom {
          color: #cbd5e1;
        }
        .table-dark-custom th {
          border-bottom: 1px solid rgba(255,255,255,0.08);
          color: #fff;
          font-weight: 600;
        }
        .table-dark-custom td {
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
      ` }} />

      <div className="instructor-body d-flex">
        
        {/* Left Navigation Sidebar */}
        <aside className="sidebar d-flex flex-column justify-content-between py-4">
          <div>
            {/* Logo */}
            <div className="px-4 mb-5 d-flex align-items-center gap-2">
              <i className="fa fa-book-open text-primary" style={{ fontSize: "22px" }}></i>
              <span className="fw-bold fs-4 text-white" style={{ letterSpacing: "0.5px" }}>LearnSphere</span>
            </div>

            {/* Menu Links */}
            <div className="d-flex flex-column gap-1">
              <span className="px-4 text-muted text-uppercase fw-bold mb-2" style={{ fontSize: "11px" }}>Instructor Dashboard</span>
              <div 
                className={`sidebar-link ${activeTab === "dashboard" ? "active" : ""}`}
                onClick={() => setActiveTab("dashboard")}
              >
                <i className="fa fa-tachometer-alt"></i> Dashboard
              </div>
              <div 
                className={`sidebar-link ${activeTab === "courses" ? "active" : ""}`}
                onClick={() => setActiveTab("courses")}
              >
                <i className="fa fa-book"></i> Courses
              </div>
              <div 
                className={`sidebar-link ${activeTab === "upload" ? "active" : ""}`}
                onClick={() => setActiveTab("upload")}
              >
                <i className="fa fa-video"></i> Upload Videos
              </div>
              <div 
                className={`sidebar-link ${activeTab === "quizzes" ? "active" : ""}`}
                onClick={() => setActiveTab("quizzes")}
              >
                <i className="fa fa-question-circle"></i> Quizzes
              </div>
              <div 
                className={`sidebar-link ${activeTab === "students" ? "active" : ""}`}
                onClick={() => setActiveTab("students")}
              >
                <i className="fa fa-users"></i> Students
              </div>
              <div 
                className={`sidebar-link ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <i className="fa fa-user-tie"></i> Profile Settings
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="px-3">
            <button onClick={handleLogout} className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 py-2" style={{ borderRadius: "8px", fontWeight: "600" }}>
              <i className="fa fa-sign-out-alt"></i> Log Out
            </button>
          </div>
        </aside>

        {/* Right Panel Main Panel */}
        <main className="main-panel">
          
          {/* Notification banner */}
          {notification && (
            <div className="alert alert-success border-0 text-white mb-4 shadow-lg" style={{ backgroundColor: "#10b981", borderRadius: "12px" }} role="alert">
              <i className="fa fa-check-circle me-2"></i> {notification}
            </div>
          )}

          {/* 1. Dashboard Tab View */}
          {activeTab === "dashboard" && (
            <div>
              <div className="mb-4">
                <h3 className="fw-bold text-white mb-1">Hello, {profile.name}</h3>
                <p className="text-muted mb-0">Here is your course design summary and metrics snapshot.</p>
              </div>

              {/* Stats Cards Row */}
              <div className="row g-4 mb-5">
                <div className="col-xl-3 col-sm-6">
                  <div className="glass-card d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center justify-content-center bg-primary text-white rounded-3" style={{ width: "50px", height: "50px" }}>
                      <i className="fa fa-book fs-4"></i>
                    </div>
                    <div>
                      <p className="text-muted mb-0" style={{ fontSize: "12px" }}>COURSES CREATED</p>
                      <h4 className="fw-bold mb-0 text-white">{courses.length}</h4>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6">
                  <div className="glass-card d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center justify-content-center bg-success text-white rounded-3" style={{ width: "50px", height: "50px", backgroundColor: "#10b981" }}>
                      <i className="fa fa-users fs-4"></i>
                    </div>
                    <div>
                      <p className="text-muted mb-0" style={{ fontSize: "12px" }}>ENROLLED STUDENTS</p>
                      <h4 className="fw-bold mb-0 text-white">{students.length}</h4>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6">
                  <div className="glass-card d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center justify-content-center bg-warning text-white rounded-3" style={{ width: "50px", height: "50px", backgroundColor: "#f59e0b" }}>
                      <i className="fa fa-question-circle fs-4"></i>
                    </div>
                    <div>
                      <p className="text-muted mb-0" style={{ fontSize: "12px" }}>TOTAL QUIZZES</p>
                      <h4 className="fw-bold mb-0 text-white">{quizzes.length}</h4>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6">
                  <div className="glass-card d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center justify-content-center bg-info text-white rounded-3" style={{ width: "50px", height: "50px", backgroundColor: "#06b6d4" }}>
                      <i className="fa fa-check-double fs-4"></i>
                    </div>
                    <div>
                      <p className="text-muted mb-0" style={{ fontSize: "12px" }}>COMPLETION RATE</p>
                      <h4 className="fw-bold mb-0 text-white">82%</h4>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="mb-5">
                <h5 className="mb-3 text-white" style={{ fontWeight: "700" }}>Quick Actions</h5>
                <div className="row g-4">
                  <div className="col-md-3 col-sm-6">
                    <div className="glass-card text-center p-4 cursor-pointer" onClick={() => setActiveTab("courses")} style={{ cursor: "pointer" }}>
                      <i className="fa fa-plus-circle text-primary fs-2 mb-3"></i>
                      <h6 className="fw-bold text-white mb-1">Create Course</h6>
                      <p className="text-muted mb-0" style={{ fontSize: "11px" }}>Add modules & categories</p>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="glass-card text-center p-4 cursor-pointer" onClick={() => setActiveTab("upload")} style={{ cursor: "pointer" }}>
                      <i className="fa fa-video text-success fs-2 mb-3"></i>
                      <h6 className="fw-bold text-white mb-1">Upload Video</h6>
                      <p className="text-muted mb-0" style={{ fontSize: "11px" }}>Publish lecture resources</p>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="glass-card text-center p-4 cursor-pointer" onClick={() => setActiveTab("quizzes")} style={{ cursor: "pointer" }}>
                      <i className="fa fa-edit text-warning fs-2 mb-3"></i>
                      <h6 className="fw-bold text-white mb-1">Manage Quiz</h6>
                      <p className="text-muted mb-0" style={{ fontSize: "11px" }}>Build assessment options</p>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="glass-card text-center p-4 cursor-pointer" onClick={() => setActiveTab("students")} style={{ cursor: "pointer" }}>
                      <i className="fa fa-users text-info fs-2 mb-3"></i>
                      <h6 className="fw-bold text-white mb-1">View Students</h6>
                      <p className="text-muted mb-0" style={{ fontSize: "11px" }}>Track progress percentages</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Student Activity */}
              <div>
                <h5 className="mb-3 text-white" style={{ fontWeight: "700" }}>Recent Student Activity</h5>
                <div className="glass-card">
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex justify-content-between align-items-center py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <div className="d-flex align-items-center gap-3">
                        <div className="rounded-circle d-flex align-items-center justify-content-center bg-success text-white" style={{ width: "36px", height: "36px", fontSize: "12px", fontWeight: "700" }}>A</div>
                        <div>
                          <div className="fw-bold text-white" style={{ fontSize: "13px" }}>ankitha completed AI assessment quiz</div>
                          <div className="text-muted" style={{ fontSize: "11px" }}>Scored 100% (Passed)</div>
                        </div>
                      </div>
                      <span className="text-muted" style={{ fontSize: "11px" }}>2 mins ago</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <div className="d-flex align-items-center gap-3">
                        <div className="rounded-circle d-flex align-items-center justify-content-center bg-info text-white" style={{ width: "36px", height: "36px", fontSize: "12px", fontWeight: "700" }}>A</div>
                        <div>
                          <div className="fw-bold text-white" style={{ fontSize: "13px" }}>Anwitha finished module lecture chapters of SQL</div>
                          <div className="text-muted" style={{ fontSize: "11px" }}>Progress marked completed</div>
                        </div>
                      </div>
                      <span className="text-muted" style={{ fontSize: "11px" }}>1 hour ago</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center py-2">
                      <div className="d-flex align-items-center gap-3">
                        <div className="rounded-circle d-flex align-items-center justify-content-center bg-warning text-white" style={{ width: "36px", height: "36px", fontSize: "12px", fontWeight: "700" }}>S</div>
                        <div>
                          <div className="fw-bold text-white" style={{ fontSize: "13px", color: "#facc15" }}>Ash requested enrollment approval for SQL</div>
                          <div className="text-muted" style={{ fontSize: "11px" }}>Awaiting Admin action</div>
                        </div>
                      </div>
                      <span className="text-muted" style={{ fontSize: "11px" }}>3 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. Manage Courses Tab View */}
          {activeTab === "courses" && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold text-white mb-0">Course Management</h4>
              </div>

              <div className="row g-4">
                
                {/* Creation Form */}
                <div className="col-lg-5">
                  <div className="glass-card">
                    <h5 className="text-white mb-4" style={{ fontWeight: "700" }}>Create New Course</h5>
                    <form onSubmit={handleCreateCourse}>
                      <div className="mb-3">
                        <label className="form-label text-muted" style={{ fontSize: "12px" }}>COURSE TITLE</label>
                        <input 
                          type="text" 
                          className="form-control form-control-dark" 
                          placeholder="e.g. Node.js Developer Guide" 
                          value={newCourse.title}
                          onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                          required 
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-muted" style={{ fontSize: "12px" }}>CATEGORY</label>
                        <select 
                          className="form-select form-control-dark" 
                          value={newCourse.category}
                          onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                        >
                          <option value="Web Dev">Web Development</option>
                          <option value="AI">Artificial Intelligence</option>
                          <option value="Database">Database Management</option>
                          <option value="Programming">Programming Language</option>
                        </select>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label text-muted" style={{ fontSize: "12px" }}>DURATION</label>
                          <input 
                            type="text" 
                            className="form-control form-control-dark" 
                            placeholder="e.g. 10.5 Hrs" 
                            value={newCourse.duration}
                            onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label text-muted" style={{ fontSize: "12px" }}>MOCK THUMBNAIL URL</label>
                          <input 
                            type="text" 
                            className="form-control form-control-dark" 
                            placeholder="optional link" 
                            value={newCourse.thumbnail}
                            onChange={(e) => setNewCourse({ ...newCourse, thumbnail: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="form-label text-muted" style={{ fontSize: "12px" }}>DESCRIPTION</label>
                        <textarea 
                          className="form-control form-control-dark" 
                          rows="3" 
                          placeholder="Provide details about lessons, syllabus..."
                          value={newCourse.description}
                          onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                        ></textarea>
                      </div>
                      <button className="btn btn-primary w-100 py-3" style={{ borderRadius: "8px", fontWeight: "600" }} type="submit">
                        <i className="fa fa-plus me-2"></i>Publish Course
                      </button>
                    </form>
                  </div>
                </div>

                {/* Courses List */}
                <div className="col-lg-7">
                  <div className="glass-card">
                    <h5 className="text-white mb-4" style={{ fontWeight: "700" }}>Active Courses Directory</h5>
                    
                    <div className="d-flex flex-column gap-3">
                      {courses.map((course, idx) => (
                        <div key={idx} className="p-3 d-flex justify-content-between align-items-center rounded-3" style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                          <div>
                            <span className="badge-cyan mb-2 d-inline-block">{course.category}</span>
                            <h6 className="text-white fw-bold mb-1">{course.title}</h6>
                            <p className="text-muted mb-0" style={{ fontSize: "12px" }}>Duration: {course.duration || "N/A"} | ID: {course.id}</p>
                          </div>
                          
                          {/* Only allow deleting custom created courses to maintain default test suites */}
                          {course.id.includes("custom") && (
                            <button onClick={() => handleDeleteCourse(course.id)} className="btn btn-sm btn-outline-danger" style={{ borderRadius: "6px" }}>
                              <i className="fa fa-trash"></i>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 3. Upload Videos Tab View */}
          {activeTab === "upload" && (
            <div>
              <h4 className="fw-bold text-white mb-4">Video Upload & Lecture Section</h4>

              <div className="row g-4">
                
                {/* Upload Form */}
                <div className="col-lg-6">
                  <div className="glass-card">
                    <h5 className="text-white mb-4" style={{ fontWeight: "700" }}>Upload Lecture Module</h5>
                    <form onSubmit={handleUploadVideo}>
                      <div className="mb-3">
                        <label className="form-label text-muted" style={{ fontSize: "12px" }}>SELECT TARGET COURSE</label>
                        <select 
                          className="form-select form-control-dark"
                          value={newVideo.courseId}
                          onChange={(e) => setNewVideo({ ...newVideo, courseId: e.target.value })}
                          required
                        >
                          <option value="">-- Choose Course --</option>
                          {courses.map((c, i) => (
                            <option key={i} value={c.id}>{c.title}</option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-muted" style={{ fontSize: "12px" }}>LESSON/LECTURE TITLE</label>
                        <input 
                          type="text" 
                          className="form-control form-control-dark" 
                          placeholder="e.g. Chapter 1: Introduction to Scope" 
                          value={newVideo.title}
                          onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                          required 
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-muted" style={{ fontSize: "12px" }}>VIDEO DIRECT LINK (MP4)</label>
                        <input 
                          type="text" 
                          className="form-control form-control-dark" 
                          placeholder="e.g. http://localhost:8080/lesson1.mp4" 
                          value={newVideo.videoUrl}
                          onChange={(e) => setNewVideo({ ...newVideo, videoUrl: e.target.value })}
                          required 
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label text-muted" style={{ fontSize: "12px" }}>NOTES/RESOURCES PDF URL</label>
                        <input 
                          type="text" 
                          className="form-control form-control-dark" 
                          placeholder="optional study guide link" 
                          value={newVideo.pdfUrl}
                          onChange={(e) => setNewVideo({ ...newVideo, pdfUrl: e.target.value })}
                        />
                      </div>
                      <button className="btn btn-success w-100 py-3" style={{ borderRadius: "8px", fontWeight: "600", backgroundColor: "#10b981", borderColor: "#10b981" }} type="submit">
                        <i className="fa fa-cloud-upload-alt me-2"></i>Upload Video Lecture
                      </button>
                    </form>
                  </div>
                </div>

                {/* Help text */}
                <div className="col-lg-6">
                  <div className="glass-card">
                    <h5 className="text-white mb-3" style={{ fontWeight: "700" }}>Upload Guidelines</h5>
                    <p style={{ fontSize: "14px", lineHeight: "1.6" }} className="text-muted">
                      When publishing lecture videos, your links will automatically update the students' dashboard cards. 
                      Once a student marks all uploaded chapters as watched under their profile, they will dynamically unlock the printable completions certificate.
                    </p>
                    
                    <h6 className="text-white mb-2 mt-4" style={{ fontWeight: "700" }}>Folder Structure mapping:</h6>
                    <pre className="p-3 rounded text-light" style={{ backgroundColor: "#111827", fontSize: "12px" }}>
{`Course
 ├── Module 1 (Video / Resources)
 ├── Module 2 (Video / Resources)
 └── Quiz Assessment (Final Exams)`}
                    </pre>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 4. Quizzes Tab View */}
          {activeTab === "quizzes" && (
            <div>
              <h4 className="fw-bold text-white mb-4">Quiz & MCQ Management</h4>

              <div className="row g-4">
                
                {/* Form */}
                <div className="col-lg-6">
                  <div className="glass-card">
                    <h5 className="text-white mb-4" style={{ fontWeight: "700" }}>Add Assessment Question</h5>
                    <form onSubmit={handleCreateQuiz}>
                      <div className="mb-3">
                        <label className="form-label text-muted" style={{ fontSize: "12px" }}>TARGET COURSE</label>
                        <select 
                          className="form-select form-control-dark"
                          value={newQuiz.courseId}
                          onChange={(e) => setNewQuiz({ ...newQuiz, courseId: e.target.value })}
                          required
                        >
                          <option value="">-- Choose Course --</option>
                          {courses.map((c, i) => (
                            <option key={i} value={c.id}>{c.title}</option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-muted" style={{ fontSize: "12px" }}>QUESTION TEXT</label>
                        <input 
                          type="text" 
                          className="form-control form-control-dark" 
                          placeholder="e.g. Which keyword defines block-scoped variables in JS?" 
                          value={newQuiz.question}
                          onChange={(e) => setNewQuiz({ ...newQuiz, question: e.target.value })}
                          required 
                        />
                      </div>
                      <div className="row">
                        <div className="col-6 mb-3">
                          <label className="form-label text-muted" style={{ fontSize: "11px" }}>OPTION A</label>
                          <input type="text" className="form-control form-control-dark" placeholder="Option A" value={newQuiz.o1} onChange={(e) => setNewQuiz({ ...newQuiz, o1: e.target.value })} required />
                        </div>
                        <div className="col-6 mb-3">
                          <label className="form-label text-muted" style={{ fontSize: "11px" }}>OPTION B</label>
                          <input type="text" className="form-control form-control-dark" placeholder="Option B" value={newQuiz.o2} onChange={(e) => setNewQuiz({ ...newQuiz, o2: e.target.value })} required />
                        </div>
                        <div className="col-6 mb-3">
                          <label className="form-label text-muted" style={{ fontSize: "11px" }}>OPTION C</label>
                          <input type="text" className="form-control form-control-dark" placeholder="Option C" value={newQuiz.o3} onChange={(e) => setNewQuiz({ ...newQuiz, o3: e.target.value })} required />
                        </div>
                        <div className="col-6 mb-3">
                          <label className="form-label text-muted" style={{ fontSize: "11px" }}>OPTION D</label>
                          <input type="text" className="form-control form-control-dark" placeholder="Option D" value={newQuiz.o4} onChange={(e) => setNewQuiz({ ...newQuiz, o4: e.target.value })} required />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <label className="form-label text-muted" style={{ fontSize: "12px" }}>CORRECT ANSWER</label>
                          <select 
                            className="form-select form-control-dark"
                            value={newQuiz.correct}
                            onChange={(e) => setNewQuiz({ ...newQuiz, correct: e.target.value })}
                          >
                            <option value="o1">Option A</option>
                            <option value="o2">Option B</option>
                            <option value="o3">Option C</option>
                            <option value="o4">Option D</option>
                          </select>
                        </div>
                        <div className="col-md-6 mb-4">
                          <label className="form-label text-muted" style={{ fontSize: "12px" }}>TIMER (MINUTES)</label>
                          <input type="number" className="form-control form-control-dark" value={newQuiz.timer} onChange={(e) => setNewQuiz({ ...newQuiz, timer: e.target.value })} />
                        </div>
                      </div>
                      <button className="btn btn-warning w-100 py-3 text-dark fw-bold" style={{ borderRadius: "8px" }} type="submit">
                        <i className="fa fa-check me-2"></i>Publish Assessment Quiz
                      </button>
                    </form>
                  </div>
                </div>

                {/* Quizzes List */}
                <div className="col-lg-6">
                  <div className="glass-card">
                    <h5 className="text-white mb-3" style={{ fontWeight: "700" }}>Active Quizzes</h5>
                    <div className="d-flex flex-column gap-3">
                      {quizzes.map((q, idx) => (
                        <div key={idx} className="p-3 rounded" style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                          <span className="badge bg-warning text-dark mb-2 px-2" style={{ fontSize: "10px", fontWeight: "700" }}>QUIZ #{idx+1}</span>
                          <h6 className="text-white mb-1" style={{ fontWeight: "700" }}>{q.question}</h6>
                          <p className="text-muted mb-0" style={{ fontSize: "12px" }}>Correct Answer: <b>{q.correct}</b></p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 5. View Students Tab View */}
          {activeTab === "students" && (
            <div className="glass-card">
              <h4 className="fw-bold text-white mb-4">Enrolled Students Progress Tracking</h4>
              
              <div className="table-responsive">
                <table className="table table-borderless table-dark-custom align-middle mb-0">
                  <thead>
                    <tr>
                      <th className="pb-3">Student Name</th>
                      <th className="pb-3">Course Title</th>
                      <th className="pb-3 text-center">Status</th>
                      <th className="pb-3 w-25">Completion Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, idx) => (
                      <tr key={idx}>
                        <td className="py-3">
                          <span className="d-block text-white fw-bold">{student.name}</span>
                          <span className="text-muted" style={{ fontSize: "12px" }}>{student.email}</span>
                        </td>
                        <td className="py-3 text-white">{student.courseTitle}</td>
                        <td className="py-3 text-center">
                          {student.status === "awaiting" ? (
                            <span className="badge bg-warning text-dark px-3 py-2" style={{ borderRadius: "20px" }}>Awaiting Admin</span>
                          ) : (
                            <span className="badge bg-success text-white px-3 py-2" style={{ borderRadius: "20px", backgroundColor: "#10b981" }}>Active Enrolled</span>
                          )}
                        </td>
                        <td className="py-3">
                          <div className="d-flex align-items-center gap-3">
                            <span className="text-white fw-bold" style={{ fontSize: "13px" }}>{student.progress}%</span>
                            <div className="progress flex-grow-1" style={{ height: "6px", backgroundColor: "rgba(255,255,255,0.06)" }}>
                              <div className="progress-bar bg-success" role="progressbar" style={{ width: `${student.progress}%`, backgroundColor: "#10b981" }} aria-valuenow={student.progress} aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 6. Profile Settings Tab View */}
          {activeTab === "profile" && (
            <div className="row g-4">
              
              {/* Profile Card details */}
              <div className="col-lg-5">
                <div className="glass-card text-center py-5">
                  <div className="d-inline-flex align-items-center justify-content-center bg-primary text-white mb-4 rounded-circle" style={{ width: "90px", height: "90px", fontSize: "40px", fontWeight: "800", boxShadow: "0 0 20px rgba(56, 189, 248, 0.4)" }}>
                    C
                  </div>
                  <h4 className="fw-bold text-white mb-1">{profile.name}</h4>
                  <p className="text-muted mb-3" style={{ fontSize: "13px" }}>Senior MCA Instructor</p>
                  
                  <div className="px-4 text-start">
                    <p className="text-muted mb-2" style={{ fontSize: "13px" }}><i className="fa fa-envelope text-primary me-2"></i> {profile.email}</p>
                    <p className="text-muted mb-2" style={{ fontSize: "13px" }}><i className="fa fa-history text-success me-2"></i> {profile.experience}</p>
                    <p className="text-muted mb-0" style={{ fontSize: "13px" }}><i className="fa fa-code text-warning me-2"></i> Skills: {profile.skills}</p>
                  </div>

                  <div className="d-flex gap-3 justify-content-center mt-5">
                    <a href={profile.github} target="_blank" className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                      <i className="fab fa-github"></i>
                    </a>
                  </div>
                </div>
              </div>

              {/* Edit form */}
              <div className="col-lg-7">
                <div className="glass-card">
                  <h5 className="text-white mb-4" style={{ fontWeight: "700" }}>Edit Instructor Profile</h5>
                  <form onSubmit={(e) => { e.preventDefault(); showNotification("Profile changes updated successfully!"); }}>
                    <div className="mb-3">
                      <label className="form-label text-muted" style={{ fontSize: "12px" }}>INSTRUCTOR NAME</label>
                      <input type="text" className="form-control form-control-dark" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-muted" style={{ fontSize: "12px" }}>EMAIL ADDRESS</label>
                      <input type="email" className="form-control form-control-dark" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-muted" style={{ fontSize: "12px" }}>SKILLS & CATEGORIES</label>
                      <input type="text" className="form-control form-control-dark" value={profile.skills} onChange={(e) => setProfile({ ...profile, skills: e.target.value })} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-muted" style={{ fontSize: "12px" }}>TEACHING EXPERIENCE</label>
                      <input type="text" className="form-control form-control-dark" value={profile.experience} onChange={(e) => setProfile({ ...profile, experience: e.target.value })} />
                    </div>
                    <div className="mb-4">
                      <label className="form-label text-muted" style={{ fontSize: "12px" }}>GITHUB PROFILE URL</label>
                      <input type="text" className="form-control form-control-dark" value={profile.github} onChange={(e) => setProfile({ ...profile, github: e.target.value })} />
                    </div>
                    <button className="btn btn-primary px-4 py-3" style={{ borderRadius: "8px", fontWeight: "600" }} type="submit">
                      Save Profile Changes
                    </button>
                  </form>
                </div>
              </div>

            </div>
          )}

        </main>
      </div>
    </>
  );
}
