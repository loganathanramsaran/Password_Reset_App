import { Link } from 'react-router-dom';
import '../components/Home.css'; // Import custom styles for Home component

function Home() {
  return (
    <div className="container text-center mt-5 home">
      <h3 className="text-primary mb-3">Welcome to the Home Page</h3>
      <p className="text-muted">
        Use the navigation links to go to Login, Register, or Profile pages.
      </p>

      <img src="/main.png" alt="Placeholder" className="w-25 mb-4" />

      <p className="text-muted animate-running">
        This is a simple application to demonstrate user authentication and password reset functionality.
      </p>

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
