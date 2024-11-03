// components/LanguageSelector.js
// Importamos los módulos necesarios de React y Next.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const LanguageSelector = () => {
  // Hook de Next.js para gestionar la navegación y el idioma de la página
  const router = useRouter();
  // Extraemos el pathname, asPath y query de la ruta actual para facilitar el cambio de idioma
  const { pathname, asPath, query } = router;
  // Estado para controlar si el menú desplegable de selección de idioma está visible
  const [showDropdown, setShowDropdown] = useState(false);

  // useEffect para cargar el idioma preferido del usuario al cargar el componente
  useEffect(() => {
    // Obtenemos el idioma preferido desde localStorage
    const preferredLanguage = localStorage.getItem('preferredLanguage');
    // Si el idioma guardado no coincide con el actual, cambiamos al idioma preferido
    if (preferredLanguage && preferredLanguage !== router.locale) {
      router.push({ pathname, query }, asPath, { locale: preferredLanguage });
    }
  }, [router]);

  // Función para alternar la visibilidad del menú desplegable
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  // Función para cambiar el idioma
  const changeLanguage = (locale) => {
    // Navegamos a la misma ruta pero con el nuevo idioma
    router.push({ pathname, query }, asPath, { locale });
    // Guardamos el idioma seleccionado en localStorage
    localStorage.setItem('preferredLanguage', locale);
    // Ocultamos el menú desplegable después de seleccionar un idioma
    setShowDropdown(false);
  };

  return (
    <div className="position-relative">
      {/* Botón que muestra el idioma actual y abre/cierra el menú desplegable al hacer clic */}
      <button
        onClick={toggleDropdown}
        className="btn btn-secondary"
        aria-expanded={showDropdown}
      >
        {/* Muestra el idioma actual en el botón */}
        {router.locale === 'es' ? 'Español' : 'English'}
      </button>

      {/* Menú desplegable para seleccionar el idioma */}
      {showDropdown && (
        <ul className="list-unstyled position-absolute bg-light border mt-2" style={{ zIndex: 1000 }}>
          <li>
            {/* Opción para cambiar a Español */}
            <button className="dropdown-item" onClick={() => changeLanguage('es')}>
              Español
            </button>
          </li>
          <li>
            {/* Opción para cambiar a Inglés */}
            <button className="dropdown-item" onClick={() => changeLanguage('en')}>
              English
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
