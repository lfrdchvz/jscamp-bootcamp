import { Link } from "./Link.jsx"
import { FavoriteButton } from '../components/FavoriteButton.jsx'
import { ApplyButton } from '../components/ApplyButton.jsx'
import styles from './JobCard.module.css';

export function JobCard({ job }) {
    const { titulo, empresa, ubicacion, descripcion, data } = job;

    return (
        <li className={styles.jobListingCard} data-modalidad={data.modalidad} data-nivel={data.nivel} data-technology={data.technology?.join(',')} data-contrato={data.contrato}>
            <article className={styles.articleCard}>
                <div className={styles.jobInfo}>
                    <h3>
                        <Link className={styles.link} href={`/jobs/${job.id}`} rel="noopener noreferrer" aria-label={`Ver detalles del trabajo ${titulo} en ${empresa}`}>
                            {titulo}
                        </Link>
                    </h3>
                    <small>{empresa} | {ubicacion}</small>
                    <p>{descripcion}</p>
                    <span className='tag'>Tecnologias: {data.technology?.join(', ')}</span>
                    <span className='tag'>Nivel: {data.nivel}</span>
                </div>
                <div className={styles.actions}>
                    <ApplyButton />
                    <div className={styles.actionsBottom}>
                        <Link className={styles.details} href={`/jobs/${job.id}`} aria-label={`Ver detalles del trabajo ${titulo} en ${empresa}`}>
                            Detalles
                        </Link>
                        <FavoriteButton jobId={job.id} />
                    </div>
                </div>
            </article>
        </li>
    )
}