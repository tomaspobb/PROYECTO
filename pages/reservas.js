import Head from 'next/head';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

const Reservas = () => {
  return (
    <div>
      <Head>
        <title>Sapori di Italia - Reservas</title>
        <meta name="description" content="Reserva tu mesa en Sapori di Italia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar Oscura */}
      <header className="navbar navbar-expand-lg navbar-dark bg-dark container-fluid">
        <div className="container">
          <Link href="/" className="navbar-brand fw-bold text-uppercase">Sapori di Italia</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link href="/" className="nav-link">Inicio</Link></li>
              <li className="nav-item"><Link href="/menu" className="nav-link">Menú</Link></li>
              <li className="nav-item"><Link href="/contacto" className="nav-link">Contacto</Link></li>
            </ul>
          </div>
        </div>
      </header>

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
