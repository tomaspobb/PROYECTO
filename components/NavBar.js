// components/NavBar.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const NavBar = () => {
  const router = useRouter();
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
          Sapori di Italia
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/" className="nav-link">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link href="/menu" className="nav-link">Menú</Link>
            </li>
            <li className="nav-item">
              <Link href="/contacto" className="nav-link">Contacto</Link>
            </li>
            {isAuthenticated ? (
              <li className="nav-item">
                <button className="nav-link btn btn-link text-warning" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                  Cerrar Sesión
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link href="/login" className="nav-link text-info">Iniciar Sesión</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
