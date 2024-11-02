import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import NavBar from '../components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Recupera el idioma de localStorage si existe y actualiza el idioma de la app
    const savedLocale = localStorage.getItem('preferredLanguage');
    if (savedLocale && savedLocale !== router.locale) {
      router.push(router.pathname, router.asPath, { locale: savedLocale });
    }
  }, [router]);

  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(MyApp);
