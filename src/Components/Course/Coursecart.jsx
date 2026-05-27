import React, { useState, useEffect } from 'react'

export default function Coursecart({ link, title, desc }) {
    const localUserStr = localStorage.getItem('user');
    const localUser = localUserStr ? JSON.parse(localUserStr) : null;

    const [completed, setCompleted] = useState(false);
    const pathname = window.location.pathname; // e.g. "/courses/fullstack/html"

    // Helper to format course name from path
    const getCourseTitle = (path) => {
        const parts = path.split('/');
        const lastPart = parts[parts.length - 1];
        if (!lastPart || lastPart === 'courses') return 'General Course';
        return lastPart.toUpperCase().replace('-', ' ');
    };

    useEffect(() => {
        if (!localUser) return;
        
        // Check if this video is marked as completed
        const coursesStateStr = localStorage.getItem(`courses_state_${localUser.email}`);
        if (coursesStateStr) {
            const coursesState = JSON.parse(coursesStateStr);
            const course = coursesState.find(c => c.id === pathname);
            if (course && course.watchedVideos && course.watchedVideos.includes(link)) {
                setCompleted(true);
            }
        }
    }, [link, pathname, localUser]);

    const handleToggleComplete = () => {
        if (!localUser) {
            alert("Please log in to track your course progress!");
            return;
        }

        const coursesStateStr = localStorage.getItem(`courses_state_${localUser.email}`);
        let coursesState = coursesStateStr ? JSON.parse(coursesStateStr) : [];
        
        let course = coursesState.find(c => c.id === pathname);
        if (!course) {
            // Auto-enroll the course
            course = {
                id: pathname,
                title: getCourseTitle(pathname),
                progress: 0,
                icon: pathname.includes("html") || pathname.includes("css") ? "fa-laptop-code" : "fa-brain",
                color: "#60a5fa",
                status: "active",
                videoRoute: pathname,
                watchedVideos: [],
                totalVideos: 1
            };
            coursesState.push(course);
        }

        // Find number of video tags on current page to divide progress equally
        const totalVideosOnPage = document.querySelectorAll('video').length || 1;
        course.totalVideos = totalVideosOnPage;

        if (!completed) {
            if (!course.watchedVideos.includes(link)) {
                course.watchedVideos.push(link);
            }
            setCompleted(true);
        } else {
            course.watchedVideos = course.watchedVideos.filter(v => v !== link);
            setCompleted(false);
        }

        // Recalculate progress
        course.progress = Math.round((course.watchedVideos.length / course.totalVideos) * 100);
        course.status = course.progress === 100 ? "completed" : "active";

        localStorage.setItem(`courses_state_${localUser.email}`, JSON.stringify(coursesState));
        
        // Dispatch event so other components receive real-time updates
        window.dispatchEvent(new Event('storage'));
    };

    return (
        <>
            <div className="col-lg-4 col-md-6 wow fadeInUp">
                <div className="course-item bg-light text-center" style={{ border: "1px solid #1f2937", borderRadius: "10px", backgroundColor: "#111827" }}>
                    <div className="position-relative overflow-hidden">
                        <video width="100%" height="200" controls style={{ borderTopLeftRadius: "9px", borderTopRightRadius: "9px" }}>
                            <source src={link} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="text-center p-4 pb-0">
                        <h5 className="mb-2 text-white">{title}</h5>
                        <p className="mb-3 text-muted" style={{ fontSize: "13px" }}>{desc}</p>
                        {localUser && (
                            <button 
                                onClick={handleToggleComplete} 
                                className={`btn btn-sm w-100 mb-3 py-2 ${completed ? "btn-success" : "btn-outline-primary"}`}
                                style={{ borderRadius: "8px", fontWeight: "600", transition: "all 0.2s" }}
                            >
                                {completed ? "Completed ✓" : "Mark as Watched"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
