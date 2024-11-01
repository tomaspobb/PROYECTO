// components/NavBar.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  const handleLogout = () => {
    // Eliminar autenticación y redirigir al usuario
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    router.push('/'); // Redirigir a la página principal después de cerrar sesión
  };

  const handleReservationsClick = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      router.push('/reservas');
    } else {
      router.push({
        pathname: '/login',
        query: { redirect: 'reservas' },
      });
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-light ${styles.navbar}`}>
      <div className="container">
        <Link href="/" className="navbar-brand">Nombre del Restaurante</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link href="/" className="nav-link">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link href="/menu" className="nav-link">Menú</Link>
            </li>
            <li className="nav-item">
              <a href="/reservas" className="nav-link" onClick={handleReservationsClick}>Reservas</a>
            </li>
            <li className="nav-item">
              <Link href="/contacto" className="nav-link">Contacto</Link>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                  Cerrar Sesión
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
