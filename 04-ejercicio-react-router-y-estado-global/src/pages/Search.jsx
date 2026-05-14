import { useFilters } from "../hooks/useFilters.jsx"
import { SearchFormSection } from "../components/SearchFormSection.jsx"
import { JobListings } from "../components/JobListings.jsx"
import { Pagination } from "../components/Pagination.jsx"

export default function SearchPage() {
    const {
        loading,
        error,
        jobs,
        total,
        totalPages,
        currentPage,
        hasActiveFilters,
        handlePageChange,
        handleSearch,
        handleTextFilter,
        handleClearFilters,
        filtersKey,
        filters
    } = useFilters();

    const title = loading ? 'Cargando...' : `Resultados: ${total}, pagina ${currentPage} - DevJobs`;

    return (
        <main>
            <title>{title}</title>
            <SearchFormSection 
                onSearch={handleSearch} 
                onTextFilter={handleTextFilter}
                hasActiveFilters={hasActiveFilters}
                onClearFilters={handleClearFilters}
                filtersKey={filtersKey}
                currentFilters={filters}
            />
            <JobListings 
                jobs={jobs} 
                loading={loading} 
                error={error}
            />
            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
            />
        </main>
    )
}