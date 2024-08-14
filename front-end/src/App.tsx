import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import UserAuthentication from './components/user-authentication/UserAuthentication';
import Dashboard from './components/dashboard/Dashboard';
import Backlog from './components/backlog/Backlog';
import UserActivation from './components/user-authentication/UserActivation';
import UserLogin from './components/user-authentication/UserLogin';
import Teams from './components/teams/Teams';
import TeamsCom from './components/teams/TeamComp';
function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    setLoggedIn(loggedIn)
  }, [loggedIn])

  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          {
            (!loggedIn) && <>
            <div><Link to="/">SignUp</Link></div>
            <div><Link to="/login">Login</Link></div>
            </>
            
          }

          {
            loggedIn && <>
              <div><Link to="/backlog">Backlog</Link></div>
              <div><Link to="/dashboard">Dashboard</Link></div>
              <div><Link to="/login" onClick={() => {
                setLoggedIn(false)

              }}>Logout</Link></div>
            </>
          }
        </nav>
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>} />

          <Route path="/backlog/:teamID" element={<Backlog />} />

          <Route path="/" element={<UserAuthentication />}/>
          <Route path='/login' element={<UserLogin setLoggedIn={(log: boolean) => setLoggedIn(log)}  />} />
          <Route path="/activate" element={<UserActivation/>} />
          <Route path="/team" element={<Teams />} />
          <Route path="/tasks/:teamID" element={<TeamsCom />}/>
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
