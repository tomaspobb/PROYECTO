// components/LanguageSelector.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const LanguageSelector = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Cargar el idioma preferido desde localStorage al cargar el componente
    const preferredLanguage = localStorage.getItem('preferredLanguage');
    if (preferredLanguage && preferredLanguage !== router.locale) {
      router.push({ pathname, query }, asPath, { locale: preferredLanguage });
    }
  }, [router]);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const changeLanguage = (locale) => {
    router.push({ pathname, query }, asPath, { locale });
    localStorage.setItem('preferredLanguage', locale); // Guardar el idioma en localStorage
    setShowDropdown(false);
  };

  return (
    <div className="position-relative">
      <button
        onClick={toggleDropdown}
        className="btn btn-secondary"
        aria-expanded={showDropdown}
      >
        {router.locale === 'es' ? 'Español' : 'English'}
      </button>

      {showDropdown && (
        <ul className="list-unstyled position-absolute bg-light border mt-2" style={{ zIndex: 1000 }}>
          <li>
            <button className="dropdown-item" onClick={() => changeLanguage('es')}>
              Español
            </button>
          </li>
          <li>
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
