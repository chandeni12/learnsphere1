import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Sign() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        const storedUsersStr = localStorage.getItem('users_db');
        let usersDb = storedUsersStr ? JSON.parse(storedUsersStr) : [
            { name: "admin", email: "admin@gmail.com", phone: "9999999999", password: "admin123", role: "admin" },
            { name: "Dr. Chandeni", email: "instructor@gmail.com", phone: "9030465611", password: "instructor123", role: "instructor" },
            { name: "ankitha", email: "ankitha@gmail.com", phone: "8888888888", password: "ankitha123", role: "student" }
        ];

        let searchEmail = email.toLowerCase();
        if (searchEmail === 'admin') searchEmail = 'admin@gmail.com';
        if (searchEmail === 'instructor') searchEmail = 'instructor@gmail.com';
        if (searchEmail === 'ankitha') searchEmail = 'ankitha@gmail.com';

        // Find the user by email
        const user = usersDb.find(u => u.email.toLowerCase() === searchEmail);

        if (!user) {
            setError("Invalid email address!");
            return;
        }

        // Validate password
        if (user.password !== password) {
            setError("Incorrect password!");
            return;
        }

        // Successful authentication
        const userObj = {
            name: user.name,
            email: user.email,
            role: user.role
        };
        localStorage.setItem('user', JSON.stringify(userObj));

        // Redirect based on role
        if (user.role === 'admin') {
            window.location.href = '/admin';
        } else if (user.role === 'instructor') {
            window.location.href = '/instructor';
        } else {
            window.location.href = '/profile';
        }
    };

    return (
        <>
            <Navbar />
            
            <div className="container-xxl py-5" style={{ backgroundColor: "#f8f9fa", minHeight: "80vh", display: "flex", alignItems: "center" }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5 col-md-8 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="bg-white p-5 border-0 shadow-sm" style={{ borderRadius: "15px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
                                <div className="text-center mb-5">
                                    <h6 className="section-title bg-white text-center text-primary px-3 mb-3">Portal Login</h6>
                                    <h2 className="mb-2">Welcome Back!</h2>
                                    <p className="text-muted">Sign in to access your courses and progress</p>
                                </div>
                                {error && (
                                    <div className="alert alert-danger border-0 text-white mb-4" style={{ backgroundColor: "#ef4444", borderRadius: "10px" }} role="alert">
                                        <i className="fa fa-exclamation-circle me-2"></i> {error}
                                    </div>
                                )}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="exampleInputEmail1" className="form-label fw-bold" style={{ fontSize: "14px", color: "#555" }}>
                                            <i className="fa fa-envelope text-primary me-2" />Email Address
                                        </label>
                                        <input 
                                            type="email" 
                                            name='email' 
                                            className="form-control py-3" 
                                            id="exampleInputEmail1" 
                                            placeholder="name@example.com" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            style={{ borderRadius: "10px", borderColor: "#ddd", fontSize: "14px" }} 
                                            required 
                                        />
                                        <div id="emailHelp" className="form-text mt-2 text-muted" style={{ fontSize: "12px" }}>
                                            Use <b>admin@gmail.com</b> for Admin, <b>instructor@gmail.com</b> for Instructor, or <b>ankitha@gmail.com</b> for Student dashboard.
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between mb-1">
                                            <label htmlFor="exampleInputPassword1" className="form-label fw-bold" style={{ fontSize: "14px", color: "#555" }}>
                                                <i className="fa fa-lock text-primary me-2" />Password
                                            </label>
                                        </div>
                                        <input 
                                            type="password" 
                                            name='pwd' 
                                            className="form-control py-3" 
                                            id="exampleInputPassword1" 
                                            placeholder="••••••••" 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            style={{ borderRadius: "10px", borderColor: "#ddd", fontSize: "14px" }} 
                                            required 
                                        />
                                    </div>
                                    <div className="d-grid gap-2 mt-5">
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary py-3" 
                                            style={{ borderRadius: "30px", fontWeight: "600", letterSpacing: "0.5px" }}
                                        >
                                            Sign In
                                        </button>
                                    </div>
                                    <div className="text-center mt-4">
                                        <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>
                                            Don't have an account? <Link to="/register" className="text-primary fw-bold ms-1" style={{ textDecoration: "none" }}>Sign Up</Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}
