import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const testimonials = [
        {
            text: "La carbonara es la mejor que he probado. ¡Altamente recomendada!",
            rating: "⭐⭐⭐⭐⭐",
            image: "/images/carbonara.jpg"
        },
        {
            text: "La bruschetta es fresca y deliciosa. Perfecta para empezar la cena.",
            rating: "⭐⭐⭐⭐",
            image: "/images/bruschetta.jpg"
        },
        {
            text: "La ensalada caprese es un must. Me encantó cada bocado.",
            rating: "⭐⭐⭐⭐⭐",
            image: "/images/ensalada-caprese.jpg"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000); // Cambia el testimonio cada 5 segundos

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <Head>
                <title>Restaurante Sapori di Italia</title>
                <meta name="description" content="Bienvenido al Restaurante Sapori di Italia" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className={styles.header}>
                <h1 className={styles.title}>Restaurante Sapori di Italia</h1>
                <nav className={`navbar navbar-expand-lg navbar-light bg-light`}>
                    <Link className="navbar-brand" href="/">Inicio</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
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

            <main className={`container py-5 ${styles.main}`}>
                <section id="testimonios" className="text-center">
                    <h2 className="mb-4">Testimonios</h2>
                    <div className="card mb-3 mx-auto" style={{ maxWidth: '540px' }}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <Image
                                    src={testimonials[currentTestimonial].image}
                                    alt="Plato Testimonial"
                                    className="img-fluid rounded-start"
                                    width={250}
                                    height={250}
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <p className="card-text">{testimonials[currentTestimonial].text}</p>
                                    <p className="card-text"><small className="text-muted">{testimonials[currentTestimonial].rating}</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sección Botón de Ver Menú */}
                <div className="text-center mt-5">
                    <Link href="/menu">
                        <button className="btn btn-primary">Ver Menú</button>
                    </Link>
                </div>

                {/* Sección Botón de Registro */}
                <div id="registro" className="section text-center mt-5">
                    <h2 className="mb-4">¡Únete a nosotros!</h2>
                    <Link href="/register">
                        <button className="btn btn-primary">Regístrate como Usuario</button>
                    </Link>
                </div>

                {/* Sección Ubicación */}
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

            <footer className={styles.footer}>
                <p>© {new Date().getFullYear()} Restaurante Sapori di Italia. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Home;
