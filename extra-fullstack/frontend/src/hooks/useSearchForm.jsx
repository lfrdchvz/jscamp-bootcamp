import { useRef } from "react";

export function useSearchForm({ idTechnology, idExperienceLevel, idLocation, onSearch, onTextFilter }) {

    const timeoutId = useRef(0);
    const inputRef = useRef();
    const handleChange = (event) => {
        if (event.target.type === 'text') return;
        const form = document.getElementById('search-form');
        const formData = new FormData(form);

        const filters = {
            technology: formData.get(idTechnology) || '',
            location: formData.get(idLocation) || '',
            experienceLevel: formData.get(idExperienceLevel) || ''
        }
        onSearch(filters);
    };

    const handleTextChange = (event) => {

        if (timeoutId.current) clearTimeout(timeoutId.current);

        timeoutId.current = setTimeout(() => {
            onTextFilter(event.target.value);
        }, 300);

    };

    const handleClearInputs = (event) => {
        event.preventDefault();
        inputRef.current.value = '';
        onTextFilter('');
    }

    return { handleChange, handleTextChange, handleClearInputs, inputRef };
}