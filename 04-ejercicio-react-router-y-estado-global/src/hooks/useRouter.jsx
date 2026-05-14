// import { useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router";

export function useRouter() {

  const navigate = useNavigate();
  const location = useLocation();
  // Podemos usar el hook de `useSearchParams
  const [searchParams] = useSearchParams();
  // const [searchParams, setSearchParams] = useState(
  //   new URLSearchParams(location.search)
  // );

  function navigateTo(path) {
    navigate(path);
  };

  // Ojo con esto! Si lo usamos en otro componente que no sea el Home, podríamos estar rompiendo la navegación, no necesariamente queremos ir a /search
  // Además, damos por hecho que el input se llama "search", lo cual puede no ser siempre cierto
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