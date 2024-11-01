import Head from 'next/head';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

const Contacto = () => {
    return (
        <div>
            <Head>
                <title>Sapori di Italia - Contacto</title>
                <meta name="description" content="Contacto de Sapori di Italia" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Navbar Oscura */}
            <header className="bg-dark">
                <nav className="navbar navbar-expand-lg navbar-dark container-fluid">
                    <div className="container">
                        <Link href="/" className="navbar-brand fw-bold text-uppercase">Sapori di Italia</Link>
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
                                    <Link href="/reservas" className="nav-link">Reservas</Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/contacto" className="nav-link">Contacto</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="container py-5">
                <h1 className="text-center mb-5">Contacto</h1>
                <p className="text-center mb-4">Si tienes alguna pregunta o comentario, no dudes en contactarnos.</p>

                <div className="row justify-content-center">
                    {/* Información de Contacto */}
                    <div className="col-md-6 col-lg-4">
                        <div className="card text-center shadow mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Teléfono</h5>
                                <p className="card-text">+56 9 1234 5678</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="card text-center shadow mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Email</h5>
                                <p className="card-text">contacto@saporidiitalia.cl</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="card text-center shadow mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Dirección</h5>
                                <p className="card-text">Av. Italia 1234, Santiago, Chile</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mapa */}
                <div className="text-center mt-5">
                    <h2 className="mb-4">Ubicación</h2>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3320.168158691163!2d-70.6353736847415!3d-33.4557169808447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c6ee2e00c96d%3A0xc706c65868e3178a!2sRestaurante%20Sapori%20di%20Italia!5e0!3m2!1ses-419!2scl!4v1698530509922!5m2!1ses-419!2scl"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy">
                    </iframe>
                </div>
            </main>

            {/* Footer Oscuro */}
            <footer className="text-center py-4 bg-dark text-light">
                <p>© {new Date().getFullYear()} Sapori di Italia. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Contacto;
