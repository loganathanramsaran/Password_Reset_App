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
    <img src='/register.png' alt="Register Illustration" className="img-fluid w-25 h-auto mb-3" />
    <h4>Register your Account here!</h4>
    <form className='d-flex flex-column w-50 mx-auto gap-2' onSubmit={handleSubmit}>
      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} required />
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} required />
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} required />
      <button className='btn btn-sm btn-success w-25 mx-auto' type="submit">Register</button>
    </form>
    <p className='text-muted mt-4'>Already have an Account? 
      <span className='text-info'>
        <a href='' onClick={() => navigate('/login')}> Login Here</a>
      </span>
    </p>
    <a href='' onClick={() => navigate('/')}>Go to Home</a>
    </div>
  );
};

export default Register;
