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

            <header className="bg-light p-3">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" href="/">Sapori di Italia</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" href="/menu">Menú</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/reservas">Reservas</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/contacto">Contacto</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main className="container py-5">
                <h1 className="text-center mb-5">Sapori di Italia</h1> {/* Nombre del restaurante */}
                <h1 className="text-center mb-5">Contacto</h1>
                <p>Si tienes alguna pregunta o comentario, no dudes en contactarnos.</p>
                <p><strong>Teléfono:</strong> +56 9 1234 5678</p>
                <p><strong>Email:</strong> contacto@saporidiitalia.cl</p>
                <p><strong>Dirección:</strong> Av. Italia 1234, Santiago, Chile</p>
            </main>

            <footer className="text-center py-4">
                <p>© {new Date().getFullYear()} Sapori di Italia. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Contacto;
