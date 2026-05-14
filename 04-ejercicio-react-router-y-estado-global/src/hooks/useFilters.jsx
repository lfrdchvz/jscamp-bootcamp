import { useState, useEffect } from "react"
import { useSearchParams } from "react-router"

const RESULTS_PER_PAGE = 4;

const INITIAL_FILTERS = {
    technology: '',
    location: '',
    experienceLevel: ''
};

export function useFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [filters, setFilters] = useState(() => {

        const localStorageSavedFilters = localStorage.getItem('jobFilters');
        if (localStorageSavedFilters) {
            return JSON.parse(localStorageSavedFilters);
        }

        return {
            technology: searchParams.get('technology') || '',
            location: searchParams.get('type') || '',
            experienceLevel: searchParams.get('level') || ''
        } 
    });

    const [textToFilter, setTextToFilter] = useState(() => {
        return searchParams.get('text') || '';
    });

    const [currentPage, setCurrentPage] = useState(() => {
        const parsedNumber = Number(searchParams.get('page'))
        if(parsedNumber < 1) return 1
        return Number.isNaN(parsedNumber) ? 1 : parsedNumber
    });

    const [jobs, setJobs] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filtersKey, setFiltersKey] = useState(0);

    const hasActiveFilters = Object.values(filters).some(value => value !== '') || textToFilter !== '';

    useEffect(() => {
        const technologyFromUrl = searchParams.get('technology') ?? '';
        const locationFromUrl = searchParams.get('type') ?? '';
        const experienceLevelFromUrl = searchParams.get('level') ?? '';
        const pageFromUrl = Number(searchParams.get('page')) || 1;
        const textFromUrl = searchParams.get('text') ?? '';

        setFilters({
            technology: technologyFromUrl,
            location: locationFromUrl,
            experienceLevel: experienceLevelFromUrl
        });
        setTextToFilter(textFromUrl);
        setCurrentPage(pageFromUrl);
    }, [searchParams]);

    useEffect(() => {
        localStorage.setItem('jobFilters', JSON.stringify(filters));
    }, [filters]);

    const handleClearFilters = () => {
        setFilters(INITIAL_FILTERS);
        setTextToFilter('');
        setCurrentPage(1);
        setFiltersKey(prev => prev + 1);
        localStorage.removeItem('jobFilters');
        setSearchParams(new URLSearchParams());
    }

    useEffect(() => {
        async function fetchJobs() {
            try {
                setError(null);
                setLoading(true);

                const params = new URLSearchParams();
                if (textToFilter) params.set('text', textToFilter);
                if (filters.technology) params.set('technology', filters.technology);
                if (filters.location) params.set('type', filters.location);
                if (filters.experienceLevel) params.set('level', filters.experienceLevel);
                params.set('limit', RESULTS_PER_PAGE);
                params.set('offset', (currentPage - 1) * RESULTS_PER_PAGE);
                params.set('page', currentPage);

                setSearchParams(params);

                const queryParams = params.toString();
                const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`);

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: No se pudo obtener los empleos`);
                }

                const json = await response.json();
                setJobs(json.data);
                setTotal(json.total);
            } catch (error) {
                if (!navigator.onLine) {
                    setError('No tienes conexión a internet. Verifica tu conexión e intenta de nuevo.');
                } else {
                    setError(error.message || 'Ocurrió un error inesperado. Intenta de nuevo.');
                }
            } finally {
                setLoading(false);
            }
        }
        fetchJobs();
    }, [filters, textToFilter, currentPage]);

    const totalPages = Math.ceil(total / RESULTS_PER_PAGE);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleSearch = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
    }

    const handleTextFilter = (newTextToFilter) => {
        setTextToFilter(newTextToFilter);
        setCurrentPage(1);
    }

    return {
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
    }
}