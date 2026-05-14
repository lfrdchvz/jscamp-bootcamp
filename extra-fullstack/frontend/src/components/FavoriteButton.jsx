import { useFavoritesStore } from "../store/favoritesStore.js"
import { useAuthStore } from "../store/authStore.js"
import styles from './FavoriteButton.module.css'

export function FavoriteButton({ jobId }) {
    const { isLoggedIn } = useAuthStore()
    const { toggleFavorite, isFavorite } = useFavoritesStore()

    return (
        <span
            role="button"
            tabIndex={isLoggedIn ? 0 : -1}
            className={`${styles.favoriteButton} ${isFavorite(jobId) ? styles.favoriteButtonActive : ''}`}
            onClick={() => isLoggedIn && toggleFavorite(jobId)}
            aria-label={isFavorite(jobId) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            aria-disabled={!isLoggedIn}
        >
            {isFavorite(jobId)
                ? <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" /></svg>
                : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 20l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.96 6.053" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>
            }
        </span>
    )
}