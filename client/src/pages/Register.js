import { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post('/users/register', {
        name: form.name.trim(),
        email: form.email.toLowerCase().trim(),
        password: form.password,
      });
      alert("Registration successful!");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center py-5">
      <img src="/register.png" alt="Register" className="img-fluid mb-4" style={{ maxWidth: '200px' }} />

      <h3 className="text-success mb-3">Register Your Account</h3>

      <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: '400px' }}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
            autoComplete="name"
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
            autoComplete="email"
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
            autoComplete="new-password"
          />
        </div>

        <button type="submit" className="btn btn-success w-100">Register</button>
      </form>

      <p className="text-muted mt-4">
        Already have an account?{' '}
        <span className="text-info">
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Login here</a>
        </span>
      </p>

      <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="text-decoration-none">
        ← Back to Home
      </a>
    </div>
  );
};

export default Register;
