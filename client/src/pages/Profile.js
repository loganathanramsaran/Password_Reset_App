import { useEffect, useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/users/profile')
      .then(res => {
        console.log('👤 Profile response:', res.data);
        setUser(res.data);
      })
      .catch(err => {
        console.error('❌ Error fetching profile:', err);
        setUser(null);
      });
  }, []);

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center py-5">
      <img
        src="/profile.png"
        alt="Profile"
        className="img-fluid mb-4"
        style={{ maxWidth: '200px' }}
      />

      <h3 className="text-primary mb-3">Your Profile</h3>

      {user ? (
        <div className="text-center">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <div className="alert alert-warning w-100 text-center" style={{ maxWidth: '400px' }}>
          You are not logged in.
        </div>
      )}

      <button
        className="btn btn-outline-primary mt-4"
        onClick={() => navigate('/')}
      >
        ← Back to Home
      </button>
    </div>
  );
};

export default Profile;
