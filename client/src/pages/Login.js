import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
      navigate('/profile');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center py-5">
      <img
        src="/login.png"
        alt="Login"
        className="img-fluid mb-3"
        style={{ maxWidth: '200px' }}
      />

      <h4 className="mb-3 text-primary">Login to Your Account</h4>

      <form
        className="w-100"
        style={{ maxWidth: '400px' }}
        onSubmit={handleLogin}
      >
        <div className="mb-3">
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className="mb-3">
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        <button className="btn btn-info w-100 mb-2" type="submit">
          Login
        </button>

        <button
          className="btn btn-secondary w-100"
          type="button"
          onClick={() => navigate('/forgot-password')}
        >
          Forgot Password?
        </button>
      </form>

      <p className="mt-4 text-muted text-center">
        Don’t have an account?{' '}
        <span className="text-info">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('/register');
            }}
          >
            Register here
          </a>
        </span>
      </p>

      <a
        href="#"
        className="text-decoration-none mt-2"
        onClick={(e) => {
          e.preventDefault();
          navigate('/');
        }}
      >
        ← Back to Home
      </a>
    </div>
  );
}

export default Login;
