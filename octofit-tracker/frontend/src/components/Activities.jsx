import { useEffect, useState } from 'react'
import { fetchRecords } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchRecords('activities').then(setActivities).catch((loadError) => setError(loadError.message))
  }, [])

  const totalMinutes = activities.reduce((sum, activity) => sum + (activity.durationMinutes || 0), 0)
  const totalPoints = activities.reduce((sum, activity) => sum + (activity.points || 0), 0)

  return <section className="page-section">
    <div className="section-heading"><div><p className="kicker">ACTIVITY LOG</p><h2>Recent movement</h2></div><span className="date-badge">This week</span></div>
    {error && <div className="alert alert-warning">{error}</div>}
    <div className="metric-row"><div className="metric-card accent"><span>Minutes logged</span><strong>{totalMinutes}</strong><small>Across all activities</small></div><div className="metric-card"><span>Points earned</span><strong>{totalPoints}</strong><small>Keep the streak moving</small></div><div className="metric-card"><span>Sessions</span><strong>{activities.length}</strong><small>Completed workouts</small></div></div>
    <div className="table-panel"><div className="panel-title"><h3>Latest sessions</h3><span>{activities.length} records</span></div><div className="activity-list">
      {activities.map((activity) => <div className="activity-row" key={activity._id}><span className="activity-mark">{activity.type?.charAt(0) || 'A'}</span><div className="row-main"><strong>{activity.type}</strong><small>{activity.durationMinutes} min session</small></div><span className="points">+{activity.points} pts</span></div>)}
      {!activities.length && !error && <p className="empty-state">No activities logged yet.</p>}
    </div></div>
  </section>
}

export default Activities