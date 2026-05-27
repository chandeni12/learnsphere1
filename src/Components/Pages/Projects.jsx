import React from "react";

export default function Projects() {
  const projectsData = [
    {
      id: 1,
      title: "E-Commerce Web Application",
      description: "A full-featured e-commerce platform with product categories, shopping cart, user authentication, and secure checkout integration.",
      tech: ["MongoDB", "Express", "React", "Node.js"],
      icon: "fa-shopping-cart",
      difficulty: "Advanced",
      delay: "0.1s"
    },
    {
      id: 2,
      title: "Interactive Quiz Application",
      description: "A real-time quiz engine with customized category selection, score summary cards, and dynamic timer management.",
      tech: ["React", "CSS3", "Node.js", "Express"],
      icon: "fa-tasks",
      difficulty: "Intermediate",
      delay: "0.3s"
    },
    {
      id: 3,
      title: "Library Management System",
      description: "A robust database management system to track book inventory, member records, and borrowing schedules.",
      tech: ["Java", "JDBC", "MySQL", "Swing"],
      icon: "fa-book-reader",
      difficulty: "Intermediate",
      delay: "0.5s"
    },
    {
      id: 4,
      title: "Pathfinding Algorithm Visualizer",
      description: "An educational visual tool showing how search algorithms like Dijkstra's, A*, and BFS traverse a grid to find the shortest path.",
      tech: ["HTML5", "CSS3", "JavaScript", "DSA"],
      icon: "fa-project-diagram",
      difficulty: "Advanced",
      delay: "0.1s"
    },
    {
      id: 5,
      title: "Responsive Student Portfolio",
      description: "A beautiful, mobile-friendly landing page with personal biography, skills list, progress bars, and contact forms.",
      tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
      icon: "fa-user-graduate",
      difficulty: "Beginner",
      delay: "0.3s"
    },
    {
      id: 6,
      title: "Social Media API Services",
      description: "A secure RESTful backend API supporting token authentication, user posts, comment threads, and friend request structures.",
      tech: ["Node.js", "Express", "MongoDB", "JWT"],
      icon: "fa-server",
      difficulty: "Advanced",
      delay: "0.5s"
    }
  ];

  return (
    <>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">
              Showcase
            </h6>
            <h1 className="mb-5">Our Student Projects</h1>
          </div>

          <div className="row g-4 justify-content-center">
            {projectsData.map((project) => (
              <div
                key={project.id}
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay={project.delay}
              >
                <div className="card h-100 border-0 shadow-sm p-4 text-center d-flex flex-column align-items-center" style={{
                  borderRadius: "15px",
                  transition: "all 0.3s ease",
                  backgroundColor: "#fff",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.05)";
                }}
                >
                  <div 
                    className="d-flex align-items-center justify-content-center bg-light text-primary mb-4" 
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      fontSize: "30px",
                      transition: "transform 0.3s ease"
                    }}
                  >
                    <i className={`fa ${project.icon}`} />
                  </div>
                  <span className={`badge mb-3 px-3 py-2 ${
                    project.difficulty === "Advanced" ? "bg-danger" : 
                    project.difficulty === "Intermediate" ? "bg-warning text-dark" : "bg-success"
                  }`} style={{ fontSize: "12px", borderRadius: "30px" }}>
                    {project.difficulty}
                  </span>
                  <h5 className="mb-3">{project.title}</h5>
                  <p className="text-muted mb-4" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                    {project.description}
                  </p>
                  
                  <div className="mt-auto w-100">
                    <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
                      {project.tech.map((t, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 text-primary" 
                          style={{
                            fontSize: "11px",
                            fontWeight: "600",
                            backgroundColor: "rgba(6, 163, 218, 0.1)",
                            borderRadius: "5px"
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <button 
                      className="btn btn-primary w-100 py-2" 
                      style={{
                        borderRadius: "30px",
                        fontWeight: "500",
                        transition: "all 0.3s"
                      }}
                    >
                      View Project Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
