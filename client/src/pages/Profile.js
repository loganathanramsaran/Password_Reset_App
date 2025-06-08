import { useEffect, useState } from 'react';
import API from '../api/api';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get('/auth/profile')
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
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
        <p>Loading profile...</p>
      )}
      <button className='btn btn-sm btn-secondary mt-3' onClick={() => window.location.href = '/'}>Go to Home</button>
    </div>
  );
};

export default Profile;
