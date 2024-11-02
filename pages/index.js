import Head from 'next/head';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

const Home = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials]);

  const handleReservationClick = () => {
    if (isAuthenticated) {
      router.push('/reservas');
    } else {
      router.push('/login');
    }
  };

  return (
    <div>
      <Head>
        <title>{t('restaurantName')}</title>
        <meta name="description" content={t('homeDescription')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container py-5">
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

        <div id="registro" className="section text-center mt-5">
          <h2 className="mb-4">{t('enjoyExperience')}</h2>
          <button onClick={handleReservationClick} className="btn btn-primary">
            {t('reserveForToday')} {/* Cambiado a "Reserva para Hoy" */}
          </button>
        </div>

        <div className="text-center mt-4">
          <h5>Horario: Lunes a Viernes de 13:00 a 23:00</h5> {/* Agregado horario */}
        </div>
      </main>

      <footer className="text-center py-4 bg-dark text-light">
        <p>© {new Date().getFullYear()} {t('restaurantName')}. {t('allRightsReserved')}</p>
      </footer>
    </div>
  );
};

export default Home;

