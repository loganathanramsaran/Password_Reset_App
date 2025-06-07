function Home() {
  return (
    <div className="home text-center">
        <h2>Welcome to the Home Page</h2>
        <p>Use the navigation links to go to Login, Register, or Profile pages.</p>
        <img src='/main.png' alt="Placeholder" className="img-fluid w-25 h-auto mb-3" />
        <p className="text-muted">This is a simple application to demonstrate user authentication and password reset functionality.</p>
        <div className="button-group mb-3 d-flex justify-content-center">
            <button className="btn btn-sm btn-primary me-2" onClick={() => window.location.href = '/login'}>Go to Login</button>
            <button className="btn btn-sm btn-secondary me-2" onClick={() => window.location.href = '/register'}>Go to Register</button>
            <button className="btn btn-sm btn-success me-2" onClick={() => window.location.href = '/profile'}>Go to Profile</button>
        </div>
        <p>Check out the source code on <a href="https://github.com/loganathanramsaran/Password_Reset_App" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
        <p className="text-info">This app is built with React, Node.js, and MongoDB.</p>
        <p className="text-warning">Feel free to contribute or report issues!</p>
    </div>
  )
}

export default Home;
