// components/NavBar.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'next-i18next';

const NavBar = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    router.push('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        {/* Logo o Nombre del Restaurante */}
        <Link href="/" className="navbar-brand fw-bold text-uppercase">
          {t('restaurantName')}
        </Link>

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

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/" className="nav-link">
                {t('home')}
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/menu" className="nav-link">
                {t('menu')}
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contacto" className="nav-link">
                {t('contact')}
              </Link>
            </li>
            {isAuthenticated ? (
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-warning"
                  onClick={handleLogout}
                  style={{ cursor: 'pointer' }}
                >
                  {t('logout')}
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link href="/login" className="nav-link text-info">
                  {t('login')}
                </Link>
              </li>
            )}
          </ul>
          {/* Selector de idioma */}
          <div className="d-flex align-items-center ms-3">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
