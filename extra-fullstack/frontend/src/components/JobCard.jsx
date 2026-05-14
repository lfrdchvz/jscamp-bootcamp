import { Link } from "./Link.jsx"
import { FavoriteButton } from '../components/FavoriteButton.jsx'
import { ApplyButton } from '../components/ApplyButton.jsx'
import styles from './JobCard.module.css';

export function JobCard({ job }) {
    const { title, company, location, description, data } = job;

    return (
        <li className={styles.jobListingCard} data-modalidad={data.modality} data-nivel={data.level} data-technology={data.technology?.join(',')} >
            <article className={styles.articleCard}>
                <div className={styles.jobInfo}>
                    <h3>
                        <Link className={styles.link} href={`/jobs/${job.id}`} rel="noopener noreferrer" aria-label={`Ver detalles del trabajo ${title} en ${company}`}>
                            {title}
                        </Link>
                    </h3>
                    <small>{company} | {location}</small>
                    <p>{description}</p>
                    <span className='tag'>Tecnologias: {data.technology?.join(', ')}</span>
                    <span className='tag'>Nivel: {data.level}</span>
                </div>
                <div className={styles.actions}>
                    <ApplyButton />
                    <div className={styles.actionsBottom}>
                        <Link className={styles.details} href={`/jobs/${job.id}`} aria-label={`Ver detalles del trabajo ${title} en ${company}`}>
                            Detalles
                        </Link>
                        <FavoriteButton jobId={job.id} />
                    </div>
                </div>
            </article>
        </li>
    )
}