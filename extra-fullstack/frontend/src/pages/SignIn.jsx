import { useSignInForm } from '../hooks/useSignInForm.jsx';

import styles from "./SignIn.module.css"

export default function SignInPage() {
    const { values, errors, success, handleChange, handleSubmit } = useSignInForm();

    return (
        <main className={styles.signInPage}>
            <header className={styles.header}>
                <h1 className={styles.title}>Iniciar Sesión</h1>
                <p className={styles.paragraph}>Inicia sesión para encontrar tu próxima oportunidad laboral.</p>
            </header>
            <div className={styles.card}>
                <form className={styles.form} onSubmit={handleSubmit} onChange={handleChange}>
                    <div className={styles.inputGroup}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" />
                            <path d="M3 7l9 6l9 -6" />
                        </svg>
                        <input type="text" name="email" id="email" placeholder="Correo electrónico" />
                    </div>
                    {errors.email && <p className={styles.error}>{errors.email}</p>}

                    <div className={styles.inputGroup}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6" />
                            <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                            <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
                        </svg>
                        <input type="password" name="password" id="password" placeholder="Contraseña" />
                        <button type="button" className={styles.showPasswordButton}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                            </svg>
                        </button>
                    </div>

                    {errors.password && <p className={styles.error}>{errors.password}</p>}
                    {success && <p className={styles.successMessage}>¡Inicio de sesión exitoso!</p>}

                    <div className={styles.row}>
                        <div className={styles.checkboxGroup}>
                            <input type="checkbox" id="remember" className={styles.checkbox} />
                            <label htmlFor="remember">Recuérdame</label>
                        </div>
                        <a href="#" className={styles.forgotPassword}>Olvidaste tu contraseña?</a>
                    </div>

                    <button type="submit" className={styles.buttonSignIn}>Iniciar Sesión</button>

                    <div className={styles.divider}>No tienes una cuenta?</div>

                    <div className={styles.signUpGroup}>
                        <button type="button" className={styles.signUp}>Registrate como desarrollador</button>
                        <button type="button" className={styles.signUp}>Registrate como empleador o compañía</button>
                    </div>
                </form>
            </div>
        </main>
    )
}