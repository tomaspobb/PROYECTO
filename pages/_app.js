import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import NavBar from '../components/NavBar';
import { AuthProvider } from '../components/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Importa el JavaScript de Bootstrap para manejar el menú responsive
    import('bootstrap/dist/js/bootstrap.bundle.min');

    // Recupera el idioma de localStorage si existe y actualiza el idioma de la app
    const savedLocale = localStorage.getItem('preferredLanguage');
    if (savedLocale && savedLocale !== router.locale) {
      router.push(router.pathname, router.asPath, { locale: savedLocale });
    }
  }, [router]);

  return (
    <AuthProvider> {/* Envolvemos la aplicación en AuthProvider */}
      <NavBar />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default appWithTranslation(MyApp);
