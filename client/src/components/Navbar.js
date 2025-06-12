import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Home.css';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary px-4 py-0 fixed-top">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img
          src="/logo.png"
          alt="Logo"
          width="35"
          className="d-inline-block me-1"
        />
        <span className="brand-text text-white">PasswordResetApp</span>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto align-items-center">
          <li className="nav-item">
            <NavLink className="nav-link custom-hover text-white" to="/" exact="true">
              Home
            </NavLink>
          </li>

          {!token && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link custom-hover text-white" to="/register">
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link custom-hover text-white" to="/login">
                  Login
                </NavLink>
              </li>
            </>
          )}

          {token && (
            <li className="nav-item dropdown">
              <a
                href="/#"
                className="nav-link dropdown-toggle d-flex align-items-center text-white"
                id="userDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={(e) => e.preventDefault()} // Prevent scroll-to-top
              >
                <img
                  src="/profile.png"
                  alt="User Avatar"
                  width="30"
                  height="30"
                  className="rounded-circle me-2"
                  onError={(e) => (e.currentTarget.src = '/default-avatar.png')}
                />
                <span>User</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li>
                  <button className="dropdown-item" onClick={() => navigate('/profile')}>
                    Profile
                  </button>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
