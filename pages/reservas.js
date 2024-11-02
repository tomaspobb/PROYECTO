// pages/reservas.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import 'bootstrap/dist/css/bootstrap.min.css';

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

const Reservas = () => {
  const { t } = useTranslation('common');
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div>
      <Head>
        <title>{t('reservationTitle')} - {t('restaurantName')}</title>
        <meta name="description" content={t('reservationDescription')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container py-5">
        <h1 className="text-center mb-5" style={{ color: 'var(--primary-color)' }}>
          {t('reservationTitle')}
        </h1>
        <p className="text-center">{t('reservationPrompt')}</p>
        <form className="mx-auto" style={{ maxWidth: '400px' }}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">{t('name')}</label>
            <input type="text" className="form-control" id="name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">{t('email')}</label>
            <input type="email" className="form-control" id="email" required />
          </div>
          <button type="submit" className="btn btn-primary w-100">{t('reserveButton')}</button>
        </form>
      </main>

      <footer className="text-center py-4 bg-dark text-light">
        <p>© {new Date().getFullYear()} {t('restaurantName')}. {t('allRightsReserved')}</p>
      </footer>
    </div>
  );
};

export default Reservas;
