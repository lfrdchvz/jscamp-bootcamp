import { useId, useState } from 'react';
import styles from './SearchFormSection.module.css';
import { useSearchForm } from '../hooks/useSearchForm.jsx';

export function SearchFormSection({ onSearch, onTextFilter, hasActiveFilters, onClearFilters, filtersKey, currentFilters }) {
    const idSearchText = useId();
    const idTechnology = useId();
    const idLocation = useId();
    const idExperienceLevel = useId();

    const [isInputFocused, setIsInputFocused] = useState(false);

    const { handleChange, handleTextChange, handleClearInputs, inputRef } = useSearchForm({
        idTechnology,
        idExperienceLevel,
        idLocation,
        onSearch,
        onTextFilter,
    });

    return (
        <section className={styles.section}>
            <h1 className={styles.title}>Encuentra tu proximo trabajo</h1>
            <p className={styles.textParagraph}>Explora miles de oportunidades en el sector tecnológico</p>
            <form id="search-form" className={styles.searchForm} role="search" onChange={handleChange}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                    <path d="M21 21l-6 -6" />
                </svg>
                <input
                    id='empleos-search-input'
                    name={idSearchText}
                    ref={inputRef}
                    type="text"
                    placeholder="Buscar trabajos, empresas o habilidades"
                    onChange={handleTextChange}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    className={isInputFocused ? styles.inputFocused : ''}
                />
                <button type="button" className={styles.clearButton} onClick={handleClearInputs}>
                    <svg className={styles.clear} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M18 6l-12 12" />
                        <path d="M6 6l12 12" />
                    </svg>
                </button>
            </form>

            <div className={styles.filters} key={filtersKey}>
                <select 
                    form="search-form" 
                    name={idTechnology} 
                    value={currentFilters.technology}
                    onChange={handleChange}
                >
                    <option value="">Tecnología</option>
                    <option value="react">React</option>
                    <option value="node">Node.js</option>
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="vue">Vue</option>
                    <option value="angular">Angular</option>
                    <option value="docker">Docker</option>
                    <option value="kubernetes">Kubernetes</option>
                    <option value="aws">AWS</option>
                </select>

                <select 
                    form="search-form" 
                    name={idExperienceLevel} 
                    value={currentFilters.experienceLevel}
                    onChange={handleChange}
                >
                    <option value="">Nivel de experiencia</option>
                    <option value="junior">Junior</option>
                    <option value="mid-level">Mid-level</option>
                    <option value="mid">Mid</option>
                    <option value="senior">Senior</option>
                </select>

                <select 
                    form="search-form" 
                    name={idLocation} 
                    value={currentFilters.location}
                    onChange={handleChange}
                >
                    <option value="">Todas las ubicaciones</option>
                    <option value="remoto">Remoto</option>
                    <option value="madrid">Madrid</option>
                    <option value="barcelona">Barcelona</option>
                    <option value="valencia">Valencia</option>
                    <option value="ciudad-de-mexico">Ciudad de México</option>
                    <option value="monterrey">Monterrey</option>
                    <option value="guadalajara">Guadalajara</option>
                    <option value="bogota">Bogotá</option>
                    <option value="buenos aires">Buenos Aires</option>
                    <option value="lima">Lima</option>
                </select>

                {hasActiveFilters && (
                    <button type="button" onClick={onClearFilters}>
                        Limpiar filtros
                    </button>
                )}
            </div>
        </section>
    )
}