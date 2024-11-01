import { useState } from 'react';
import { useRouter } from 'next/router';

const LanguageSelector = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const changeLanguage = (locale) => {
    router.push({ pathname, query }, asPath, { locale });
    setShowDropdown(false); // Cierra el menú después de seleccionar el idioma
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
