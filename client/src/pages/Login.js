import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 🔑 Place the function HERE inside the component
  const handleLogin = async (e) => {
    e.preventDefault(); // prevent page reload
    try {
      const { data } = await API.post('/auth/login', {
        email,
        password,
      });

      // Save token
      localStorage.setItem('token', data.token);

      alert('Login successful!');
      navigate('/profile'); // redirect to profile page
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className='login-container text-center'>
        <img src='/login.png' alt="Login Illustration" className="img-fluid w-25 h-auto mb-3" />
      <h4 className=''>Login your Account here!</h4>
      <form className='d-flex flex-column justify-content-center mt-5' onSubmit={handleLogin}>
        <input className='form-control w-50 mx-auto'
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input className='form-control w-50 mx-auto'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button className='btn btn-sm btn-info w-25 mx-auto' type="submit">Login</button>
        <button className='btn btn-sm btn-secondary w-25 mx-auto mt-3' onClick={() => navigate('/forgot-password')}>Forgot Password?</button>
      </form>
        <p className='text-muted mt-4'>If you don't have an Account, Register a Account Here!
            <span className='text-info'>
            <a href='' onClick={() => navigate('/register')}>  Register New Account</a>
            </span>
        </p>

    <a href='' onClick={() => navigate('/')}>Go to Home</a>
    </div>
  );
}

export default Login;
