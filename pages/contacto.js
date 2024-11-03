// Importamos el hook de traducción y los componentes necesarios de Next.js
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
// Importamos una utilidad personalizada para manejar las traducciones en las props estáticas
import { getStaticPropsWithTranslations } from '../utils/i18nUtils';
// Importamos los estilos de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Configuramos las props estáticas para habilitar la traducción
export const getStaticProps = async ({ locale }) => 
  getStaticPropsWithTranslations(locale);

const Contacto = () => {
  // Hook para obtener las traducciones del archivo de idioma 'common'
  const { t } = useTranslation('common');

  return (
    <div>
      {/* Configuración de la cabecera de la página */}
      <Head>
        <title>{t('contact')}</title>
        <meta name="description" content={t('contactDescription')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Contenido principal de la página */}
      <main className="container py-5">
        {/* Título de la página de contacto */}
        <h1 className="text-center mb-5" style={{ color: 'var(--primary-color)' }}>{t('contact')}</h1>
        <p className="text-center mb-4">{t('contactPrompt')}</p>

        {/* Sección de Información de Contacto */}
        <div className="row justify-content-center">
          {/* Tarjeta de contacto para el teléfono */}
          <div className="col-md-6 col-lg-4">
            <div className="card text-center shadow mb-4">
              <div className="card-body">
                <h5 className="card-title" style={{ color: 'var(--primary-color)' }}>{t('phone')}</h5>
                <p className="card-text">+56 9 1234 5678</p>
              </div>
            </div>
          </div>
          {/* Tarjeta de contacto para el correo electrónico */}
          <div className="col-md-6 col-lg-4">
            <div className="card text-center shadow mb-4">
              <div className="card-body">
                <h5 className="card-title" style={{ color: 'var(--primary-color)' }}>{t('email')}</h5>
                <p className="card-text">contacto@saporidiitalia.cl</p>
              </div>
            </div>
          </div>
          {/* Tarjeta de contacto para la dirección */}
          <div className="col-md-6 col-lg-4">
            <div className="card text-center shadow mb-4">
              <div className="card-body">
                <h5 className="card-title" style={{ color: 'var(--primary-color)' }}>{t('address')}</h5>
                <p className="card-text">Av. Italia 1234, Santiago, Chile</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mapa de ubicación del restaurante */}
        <div className="text-center mt-5">
          <h2 className="mb-4" style={{ color: 'var(--primary-color)' }}>{t('location')}</h2>
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

      {/* Footer oscuro al final de la página */}
      <footer className="text-center py-4 bg-dark text-light">
        <p>© {new Date().getFullYear()} {t('restaurantName')}. {t('allRightsReserved')}</p>
      </footer>
    </div>
  );
};

export default Contacto;
