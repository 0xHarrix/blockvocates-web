import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='flex'>
        <img src='orbs.png' className='orb'></img>
        <div className='form'>
          <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Sign In</button>
        </div>
      </div>
    </div>
  );
}

export default App;
