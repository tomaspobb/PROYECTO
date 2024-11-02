// components/NavBar.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'next-i18next';

const NavBar = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { isAuthenticated, username, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
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
                  onClick={logout}
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
          <div className="d-flex align-items-center ms-3">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

