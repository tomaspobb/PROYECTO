import Link from 'next/link';
import styles from '../styles/NavBar.module.css'; // Asegúrate de tener tus estilos

const NavBar = () => {
    return (
        <nav className={`navbar navbar-expand-lg navbar-light bg-light`}>
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
                            <Link href="/reservas" className="nav-link">Reservas</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/contacto" className="nav-link">Contacto</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
