import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import UserAuthentication from './components/user-authentication/UserAuthentication';
import Dashboard from './components/dashboard/Dashboard';
import Backlog from './components/backlog/Backlog';
import UserActivation from './components/user-authentication/UserActivation';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
            <div><Link to="/">SignUp</Link></div>
            <div><Link to="/backlog">Backlog</Link></div>
            <div><Link to="/dashboard">Dashboard</Link></div>
        </nav>
        <Routes>
        <Route path="/" Component={UserAuthentication}/>
        <Route path="/dashboard" Component={Dashboard}/>
        <Route path="/backlog" Component={Backlog}/>
        <Route path="/activate" Component={UserActivation} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
