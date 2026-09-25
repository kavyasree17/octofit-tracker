import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  const navigation = [
    { to: '/', label: 'Overview', icon: 'O', end: true },
    { to: '/activities', label: 'Activities', icon: 'A' },
    { to: '/leaderboard', label: 'Leaderboard', icon: 'L' },
    { to: '/teams', label: 'Teams', icon: 'T' },
    { to: '/users', label: 'Members', icon: 'M' },
    { to: '/workouts', label: 'Workouts', icon: 'W' },
  ]

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <img className="brand-mark" src="/octofitapp-small.png" alt="Octofit" />
          <div>
            <strong>Octofit</strong>
            <span>TRACKER</span>
          </div>
        </div>
        <p className="eyebrow">Your movement, measured</p>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className="nav-link">
              <span className="nav-icon" aria-hidden="true">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span className="status-dot" /> API connected
        </div>
      </aside>
      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="kicker">SATURDAY / SEPTEMBER 25, 2026</p>
            <h1>Make your next move count.</h1>
          </div>
          <div className="profile-chip">
            <span className="avatar">MC</span>
            <span><strong>Maya Chen</strong><small>Trail runner</small></span>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Activities />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
