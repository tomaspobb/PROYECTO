// Importamos los módulos necesarios de React, Next.js y Bootstrap
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AuthContext } from '../components/AuthContext'; // Importamos AuthContext para manejar la autenticación
import 'bootstrap/dist/css/bootstrap.min.css';

// Configuración de props estáticas para habilitar las traducciones
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

const LoginPage = () => {
  // Hook para obtener las traducciones del archivo de idioma 'common'
  const { t } = useTranslation('common');
  // Usamos el contexto de autenticación y obtenemos la función de login
  const { login } = useContext(AuthContext);
  // Estados para el nombre de usuario, contraseña y posibles errores
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  // Hook para manejar la navegación
  const router = useRouter();

  // Función que maneja el inicio de sesión al enviar el formulario
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Limpiamos cualquier error previo

    try {
      // Enviamos una solicitud POST a la API de inicio de sesión con los datos del usuario
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      // Si la respuesta no es exitosa, lanzamos un error con el mensaje adecuado
      if (!response.ok) {
        throw new Error(data.message || 'Error en el inicio de sesión');
      }

      // Llamamos a la función login del contexto con el token recibido
      login(data.token, username, router.locale);

      // Redirigimos a la página de reservas después del inicio de sesión exitoso
      router.push('/reservas');
    } catch (err) {
      // Actualizamos el estado con el mensaje de error en caso de falla
      setError(err.message);
    }
  };

  return (
    <div>
      {/* Cabecera de la página de inicio de sesión */}
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
            {/* Botón de envío del formulario */}
            <button type="submit" className="btn btn-primary w-100 mb-3">{t('login')}</button>
          </form>
          {/* Mensaje de error en caso de inicio de sesión fallido */}
          {error && <p className="text-danger text-center">{error}</p>}
          {/* Enlace para registrarse si no se tiene una cuenta */}
          <p className="text-center">
            {t('noAccount')} <Link href="/register" className="text-info">
              {t('registerHere')}
            </Link>
          </p>
        </div>
      </main>

      {/* Footer oscuro al final de la página */}
      <footer className="text-center py-4 bg-dark text-light">
        <p>© {new Date().getFullYear()} {t('restaurantName')}. {t('allRightsReserved')}</p>
      </footer>
    </div>
  );
};

export default LoginPage;
