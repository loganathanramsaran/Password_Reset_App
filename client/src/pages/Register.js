import { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/auth/register', form);
    navigate('/login');
  };

  return (
    <div className="register-container text-center">
      <h1>Welcome to the Registration Page</h1>
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} required />
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} required />
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} required />
      <button type="submit">Register</button>
    </form>
    <button className="btn btn-sm btn-info me-2" onClick={() => window.location.href = '/'}>Go to Home</button>
    </div>
  );
};

export default Register;
