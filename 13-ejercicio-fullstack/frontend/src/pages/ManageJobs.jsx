import { useEffect, useState } from 'react'
import { Link } from '../components/Link.jsx'
import { Spinner } from '../components/Spinner.jsx'
import styles from './ManageJobs.module.css'

const API_URL = import.meta.env.VITE_API_URL

export default function ManageJobsPage() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_URL}/jobs?limit=100&offset=0`)
      .then(res => res.json())
      .then(json => setJobs(json.data))
      .catch(() => setError('Error al cargar los jobs'))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('¿Seguro que quieres eliminar este job?')) return
    await fetch(`${API_URL}/jobs/${id}`, { method: 'DELETE' })
    setJobs(jobs.filter(job => job.id !== id))
  }

  if (loading) return <Spinner />
  if (error) return <p>{error}</p>

  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <header className={styles.mainHeader}>
          <h1>Gestionar Jobs</h1>
          <Link href="/manage-jobs/new">
            <button className={styles.createButton}>+ Nuevo Job</button>
          </Link>
        </header>

        <ul className={styles.jobList}>
          {jobs.map(job => (
            <li key={job.id} className={styles.jobItem}>
              <div className={styles.jobInfo}>
                <h3>{job.title}</h3>
                <p>{job.company} · {job.location}</p>
                <div className={styles.tags}>
                  <span className='tag'>Nivel: {job.data.level}</span>
                  <span className='tag'>{job.data.modality}</span>
                </div>
              </div>
              <div className={styles.actions}>
                <Link href={`/manage-jobs/edit/${job.id}`}>
                  <button className={styles.editButton}>Editar</button>
                </Link>
                <button className={styles.deleteButton} onClick={() => handleDelete(job.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}