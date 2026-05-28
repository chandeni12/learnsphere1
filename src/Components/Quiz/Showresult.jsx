import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Showresult(props) {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const localUserStr = localStorage.getItem('user');
        if (!localUserStr) return;

        const user = JSON.parse(localUserStr);
        if (user.role !== 'student') return;

        const coursesKey = `courses_state_${user.email}`;
        const userCoursesStr = localStorage.getItem(coursesKey);
        if (!userCoursesStr) return;

        const courses = JSON.parse(userCoursesStr);
        const percentage = Math.round((props.result / props.total) * 100);
        const passed = percentage >= 50;

        let matched = false;
        const updatedCourses = courses.map(c => {
            let isMatch = false;
            // Check direct route/ID matching
            if (c.quizRoute === window.location.pathname || c.id === props.path || c.videoRoute === props.path) {
                isMatch = true;
            }
            // Check topic mapping
            else if (props.topic === "AI" && c.title.toUpperCase() === "AI") {
                isMatch = true;
            }
            else if (props.topic === "Full Stack" && c.title.toUpperCase() === "WEB DEVELOPMENT") {
                isMatch = true;
            }
            else if ((props.topic === "JavaScript" || props.topic === "SQL") && c.title.toUpperCase() === "SQL") {
                isMatch = true;
            }
            // Fallback matching by title search
            else if (props.topic && c.title.toLowerCase().includes(props.topic.toLowerCase())) {
                isMatch = true;
            }

            if (isMatch && c.examStatus === "booked") {
                matched = true;
                return {
                    ...c,
                    examStatus: passed ? "passed" : "failed",
                    examScore: percentage
                };
            }
            return c;
        });

        if (matched) {
            localStorage.setItem(coursesKey, JSON.stringify(updatedCourses));
            window.dispatchEvent(new Event('storage'));
        }
    }, [props.result, props.total, props.path, props.topic]);

    useEffect(() => {
        setTimeout(() => {
            setVisible(true);
        }, 3000);
    }, []);

    return (
        <>
            <div className='showresult'>
                <div>
                    <h4>Your Score : {props.result}</h4>
                    <h4>Total Score : {props.total}</h4>
                    <h4>Your Percentage : {props.result * 100 / props.total} %</h4>
                    <button className='btn tryAgain mt-3' onClick={props.tryAgain}>Try Again</button>
                </div>
            </div>
            {visible && (
                <div className="container main-alert">
                    <button type="button" class="btn-close" aria-label="Close" onClick={() => setVisible(false)}></button>
                    <div class="alert alert-success " role="alert">
                        <h4 className="alert-heading">Well done!</h4>
                        <p>You successfully completed the assessment. To improve more watch the course related videos.</p>
                        <hr />
                        <p className="mb-0">You need to improve more, please see these videos... </p>
                       <Link to={props.path}> <button type="button" className="btn btn-primary btn-sm">Watch Now</button></Link>
                    </div>
                </div>
            )}
        </>
    )
}
