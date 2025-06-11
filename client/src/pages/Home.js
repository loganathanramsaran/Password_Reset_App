import { Link } from 'react-router-dom';
import '../components/Home.css'; // Import custom styles for Home component
import { useEffect, useState } from 'react';
import API from '../api/api';

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
  API.get('/users/profile')
    .then(res => {
      console.log('👤 Profile response:', res.data); // Inspect this
      setUser(res.data);
    })
    .catch(err => console.error('❌ Error fetching profile:', err));
}, []);

  return (
    <div className="home-container text-center  mx-auto mt-5 pt-3">
      <h3 className="headline text-primary">
        {user ? (
          <>
            Welcome,{' '}
            <span className="user-name">
              { user.name.charAt(0).toUpperCase() + user.name.slice(1)}
            </span>
         </>
        ) : (
          'Welcome!'
        )}
      </h3>
      <p className="text-muted">
        Use the navigation links to go to Login, Register, or Profile pages.
      </p>
      <div className="home-image ">
        <img src="/home.png" alt="Home Icon" className="img-fluid w-25 " />
      </div>

      <section className='bg-primary'>        
        <p className=" text-white mb-0 animate-running ">
        This is a simple application to demonstrate user authentication and password reset functionality.
        </p>
      </section>

      <div className="button-group my-4 d-flex justify-content-center flex-wrap gap-2">
        <Link to="/login" className="btn btn-sm btn-primary">Go to Login</Link>
        <Link to="/register" className="btn btn-sm btn-success">Go to Register</Link>
        <Link to="/profile" className="btn btn-sm btn-danger">Go to Profile</Link>
      </div>

      <p>
        Check out the source code on{' '}
        <a href="https://github.com/loganathanramsaran/Password_Reset_App" target="_blank" rel="noopener noreferrer" className="github-link">
          GitHub
        </a>.
      </p>

      <p className="text-primary">This app is built with React, Node.js, and MongoDB.</p>
      <p className="text-warning">Feel free to contribute or report issues!</p>
    </div>
  );
}

export default Home;
