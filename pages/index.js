import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleReservationClick = () => {
    if (isAuthenticated) {
      router.push('/reservas');
    } else {
      router.push('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    router.push('/');
  };

  return (
    <div>
      <Head>
        <title>Restaurante Sapori di Italia</title>
        <meta name="description" content="Bienvenido al Restaurante Sapori di Italia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar Oscura de Ancho Completo */}
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
                  <Link href="/contacto" className="nav-link">Contacto</Link>
                </li>
                {isAuthenticated && (
                  <li className="nav-item">
                    <button className="nav-link btn btn-link text-warning" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                      Cerrar Sesión
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main className={`container py-5 ${styles.main}`}>
        {/* Sección de testimonios */}
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

        {/* Sección del botón de registro o reservas */}
        <div id="registro" className="section text-center mt-5">
          <h2 className="mb-4">¡Ven a disfrutar una experiencia italiana increíble!</h2>
          <button onClick={handleReservationClick} className="btn btn-success">
            Reserva tu mesa
          </button>
        </div>

        {/* Sección de ubicación */}
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
