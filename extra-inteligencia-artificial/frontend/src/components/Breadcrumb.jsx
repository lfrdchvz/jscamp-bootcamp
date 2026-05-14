import { useRouter } from '../hooks/useRouter.jsx';
import { Link } from './Link.jsx';
import styles from './Breadcrumb.module.css';

const routeNames = {
    '/': 'Inicio',
    '/search': 'Empleos',
    '/signin': 'Iniciar Sesión'
}

export function Breadcrumb() {
    const { currentPath } = useRouter();


    return (
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <ol className={styles.list}>
                {currentPath !== '/' && (
                    <>
                        <li className={styles.item}>
                            <Link href="/">Inicio</Link>
                        </li>
                        <li className={styles.separator}>›</li>
                    </>
                )}
                <li className={styles.item} aria-current="page">
                    {routeNames[currentPath] ?? 'Página no encontrada'}
                </li>
            </ol>
        </nav>
    )
}