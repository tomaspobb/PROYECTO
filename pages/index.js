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

  const galleryDishes = [
    {
      name: "Carbonara",
      image: "/images/carbonara.jpg",
      description: "Una clásica pasta Carbonara, con la cremosidad perfecta."
    },
    {
      name: "Bruschetta",
      image: "/images/bruschetta.jpg",
      description: "Fresca Bruschetta con tomate, albahaca y pan crujiente."
    },
    {
      name: "Pizza Margarita",
      image: "/images/pizza-margarita.jpg",
      description: "Pizza Margarita con albahaca fresca y mozzarella."
    },
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

        {/* Sección de Galería de Sabores */}
        <section id="galeria" className="text-center mt-5">
          <h2 className="mb-4">Galería de Sabores</h2>
          <div className="row">
            {galleryDishes.map((dish, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card shadow h-100">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    className="card-img-top"
                    width={500}
                    height={300}
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{dish.name}</h5>
                    <p className="card-text">{dish.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección del botón de registro o reservas */}
        <div id="registro" className="section text-center mt-5">
          <h2 className="mb-4">¡Ven a disfrutar una experiencia italiana increíble!</h2>
          <button onClick={handleReservationClick} className="btn btn-success">
            Reserva tu mesa
          </button>
        </div>
      </main>

      {/* Footer Oscuro */}
      <footer className="text-center py-4 bg-dark text-light">
        <p>© {new Date().getFullYear()} Restaurante Sapori di Italia. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;

