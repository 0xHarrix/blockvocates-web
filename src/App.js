import './App.css';


function App() {
  return (
    <div className="App">
      <div className="flex-container">
      <img src='orbs.png' className="orb" alt="Orbs" />
        <div className="form-container">
          <div className="form">
            <h2>Login</h2>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" placeholder="Enter your password" required />
            </div>
            <button type="submit">Sign In</button>
            <div className="separator">or</div>
            <button className="google-signin-btn">Sign In with Google</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
