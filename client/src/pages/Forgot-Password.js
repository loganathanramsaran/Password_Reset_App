import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!validateEmail(email)) {
      setError('❌ Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/users/forgot-password`,
        { email }
      );
      setMessage(response.data.message || '✅ Reset link sent successfully.');
    } catch (err) {
      setError(err.response?.data?.message || '❌ Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center py-5">
      <div className="w-100 bg-light p-4 rounded shadow-sm" style={{ maxWidth: '500px' }}>
        <h3 className="text-center text-primary mb-4">Forgot Your Password?</h3>

        <div className="text-center mb-3">
          <img src="/forgot.png" alt="Forgot Password" className="img-fluid w-50" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Enter your registered email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        {message && <div className="alert alert-success mt-3 text-center">{message}</div>}
        {error && <div className="alert alert-danger mt-3 text-center">{error}</div>}
      </div>
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

export default ForgotPassword;
