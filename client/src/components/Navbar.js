import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css'

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary px-4 py-1">
    <Link className="navbar-brand d-flex align-items-center" to="/">
    <img
      src="/logo.png"
      alt="Logo"
      width="35"
      className="d-inline-block me-1"
    />
    <span className="brand-text">PasswordResetApp</span>
    </Link>
      <button
        className="navbar-toggler "
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" ></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto align-items-center">
          <li className="nav-item">
            <Link className="nav-link custom-hover" to="/">Home</Link>
          </li>
          {!token && (
            <>
              <li className="nav-item">
                <Link className="nav-link custom-hover" to="/register">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link custom-hover" to="/login">Login</Link>
              </li>
            </>
          )}
          {token && (
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="/#"
                id="userDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="/profile.png"
                  alt="User Avatar"
                  width="30"
                  height="30"
                  className="rounded-circle me-2"
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
