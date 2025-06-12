import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError('❌ Passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setError('❌ Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/users/reset-password/${token}`,
        { newPassword }
      );
      setMessage(response.data.message || '✅ Password reset successful.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || '❌ Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center py-5">
      <div className="w-100 p-4 shadow-sm rounded bg-light" style={{ maxWidth: '500px' }}>
        <h3 className="text-center text-primary mb-4">Reset Your Password</h3>

        {message && <div className="alert alert-success text-center">{message}</div>}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleReset}>
          {/* For autofill compatibility */}
          <input
            type="text"
            name="username"
            autoComplete="username"
            value="reset-placeholder"
            hidden
            readOnly
          />

          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">New Password</label>
            <input
              type="password"
              id="newPassword"
              className="form-control"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
