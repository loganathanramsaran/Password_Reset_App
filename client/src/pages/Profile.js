import { useEffect, useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  API.get('/users/profile')
    .then(res => {
      console.log('👤 Profile response:', res.data); // Inspect this
      setUser(res.data);
    })
    .catch(err => console.error('❌ Error fetching profile:', err));
}, []);


  return(
    <div className='profile-container text-center'>
      <img src='/profile.png' alt="Profile Illustration" className="img-fluid w-25 h-auto mb-3" />
      <h4 className=''>Your Profile</h4>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
  ) : (
        <p className='text-danger'>You are not Logged in yet!</p>
      )}
      <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Go to Home</a>
    </div>
  );
};

export default Profile;
