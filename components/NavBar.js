// components/NavBar.js
// Importamos los módulos y componentes necesarios de Next.js y React
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'next-i18next';

const NavBar = () => {
  // Hook para obtener las traducciones del archivo de idioma 'common'
  const { t } = useTranslation('common');
  // Hook para manejar la navegación en la aplicación
  const router = useRouter();
  // Obtenemos el estado de autenticación y la función de logout del contexto de autenticación
  const { isAuthenticated, username, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        {/* Enlace al inicio con el nombre del restaurante traducido */}
        <Link href="/" className="navbar-brand fw-bold text-uppercase">
          {t('restaurantName')}
        </Link>

        {/* Botón que permite abrir y cerrar el menú en pantallas pequeñas */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenedor colapsable del menú de navegación */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Enlace a la página de inicio */}
            <li className="nav-item">
              <Link href="/" className="nav-link">
                {t('home')}
              </Link>
            </li>
            {/* Enlace a la página del menú */}
            <li className="nav-item">
              <Link href="/menu" className="nav-link">
                {t('menu')}
              </Link>
            </li>
            {/* Enlace a la página de contacto */}
            <li className="nav-item">
              <Link href="/contacto" className="nav-link">
                {t('contact')}
              </Link>
            </li>
            {/* Condicional para mostrar logout si el usuario está autenticado */}
            {isAuthenticated ? (
              <li className="nav-item">
                {/* Botón de cierre de sesión para usuarios autenticados */}
                <button
                  className="nav-link btn btn-link text-warning"
                  onClick={logout}
                  style={{ cursor: 'pointer' }}
                >
                  {t('logout')}
                </button>
              </li>
            ) : (
              <li className="nav-item">
                {/* Enlace a la página de login si el usuario no está autenticado */}
                <Link href="/login" className="nav-link text-info">
                  {t('login')}
                </Link>
              </li>
            )}
          </ul>
          {/* Selector de idioma para cambiar entre español e inglés */}
          <div className="d-flex align-items-center ms-3">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

