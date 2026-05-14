import { NavLink } from 'react-router';

import { useSignUpForm } from '../hooks/useSignUpForm.jsx';
import styles from "./SignIn.module.css"

export default function SignUpPage() {
    const { values, errors, success, handleChange, handleSubmit } = useSignUpForm();

    return (
        <main className={styles.signInPage}>
            <header className={styles.header}>
                <h1 className={styles.title}>Crear cuenta</h1>
                <p className={styles.paragraph}>Crea tu cuenta para encontrar tu próxima oportunidad laboral.</p>
            </header>
            <div className={styles.card}>
                <form className={styles.form} onSubmit={handleSubmit} onChange={handleChange}>

                    <div className={styles.inputGroup}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                        </svg>
                        <input type="text" name="fullName" id="fullName" placeholder="Nombre completo" />
                    </div>
                    {errors.fullName && <p className={styles.error}>{errors.fullName}</p>}

                    <div className={styles.inputGroup}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                        </svg>
                        <input type="tel" name="phone" id="phone" placeholder="Número de teléfono" />
                    </div>
                    {errors.phone && <p className={styles.error}>{errors.phone}</p>}

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

                    {success && <p className={styles.successMessage}>¡Cuenta creada exitosamente!</p>}

                    <button type="submit" className={styles.buttonSignIn}>Crear cuenta</button>

                    <div className={styles.divider}>¿Ya tienes una cuenta?</div>

                    <div className={styles.signUpGroup}>
                        <NavLink to="/signin">
                            <button type="button" className={styles.signUp}>Iniciar Sesión</button>
                        </NavLink>
                    </div>
                </form>
            </div>
        </main>
    )
}