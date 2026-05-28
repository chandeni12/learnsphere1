import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Register() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [role, setRole] = useState('student');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (password1 !== password2) {
            setError("Passwords do not match!");
            return;
        }

        setError("");
        
        const storedUsersStr = localStorage.getItem('users_db');
        let usersDb = storedUsersStr ? JSON.parse(storedUsersStr) : [
            { name: "admin", email: "admin@gmail.com", phone: "9999999999", password: "admin123", role: "admin" },
            { name: "Dr. Chandeni", email: "instructor@gmail.com", phone: "9030465611", password: "instructor123", role: "instructor" },
            { name: "ankitha", email: "ankitha@gmail.com", phone: "8888888888", password: "ankitha123", role: "student" }
        ];

        // Check if email already exists
        if (usersDb.some(u => u.email.toLowerCase() === email.toLowerCase())) {
            setError("Email is already registered!");
            return;
        }

        // Single admin constraint
        if (role === 'admin') {
            const hasAdmin = usersDb.some(u => u.role === 'admin');
            if (hasAdmin) {
                setError("An administrator account is already registered! Only one admin is allowed.");
                return;
            }
        }

        const newUser = {
            name: name,
            email: email,
            phone: phone,
            password: password1,
            role: role
        };
        usersDb.push(newUser);
        localStorage.setItem('users_db', JSON.stringify(usersDb));

        // Save active user session
        localStorage.setItem('user', JSON.stringify({
            name: name,
            email: email,
            role: role
        }));
        
        // Redirect based on role
        if (role === 'admin') {
            window.location.href = '/admin';
        } else if (role === 'instructor') {
            window.location.href = '/instructor';
        } else {
            window.location.href = '/profile';
        }
    };

    return (
        <>
            <Navbar />
            <div className="container-xxl py-5" style={{ backgroundColor: "#f8f9fa", minHeight: "85vh", display: "flex", alignItems: "center" }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-10 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="bg-white p-5 border-0 shadow-sm" style={{ borderRadius: "15px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
                                <div className="text-center mb-5">
                                    <h6 className="section-title bg-white text-center text-primary px-3 mb-3">Registration</h6>
                                    <h2 className="mb-2">Create Account</h2>
                                    <p className="text-muted">Join our e-learning platform and start your journey</p>
                                </div>

                                {error && (
                                    <div className="alert alert-danger border-0 text-white mb-4" style={{ backgroundColor: "#ef4444", borderRadius: "10px" }} role="alert">
                                        <i className="fa fa-exclamation-circle me-2"></i> {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <label htmlFor="name" className="form-label fw-bold" style={{ fontSize: "14px", color: "#555" }}>
                                                <i className="fa fa-user text-primary me-2" />Full Name
                                            </label>
                                            <input 
                                                type="text" 
                                                name='name' 
                                                className="form-control py-3" 
                                                id="name" 
                                                placeholder="John Doe" 
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                style={{ borderRadius: "10px", borderColor: "#ddd", fontSize: "14px" }} 
                                                required 
                                            />
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <label htmlFor="phone" className="form-label fw-bold" style={{ fontSize: "14px", color: "#555" }}>
                                                <i className="fa fa-phone text-primary me-2" />Phone Number
                                            </label>
                                            <input 
                                                type="tel" 
                                                name='phone' 
                                                className="form-control py-3" 
                                                id="phone" 
                                                placeholder="+91 99999 99999" 
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                style={{ borderRadius: "10px", borderColor: "#ddd", fontSize: "14px" }} 
                                                required 
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="inputEmail3" className="form-label fw-bold" style={{ fontSize: "14px", color: "#555" }}>
                                            <i className="fa fa-envelope text-primary me-2" />Email Address
                                        </label>
                                        <input 
                                            type="email" 
                                            name='email' 
                                            className="form-control py-3" 
                                            id="inputEmail3" 
                                            placeholder="name@example.com" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            style={{ borderRadius: "10px", borderColor: "#ddd", fontSize: "14px" }} 
                                            required 
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="roleSelect" className="form-label fw-bold" style={{ fontSize: "14px", color: "#555" }}>
                                            <i className="fa fa-user-shield text-primary me-2" />Select Role
                                        </label>
                                        <select 
                                            id="roleSelect"
                                            className="form-select py-3" 
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            style={{ borderRadius: "10px", borderColor: "#ddd", fontSize: "14px", appearance: "auto" }} 
                                            required
                                        >
                                            <option value="student">Student</option>
                                            <option value="instructor">Instructor</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <label htmlFor="inputPassword3" className="form-label fw-bold" style={{ fontSize: "14px", color: "#555" }}>
                                                <i className="fa fa-lock text-primary me-2" />Set Password
                                            </label>
                                            <input 
                                                type="password" 
                                                name='password1' 
                                                className="form-control py-3" 
                                                id="inputPassword3" 
                                                placeholder="••••••••" 
                                                value={password1}
                                                onChange={(e) => setPassword1(e.target.value)}
                                                style={{ borderRadius: "10px", borderColor: "#ddd", fontSize: "14px" }} 
                                                required 
                                            />
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <label htmlFor="RePassword" className="form-label fw-bold" style={{ fontSize: "14px", color: "#555" }}>
                                                <i className="fa fa-redo text-primary me-2" />Confirm Password
                                            </label>
                                            <input 
                                                type="password" 
                                                name='password2' 
                                                className="form-control py-3" 
                                                id="RePassword" 
                                                placeholder="••••••••" 
                                                value={password2}
                                                onChange={(e) => setPassword2(e.target.value)}
                                                style={{ borderRadius: "10px", borderColor: "#ddd", fontSize: "14px" }} 
                                                required 
                                            />
                                        </div>
                                    </div>

                                    <div className="d-grid gap-2 mt-5">
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary py-3" 
                                            style={{ borderRadius: "30px", fontWeight: "600", letterSpacing: "0.5px" }}
                                        >
                                            Register
                                        </button>
                                    </div>

                                    <div className="text-center mt-4">
                                        <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>
                                            Already have an account? <Link to="/signin" className="text-primary fw-bold ms-1" style={{ textDecoration: "none" }}>Sign In</Link>
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
