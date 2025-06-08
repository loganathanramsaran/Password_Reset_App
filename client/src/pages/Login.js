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
  console.log('Login API baseURL:', API.defaults.baseURL);

  return (
    <div className='login-container text-center'>
      <img src='/login.png' alt="Login" className="img-fluid w-25 h-auto mb-3" />
      <h4>Login your Account here!</h4>

      <form className='d-flex flex-column justify-content-center mt-5' onSubmit={handleLogin}>
        <input
          className='form-control w-50 mx-auto'
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          className='form-control w-50 mx-auto'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button className='btn btn-sm btn-info w-25 mx-auto' type="submit">Login</button>
        <button
          className='btn btn-sm btn-secondary w-25 mx-auto mt-3'
          type="button"
          onClick={() => navigate('/forgot-password')}
        >
          Forgot Password?
        </button>
      </form>

      <p className='text-muted mt-4'>
        If you don't have an account, register one here!
        <span className='text-info'>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/register'); }}> Register New Account</a>
        </span>
      </p>

      <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Go to Home</a>
    </div>
  );
}

export default Login;
