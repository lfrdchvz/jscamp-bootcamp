import { useNavigate, useLocation, useSearchParams } from "react-router";

export function useRouter() {

    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    function navigateTo(path) {
        navigate(path);
    }

    function handleSearch(event, inputName = 'search') {
        event.preventDefault();
        const formData = new FormData(event.target);
        const searchTerm = formData.get(inputName);

        const url = searchTerm 
            ? `/search?text=${encodeURIComponent(searchTerm)}` 
            : '/search';

        navigateTo(url);
        event.target.reset();
    }

    return { 
        currentPath: location.pathname, 
        searchParams, 
        navigateTo, 
        handleSearch 
    };
}