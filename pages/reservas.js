// pages/reservas.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import NavBar from '../components/NavBar';

const Reservas = () => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      router.push({
        pathname: '/login',
        query: { redirect: 'reservas' },
      });
    }
  }, []);

  return (
    <div>
      <NavBar /> {/* Renderiza la barra de navegación aquí */}
      <h1>Reservas</h1>
      <p>Bienvenido a la página de reservas. Solo los usuarios autenticados pueden ver esta página.</p>
    </div>
  );
};

export default Reservas;
