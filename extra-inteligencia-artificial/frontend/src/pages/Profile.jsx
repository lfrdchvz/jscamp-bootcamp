import styles from './Profile.module.css'

export default function ProfilePage() {
    return (
        <div className={styles.layout}>
            <main className={styles.main}>
                <header className={styles.mainHeader}>
                    <h1>Mi perfil</h1>
                    <p>Actualiza tu información personal y profesional</p>
                </header>

                <div className={styles.formWrapper}>

                    <section className={styles.section}>
                        <h2>Información personal</h2>
                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="nombre">Nombre</label>
                                <input className={styles.input} type="text" id="nombre" name="nombre" placeholder="Tu nombre" />
                            </div>
                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="email">Correo electrónico</label>
                                <input className={styles.input} type="email" id="email" name="email" placeholder="tu@email.com" />
                            </div>
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="ubicacion">Ubicación</label>
                            <input className={styles.input} type="text" id="ubicacion" name="ubicacion" placeholder="Ciudad, País" />
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="bio">Sobre mi</label>
                            <textarea className={styles.textarea} id="bio" name="bio" placeholder="Cuéntanos sobre ti..." rows={4} />
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2>Experiencia</h2>
                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="cargo">Cargo</label>
                                <input className={styles.input} type="text" id="cargo" name="cargo" placeholder="Tu cargo actual" />
                            </div>
                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="empresa">Empresa</label>
                                <input className={styles.input} type="text" id="empresa" name="empresa" placeholder="Empresa actual" />
                            </div>
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="anos">Años de experiencia</label>
                            <input className={styles.input} type="number" id="anos" name="anos" placeholder="0" min="0" max="50" />
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2>Habilidades</h2>
                        <div className={styles.skills}>
                            <span className='tag'>HTML</span>
                            <span className='tag'>JavaScript</span>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2>CV</h2>
                        <div className={styles.uploadArea}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 9l5 -5l5 5" /><path d="M12 4l0 12" /></svg>
                            <p className={styles.uploadText}>Sube tu CV o arrastra y suelta</p>
                            <p className={styles.uploadHint}>PDF, DOC, DOCX (max. 5MB)</p>
                        </div>
                    </section>

                    <div className={styles.formFooter}>
                        <button type="submit" className={styles.saveButton}>Guardar cambios</button>
                    </div>

                </div>
            </main>
        </div>
    )
}