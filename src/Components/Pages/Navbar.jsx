import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "./Spinner";

export default function Navbar() {
  const { user: auth0User, isAuthenticated: isAuth0Authenticated, isLoading, logout } =
    useAuth0();

  // Support local mock user in localStorage
  const localUserStr = localStorage.getItem('user');
  const localUser = localUserStr ? JSON.parse(localUserStr) : null;
  const isAuthenticated = isAuth0Authenticated || !!localUser;
  const user = auth0User || localUser;

  const handleLogout = () => {
    localStorage.removeItem('user');
    if (isAuth0Authenticated) {
      logout({ logoutParams: { returnTo: window.location.origin } });
    } else {
      window.location.reload();
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center px-4 px-lg-5"
        >
          <h2 className="m-0 text-primary">
            <i className="fa fa-book me-3"></i>LearnSphere
          </h2>
        </Link>
        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <NavLink
              exact
              to="/"
              className="nav-item nav-link"
              activeClassName="active"
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className="nav-item nav-link"
              activeClassName="active"
            >
              About
            </NavLink>
            <NavLink
              to="/courses"
              className="nav-item nav-link"
              activeClassName="active"
            >
              Courses
            </NavLink>
            <NavLink
              to="/projects"
              className="nav-item nav-link"
              activeClassName="active"
            >
              Projects
            </NavLink>
            <div className="nav-item dropdown">
              <NavLink
                to="/pages"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Pages
              </NavLink>
              <div className="dropdown-menu fade-down m-0">
                <NavLink
                  to="/team"
                  className="dropdown-item"
                  activeClassName="active"
                >
                  Our Team
                </NavLink>
                <NavLink
                  to="/testimonial"
                  className="dropdown-item"
                  activeClassName="active"
                >
                  Testimonial
                </NavLink>
                <NavLink
                  to="/feedback"
                  className="dropdown-item"
                  activeClassName="active"
                >
                  Feedback
                </NavLink>
              </div>
            </div>
            <NavLink
              to="/contact"
              className="nav-item nav-link"
              activeClassName="active"
            >
              Contact
            </NavLink>
          </div>

          {isLoading && <Spinner />}

          {isAuthenticated && (
            <NavLink
              to={
                user && user.role === 'admin'
                  ? "/admin"
                  : user && user.role === 'instructor'
                  ? "/instructor"
                  : "/profile"
              }
              className="nav-item nav-link"
              activeClassName="active"
            >
              {user && user.role === 'admin'
                ? "Admin Dashboard"
                : user && user.role === 'instructor'
                ? "Instructor Dashboard"
                : user.name}
            </NavLink>
          )}
          {isAuthenticated ? (
            <button
              className="btn btn-primary py-4 px-lg-5 d-none d-lg-block"
              onClick={handleLogout}
            >
              Log out
            </button>
          ) : (
            <Link
              to="/signin"
              className="btn btn-primary py-4 px-lg-5 d-none d-lg-block"
            >
              Join Now<i className="fa fa-arrow-right ms-3"></i>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
