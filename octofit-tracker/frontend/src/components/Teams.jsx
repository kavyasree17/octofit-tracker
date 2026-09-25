import { useEffect, useState } from 'react'
import { fetchRecords } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/'
  useEffect(() => { fetchRecords(teamsEndpoint).then(setTeams).catch((loadError) => setError(loadError.message)) }, [teamsEndpoint])
  return <section className="page-section"><div className="section-heading"><div><p className="kicker">COLLECTIVE ENERGY</p><h2>Your teams</h2></div><span className="date-badge">{teams.length} active teams</span></div>{error && <div className="alert alert-warning">{error}</div>}<div className="card-grid">{teams.map((team) => <article className="info-card" key={team._id}><div className="card-topline"><span className="team-symbol">{team.name?.slice(0, 1)}</span><span className="pill">ACTIVE</span></div><h3>{team.name}</h3><p>{team.description}</p><div className="card-footer"><span>{team.memberIds?.length || 0} members</span><span className="arrow">-&gt;</span></div></article>)}{!teams.length && !error && <p className="empty-state">No teams available yet.</p>}</div></section>
}
export default Teams