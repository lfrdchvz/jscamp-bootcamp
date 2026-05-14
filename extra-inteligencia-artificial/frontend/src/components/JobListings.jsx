import styles from './JobListings.module.css';
import { JobCard } from './JobCard.jsx'
import { Spinner } from './Spinner.jsx'

export function JobListings({ jobs, loading, error }) {

    if (loading) {
        return (
            <section className={styles.resultsJobs}>
                <h2 className={styles.title}>Resultados de búsqueda</h2>
                <Spinner />
            </section>
        )
    }

    if (error) {
        return (
            <section className={styles.resultsJobs}>
                <h2 className={styles.title}>Resultados de búsqueda</h2>
                <div className={styles.error}>
                    <h3>¡Algo salió mal!</h3>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()}>
                        Reintentar
                    </button>
                </div>
            </section>
        )
    }

    return (
        <section className={styles.resultsJobs}>
            <h2 className={styles.title}>Resultados de búsqueda</h2>
            {jobs.length === 0 ? (
                <div className={styles.noJobs}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5.039 5.062a7 7 0 0 0 9.91 9.89m1.584 -2.434a7 7 0 0 0 -9.038 -9.057" />
                        <path d="M3 3l18 18" />
                    </svg>
                    <h3>No encontramos resultados</h3>
                    <p>Intenta cambiar los filtros o buscar con otros términos</p>
                </div>
            ) : (
                <ul className={styles.jobsListings}>
                    {jobs.map(job => (
                        <JobCard key={job.id} job={job}/>
                    ))}
                </ul>
            )}
        </section>
    )
}