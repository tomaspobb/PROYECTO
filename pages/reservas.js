import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';

const Reservas = () => {
  const router = useRouter();

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    if (!isAuthenticated) {
      // Redirigir al inicio de sesión si no está autenticado
      router.push('/login');
    }
  }, [router]);

  return (
    <div>
      <Head>
        <title>Sapori di Italia - Reservas</title>
        <meta name="description" content="Reserva tu mesa en Sapori di Italia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container py-5">
        <h1 className="text-center mb-5" style={{ color: 'var(--primary-color)' }}>Reservas</h1>
        <p className="text-center">Realiza tu reserva y disfruta de la mejor experiencia italiana.</p>
        <form className="mx-auto" style={{ maxWidth: '400px' }}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre</label>
            <input type="text" className="form-control" id="name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input type="email" className="form-control" id="email" required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Reservar</button>
        </form>
      </main>

      <footer className="text-center py-4 bg-dark text-light">
        <p>© {new Date().getFullYear()} Restaurante Sapori di Italia. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Reservas;
