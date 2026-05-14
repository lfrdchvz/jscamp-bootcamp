import styles from './Pagination.module.css';

export function Pagination({ currentPage = 1, totalPages = 5, onPageChange }) {

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    const handlePrevClick = (event) => {
        event.preventDefault();
        if (!isFirstPage) {
            onPageChange(currentPage - 1);
        }
    }

    const handleNextClick = (event) => {
        event.preventDefault();
        if (!isLastPage) {
            onPageChange(currentPage + 1);
        }
    }

    const handlePageClick = (event, page) => {
        event.preventDefault();
        if (page !== currentPage) {
            onPageChange(page);
        }
    }

    const handleFirstPageClick = (event) => {
        event.preventDefault();
        if (!isFirstPage) {
            onPageChange(1);
        }
    }

    const handleLastPageClick = (event) => {
        event.preventDefault();
        if (!isLastPage) {
            onPageChange(totalPages);
        }
    }

    const buildingPageUrl = (page) => {
        const url = new URL(window.location);
        url.searchParams.set('page', page);
        return `${url.pathname}?${url.searchParams.toString()}`;
    }


    return (
        <nav className= {styles.pagination}>

            <a href="#" title="Ir a la primera página" aria-label="Ir a la primera página" onClick={handleFirstPageClick} className={isFirstPage ? styles.paginationDisabled : ''}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left-pipe">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M7 6v12" /><path d="M18 6l-6 6l6 6" />
                </svg>
            </a>
            <a href={buildingPageUrl(currentPage - 1)} title="Ir a la página anterior" aria-label="Ir a la página anterior" onClick={handlePrevClick} className={isFirstPage ? styles.paginationDisabled : ''}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M15 6l-6 6l6 6" />
                </svg>
            </a>

            {pages.map(page => (
                <a href={buildingPageUrl(page)} key={page} className={page === currentPage ? styles.isActive : '' } onClick={(event) => handlePageClick(event, page) }>
                    {page}
                </a>
            ))}

            <a href={buildingPageUrl(currentPage + 1)} title="Ir a la página siguiente" aria-label="Ir a la página siguiente" onClick={handleNextClick} className={isLastPage ? styles.paginationDisabled : ''}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 6l6 6l-6 6" />
                </svg>
            </a>
            <a href="#" title="Ir a la última página" aria-label="Ir a la última página" onClick={handleLastPageClick} className={isLastPage ? styles.paginationDisabled : ''}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right-pipe">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M6 6l6 6l-6 6" /><path d="M17 5v13" />
                </svg>
            </a>

        </nav>
    )
}
