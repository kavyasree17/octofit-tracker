import { useEffect, useState } from 'react'
import { fetchRecords } from '../api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchRecords('leaderboard').then(setEntries).catch((loadError) => setError(loadError.message)) }, [])
  return <section className="page-section"><div className="section-heading"><div><p className="kicker">TEAM MOMENTUM</p><h2>Leaderboard</h2></div><span className="date-badge">September standings</span></div>{error && <div className="alert alert-warning">{error}</div>}<div className="table-panel ranking-panel"><div className="panel-title"><h3>Top performers</h3><span>Points this month</span></div>{entries.map((entry, index) => { const user = typeof entry.userId === 'object' ? entry.userId : {}; return <div className="rank-row" key={entry._id}><span className="rank-number">{index + 1}</span><span className="avatar small">{user.username?.slice(0, 2).toUpperCase() || 'OF'}</span><div className="row-main"><strong>{user.username || entry.userId || 'Octofit member'}</strong><small>{index === 0 ? 'Leading the pack' : 'Strong momentum'}</small></div><strong className="rank-points">{entry.points} <small>pts</small></strong></div>})}{!entries.length && !error && <p className="empty-state">No rankings available yet.</p>}</div></section>
}
export default Leaderboard