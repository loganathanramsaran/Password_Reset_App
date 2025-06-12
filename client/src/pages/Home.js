import { Link } from 'react-router-dom';
import '../components/Home.css';
import { useEffect, useState } from 'react';
import API from '../api/api';

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get('/users/profile')
      .then(res => {
        console.log('👤 Profile response:', res.data);
        setUser(res.data);
      })
      .catch(err => console.error('❌ Error fetching profile:', err));
  }, []);

  return (
    <div className="container py-5 text-center">
      <h3 className="text-primary fw-bold my-3">
        {user ? (
          <>Welcome, <span className="user-name text-capitalize">{user.name}</span></>
        ) : (
          'Welcome!'
        )}
      </h3>

      <p className="text-muted mb-4">
        Use the navigation links to go to Login, Register, or Profile pages.
      </p>

      <div className="d-flex justify-content-center mb-4">
        <img
          src="/home.png"
          alt="Home Icon"
          className="img-fluid"
          style={{ maxWidth: '200px', borderRadius: '16px' }}
        />
      </div>

      <div className="bg-primary text-white py-2 px-3 rounded shadow-sm mb-4">
        <p className="mb-0">
          This is a simple application to demonstrate user authentication and password reset functionality.
        </p>
      </div>

      <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
        <Link to="/login" className="btn btn-sm btn-outline-primary">Login</Link>
        <Link to="/register" className="btn btn-sm btn-outline-success">Register</Link>
        <Link to="/profile" className="btn btn-sm btn-outline-danger">Profile</Link>
      </div>

      <p className="mb-1">
        Source code on{' '}
        <a
          href="https://github.com/loganathanramsaran/Password_Reset_App"
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-underline"
        >
          GitHub
        </a>.
      </p>

      <p className="text-primary mb-0">Built with React, Node.js, and MongoDB.</p>
      <p className="text-warning">Feel free to contribute or report issues!</p>
    </div>
  );
}

export default Home;
