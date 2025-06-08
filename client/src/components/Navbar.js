import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
    <nav className="navbar">
        <div className="navbar-logo">
            <Link to="/">Password Reset App</Link>
        </div>
        <ul className="navbar-links">
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/reset">Reset Password</Link>
            </li>
        </ul>
    </nav>
);

export default Navbar;
