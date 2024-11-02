// pages/register.js
import { useState } from 'react';
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

const Register = () => {
  const { t } = useTranslation('common');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Enviar solicitud a la API para crear un usuario en la base de datos
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setSuccess(true);

        // Guardar el idioma preferido y el nombre de usuario en localStorage
        localStorage.setItem('preferredLanguage', router.locale);
        localStorage.setItem('username', username);

        router.push('/login'); // Redirigir al login después del registro exitoso
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <Head>
        <title>{t('register')} - {t('restaurantName')}</title>
        <meta name="description" content={t('registerDescription')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Formulario de Registro */}
      <main className="d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
          <h2 className="text-center mb-4" style={{ color: 'var(--primary-color)' }}>{t('register')}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">{t('username')}</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">{t('password')}</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">{t('register')}</button>
          </form>
          {error && <p className="text-danger text-center">{error}</p>}
          {success && <p className="text-success text-center">{t('registrationSuccess')}</p>}
        </div>
      </main>

      {/* Footer Oscuro */}
      <footer className="text-center py-4 bg-dark text-light">
        <p>© {new Date().getFullYear()} {t('restaurantName')}. {t('allRightsReserved')}</p>
      </footer>
    </div>
  );
};

export default Register;
