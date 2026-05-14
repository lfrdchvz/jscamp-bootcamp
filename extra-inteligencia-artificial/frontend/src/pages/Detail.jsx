import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import snarkdown from 'snarkdown'
import { Streamdown } from 'streamdown'

import { Link } from '../components/Link.jsx'
import { Spinner } from '../components/Spinner.jsx'
import { FavoriteButton } from '../components/FavoriteButton.jsx'
import { ApplyButton } from '../components/ApplyButton.jsx'
import { useAuthStore } from '../store/authStore.js'
import styles from './Detail.module.css'
import { use } from 'react'
import { useAISummary } from '../hooks/useAISummary.jsx'

const API_URL = import.meta.env.VITE_API_URL

function JobSection({ title, content }) {
    const html = snarkdown(content)

    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{title}</h2>
            <div 
                className={`${styles.sectionContent} prose`}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </section>
    )
}

function AISummary ({jobId}){

    const { isLoggedIn } = useAuthStore()

    const { summary, loading, generateSummary } = useAISummary(jobId)

    if(summary){
        return(
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Resumen generado por IA</h2>
                <div className={`${styles.sectionContent} prose`}>
                        <Streamdown isAnimating={loading}>
                            {summary}
                        </Streamdown>
                </div>
            </section>
        )
    }

    return (
        <button className={styles.aiButton} onClick={generateSummary} disabled={loading || !isLoggedIn}title={!isLoggedIn ? 'Genera un resumen' : ''}>
            {!isLoggedIn ? 'Inicia sesión para generar resumen con IA' : loading ? 'Generando resumen...' : 'Generar resumen con IA'}
        </button>
    )
}

export default function DetailPage() {
    const { jobId } = useParams() 
    const navigate = useNavigate()
    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        // fetch(`https://jscamp-api.vercel.app/api/jobs/${jobId}`)
        fetch(`${API_URL}/jobs/${jobId}`)
            .then(response => {
                if (!response.ok) throw new Error('Error al cargar la oferta de empleo')
                return response.json()
            })
            .then(json => setJob(json))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [jobId])
    
    if (loading) return <Spinner />

    if (error || !job) {
        return (
            <div className={styles.centerWrapper}>
                <div className={styles.error}>
                    <h2 className={styles.errorTitle}>Oferta no encontrada</h2>
                    <button onClick={() => navigate('/')} className={styles.errorButton}>
                        Volver al inicio
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.centerWrapper}>

            <nav className={styles.breadcrumb}>
                <Link href="/search">Empleos</Link>
                <span className={styles.breadcrumbSeparator}>›</span>
                <span className={styles.breadcrumbCurrent}>{job.titulo}</span>
            </nav>

            <div className={styles.jobHeader}>
                <div>
                    <h1 className={styles.title}>{job.titulo}</h1>
                    <p className={styles.meta}>{job.empresa} · {job.ubicacion}</p>
                </div>
                <div className={styles.jobActions}>
                    <ApplyButton />
                    <FavoriteButton jobId={job.id} />
                </div>
            </div>

            <AISummary jobId={job.id} />
            <JobSection title="Descripción del puesto" content={job.content.description} />
            <JobSection title="Responsabilidades" content={job.content.responsibilities} />
            <JobSection title="Requisitos" content={job.content.requirements} />
            <JobSection title="Acerca de la empresa" content={job.content.about} />

            <ApplyButton />

        </div>
    )
}