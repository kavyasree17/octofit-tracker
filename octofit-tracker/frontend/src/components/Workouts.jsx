import { useEffect, useState } from 'react'
import { fetchRecords } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchRecords('workouts').then(setWorkouts).catch((loadError) => setError(loadError.message)) }, [])
  return <section className="page-section"><div className="section-heading"><div><p className="kicker">TRAINING LIBRARY</p><h2>Find your focus</h2></div><span className="date-badge">{workouts.length} sessions</span></div>{error && <div className="alert alert-warning">{error}</div>}<div className="workout-list">{workouts.map((workout) => <article className="workout-row" key={workout._id}><div className="workout-index">{String(workouts.indexOf(workout) + 1).padStart(2, '0')}</div><div className="row-main"><span className="workout-tag">{workout.difficulty}</span><h3>{workout.name}</h3><p>{workout.description}</p></div><div className="workout-meta"><strong>{workout.durationMinutes}</strong><small>MIN</small><span>{workout.target}</span></div></article>)}{!workouts.length && !error && <p className="empty-state">No workouts available yet.</p>}</div></section>
}
export default Workouts