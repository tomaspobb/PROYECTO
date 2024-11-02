// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import 'bootstrap/dist/css/bootstrap.min.css';

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

const LoginPage = () => {
  const { t } = useTranslation('common');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el inicio de sesión');
      }

      // Guardar token en localStorage y datos del usuario
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('preferredLanguage', router.locale);
      localStorage.setItem('username', username);

      router.push('/reservas'); // Redirigir a la página de reservas después del inicio de sesión exitoso
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Head>
        <title>{t('login')} - {t('restaurantName')}</title>
        <meta name="description" content={t('loginDescription')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Formulario de Inicio de Sesión */}
      <main className="d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
          <h3 className="text-center mb-4" style={{ color: 'var(--primary-color)' }}>{t('login')}</h3>
          <form onSubmit={handleLogin}>
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
            <button type="submit" className="btn btn-primary w-100 mb-3">{t('login')}</button>
          </form>
          {error && <p className="text-danger text-center">{error}</p>}
          <p className="text-center">
            {t('noAccount')} <Link href="/register" className="text-info">
              {t('registerHere')}
            </Link>
          </p>
        </div>
      </main>

      {/* Footer Oscuro */}
      <footer className="text-center py-4 bg-dark text-light">
        <p>© {new Date().getFullYear()} {t('restaurantName')}. {t('allRightsReserved')}</p>
      </footer>
    </div>
  );
};

export default LoginPage;
