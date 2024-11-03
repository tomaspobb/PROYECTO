// Importamos los módulos necesarios de React, Next.js y Bootstrap para el formulario de registro y las traducciones
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import 'bootstrap/dist/css/bootstrap.min.css';

// Configuración de props estáticas para habilitar las traducciones en la página de registro
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

const Register = () => {
  // Hook para obtener las traducciones del archivo de idioma 'common'
  const { t } = useTranslation('common');
  // Estados para manejar los datos de usuario y mensajes de error/éxito
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  // Hook para manejar la navegación
  const router = useRouter();

  // Función que maneja el envío del formulario de registro
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Limpiamos el error previo

    try {
      // Enviamos una solicitud POST a la API de registro con los datos del usuario
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      // Si el registro es exitoso, mostramos un mensaje de éxito y redirigimos al usuario al login
      if (response.ok) {
        setSuccess(true);
        localStorage.setItem('preferredLanguage', router.locale); // Guardamos el idioma preferido
        localStorage.setItem('username', username); // Guardamos el nombre de usuario
        router.push('/login'); // Redirigimos a la página de inicio de sesión
      } else {
        // Si hay un error en la respuesta, mostramos el mensaje de error
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
      }
    } catch (err) {
      // Mostramos un mensaje de error en caso de un fallo inesperado
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div>
      {/* Cabecera de la página de registro */}
      <Head>
        <title>{t('register')} - {t('restaurantName')}</title>
        <meta name="description" content={t('registerDescription')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Formulario de registro */}
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
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <button type="submit" className="btn btn-primary w-100 mb-3">{t('register')}</button>
          </form>
          {/* Mensajes de error y éxito después de intentar el registro */}
          {error && <p className="text-danger text-center">{error}</p>}
          {success && <p className="text-success text-center">{t('registrationSuccess')}</p>}
        </div>
      </main>

      {/* Footer oscuro al final de la página */}
      <footer className="text-center py-4 bg-dark text-light">
        <p>© {new Date().getFullYear()} {t('restaurantName')}. {t('allRightsReserved')}</p>
      </footer>
    </div>
  );
};

export default Register;
