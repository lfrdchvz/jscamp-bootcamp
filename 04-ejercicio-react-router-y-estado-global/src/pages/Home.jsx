// Las imagenes no se importan de esta manera
// import backgroundImg from '/public/background.avif'
import styles from './Home.module.css'

import { useRouter } from '../hooks/useRouter.jsx';

export default function HomePage() {

    const { handleSearch } = useRouter();

    return (
        <main>
            <section className={ styles.section }>
                {/* Las imagenes se importan de esta manera cuando estan en public */}
                <img className={ styles.sectionImg } src={'/background.webp'} alt="" />
                <h1 className={ styles.title }>Encuentra el trabajo de tus sueños</h1>
                <p className={ styles.textParagraph }>Únete a la comunidad más grande de desarrolladores y encuentra tu proxima oportunidad</p>
                <form className={ styles.searchForm } role="search" onSubmit={ handleSearch }>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                    <input 
                        name='search'
                        autoComplete="off"
                        type="text" 
                        placeholder="Buscar empleos por título, habilidad o empresa"
                    />
                    <button className={ styles.btnPrimary } type="submit">Buscar</button>
                </form>
            </section>
            <section className={ styles.whySection }>
                <header className={ styles.header }>
                    <h2 className={ styles.title }>¿Por qué DevJobs?</h2>
                    <p className={ styles.textParagraph }>DevJobs es la principal plataforma de búsqueda de empleo de desarrolladores. Conectamos a los mejores talentos con las empresas más innovadoras</p>
                </header>
                <footer className={ styles.footer }>
                    <article className={ styles.article }>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-briefcase-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9" /><path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" /></svg>
                        <h3>Encuentra el trabajo de tus sueños</h3>
                        <p>Busca miles de empleos de las mejores empresas de todo el mundo</p>
                    </article>
                    <article className={ styles.article }>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-users"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>
                        <h3>Conecta con las mejores empresas</h3>
                        <p>Conecta con empresas que estan contratando por tus habilidades</p>
                    </article>
                    <article className={ styles.article }>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-buildings"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 21v-15c0 -1 1 -2 2 -2h5c1 0 2 1 2 2v15" /><path d="M16 8h2c1 0 2 1 2 2v11" /><path d="M3 21h18" /><path d="M10 12v.01" /><path d="M10 16v.01" /><path d="M10 8v.01" /><path d="M7 12v.01" /><path d="M7 16v.01" /><path d="M7 8v.01" /><path d="M17 12v.01" /><path d="M17 16v.01" /></svg>
                        <h3>Obten el salario que te mereces</h3>
                        <p>Obten el salario que te mereces con nuestra calculadora de salarios</p>
                    </article>
                </footer>
            </section>
        </main>
    )
}