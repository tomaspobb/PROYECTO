// Importamos los módulos necesarios de Next.js y React
import Head from 'next/head';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// Importamos los estilos de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Configuramos las props estáticas para cargar las traducciones al renderizar la página
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

const Home = () => {
  // Hook para obtener las traducciones del archivo de idioma 'common'
  const { t } = useTranslation('common');
  // Hook para manejar la navegación
  const router = useRouter();
  // Estado para manejar la autenticación y el índice del testimonio actual
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Array de testimonios con texto, calificación y imagen traducidos
  const testimonials = [
    {
      text: t('carbonaraTestimonial'),
      rating: '⭐⭐⭐⭐⭐',
      image: '/images/carbonara.jpg',
    },
    {
      text: t('bruschettaTestimonial'),
      rating: '⭐⭐⭐⭐',
      image: '/images/bruschetta.jpg',
    },
    {
      text: t('capreseTestimonial'),
      rating: '⭐⭐⭐⭐⭐',
      image: '/images/ensalada-caprese.jpg',
    },
  ];

  // Array de platos de la galería con nombre, imagen y descripción traducidos
  const galleryDishes = [
    {
      name: t('carbonara'),
      image: '/images/carbonara.jpg',
      description: t('carbonaraDescription'),
    },
    {
      name: t('bruschetta'),
      image: '/images/bruschetta.jpg',
      description: t('bruschettaDescription'),
    },
    {
      name: t('margaritaPizza'),
      image: '/images/pizza-margarita.jpg',
      description: t('margaritaPizzaDescription'),
    },
  ];

  useEffect(() => {
    // Comprobamos el estado de autenticación guardado en localStorage
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');

    // Creamos un intervalo que cambia el testimonio cada 5 segundos
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    // Limpiamos el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, [testimonials]);

  // Función que redirige a la página de reservas si el usuario está autenticado, o a la de login si no lo está
  const handleReservationClick = () => {
    if (isAuthenticated) {
      router.push('/reservas');
    } else {
      router.push('/login');
    }
  };

  return (
    <div>
      {/* Configuración de la cabecera de la página */}
      <Head>
        <title>{t('restaurantName')}</title>
        <meta name="description" content={t('homeDescription')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Contenido principal de la página */}
      <main className="container py-5">
        {/* Sección de testimonios */}
        <section id="testimonios" className="text-center">
          <h2 className="mb-4" style={{ color: 'var(--primary-color)' }}>{t('testimonialSection')}</h2>
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

        {/* Sección de galería de platos */}
        <section id="galeria" className="text-center mt-5">
          <h2 className="mb-4" style={{ color: 'var(--primary-color)' }}>{t('dishGallery')}</h2>
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
                    style={{ objectFit: 'cover', height: '200px' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title" style={{ color: 'var(--primary-color)' }}>{dish.name}</h5>
                    <p className="card-text">{dish.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección para invitar a reservar */}
        <div id="registro" className="section text-center mt-5">
          <h2 className="mb-4">{t('enjoyExperience')}</h2>
          <button onClick={handleReservationClick} className="btn btn-primary">
            {t('reserveForToday')}
          </button>
        </div>

        {/* Sección del horario */}
        <div className="text-center mt-4">
          <h5>{t('schedule')}</h5>
        </div>
      </main>

      {/* Footer oscuro al final de la página */}
      <footer className="text-center py-4 bg-dark text-light">
        <p>© {new Date().getFullYear()} {t('restaurantName')}. {t('allRightsReserved')}</p>
      </footer>
    </div>
  );
};

export default Home;
