
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { registerUser, loginUser, fetchActivities, logActivity } from './api';

function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [activities, setActivities] = useState([]);
  const [activityType, setActivityType] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await registerUser(username, email, password);
    if (res.token) {
      setToken(res.token);
      setMessage("Registered and logged in!");
    } else {
      setMessage(JSON.stringify(res));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await loginUser(username, password);
    if (res.token) {
      setToken(res.token);
      setMessage("Logged in!");
    } else {
      setMessage(JSON.stringify(res));
    }
  };

  const handleFetchActivities = async () => {
    const res = await fetchActivities(token);
    setActivities(res);
  };

  const handleLogActivity = async (e) => {
    e.preventDefault();
    const res = await logActivity(token, activityType, duration, calories);
    setMessage(JSON.stringify(res));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Octofit Tracker Demo</h2>
        <form onSubmit={handleRegister} style={{marginBottom: 10}}>
          <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit">Register</button>
        </form>
        <form onSubmit={handleLogin} style={{marginBottom: 10}}>
          <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
        {token && (
          <>
            <form onSubmit={handleLogActivity} style={{marginBottom: 10}}>
              <input placeholder="Activity Type" value={activityType} onChange={e => setActivityType(e.target.value)} />
              <input placeholder="Duration (min)" value={duration} onChange={e => setDuration(e.target.value)} />
              <input placeholder="Calories Burned" value={calories} onChange={e => setCalories(e.target.value)} />
              <button type="submit">Log Activity</button>
            </form>
            <button onClick={handleFetchActivities}>Fetch My Activities</button>
            <ul>
              {Array.isArray(activities) && activities.map(a => (
                <li key={a.id}>{a.activity_type} - {a.duration_minutes} min - {a.calories_burned} cal on {a.date}</li>
              ))}
            </ul>
          </>
        )}
        <div style={{marginTop: 10}}>{message}</div>
      </header>
    </div>
  );
}

export default App;
