import { useEffect, useState } from 'react';
import API from '../api/api';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get('/auth/profile')
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, []);

  return user ? <div>Welcome, {user.name}</div> : <div>Loading...
    <button className="btn btn-sm btn-info me-2" onClick={() => window.location.href = '/'}>Go to Home</button>
    </div>;
};

export default Profile;
