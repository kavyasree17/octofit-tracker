import { useEffect, useState } from 'react'
import { fetchRecords } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/'
  useEffect(() => { fetchRecords(usersEndpoint).then(setUsers).catch((loadError) => setError(loadError.message)) }, [usersEndpoint])
  return <section className="page-section"><div className="section-heading"><div><p className="kicker">THE COMMUNITY</p><h2>Members</h2></div><span className="date-badge">{users.length} registered</span></div>{error && <div className="alert alert-warning">{error}</div>}<div className="table-panel member-panel">{users.map((user) => <div className="member-row" key={user._id}><span className="avatar">{user.username?.slice(0, 2).toUpperCase()}</span><div className="row-main"><strong>{user.username}</strong><small>{user.email}</small></div><span className="profile-note">{user.profile || 'Ready to move'}</span></div>)}{!users.length && !error && <p className="empty-state">No members available yet.</p>}</div></section>
}
export default Users