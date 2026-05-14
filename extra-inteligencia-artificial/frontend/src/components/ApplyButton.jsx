import { useState, useEffect } from 'react'
import { useAuthStore } from '../store/authStore.js'
import styles from './ApplyButton.module.css'

export function ApplyButton({ jobId }) {
    const { isLoggedIn } = useAuthStore()
    const [applied, setApplied] = useState(false)

    useEffect(() => {
        if (!isLoggedIn) setApplied(false)
    }, [isLoggedIn])

    return (
        <div className={styles.applyBottom}>
            <button
                className={`${styles.applyButton} ${applied ? styles.applyButtonApplied : ''}`}
                onClick={() => setApplied(true)}
                disabled={!isLoggedIn || applied}
            >
                {!isLoggedIn ? 'Inicia sesión' : applied ? 'Aplicado' : 'Aplicar'}
            </button>
        </div>
    )
}