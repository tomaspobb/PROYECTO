// Importamos appWithTranslation para habilitar la traducción con next-i18next
import { appWithTranslation } from 'next-i18next';
// Importamos el enrutador de Next.js para manejar la navegación
import { useRouter } from 'next/router';
// Importamos useEffect de React para realizar efectos secundarios
import { useEffect } from 'react';
// Importamos el componente NavBar para la barra de navegación
import NavBar from '../components/NavBar';
// Importamos AuthProvider para envolver toda la aplicación y manejar la autenticación
import { AuthProvider } from '../components/AuthContext';
// Importamos los estilos de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  // Utilizamos el enrutador de Next.js
  const router = useRouter();

  useEffect(() => {
    // Importa el JavaScript de Bootstrap para manejar el menú responsive y otros componentes interactivos
    import('bootstrap/dist/js/bootstrap.bundle.min');

    // Recupera el idioma preferido del usuario desde localStorage, si está disponible,
    // y actualiza el idioma de la aplicación
    const savedLocale = localStorage.getItem('preferredLanguage');
    if (savedLocale && savedLocale !== router.locale) {
      router.push(router.pathname, router.asPath, { locale: savedLocale });
    }
  }, [router]);

  return (
    // Envolvemos la aplicación dentro de AuthProvider para que el estado de autenticación esté disponible en toda la app
    <AuthProvider>
      {/* Incluimos la barra de navegación en todas las páginas */}
      <NavBar />
      {/* Renderizamos el componente específico de la página actual con sus propiedades */}
      <Component {...pageProps} />
    </AuthProvider>
  );
}

// Exportamos la aplicación con soporte de traducción utilizando appWithTranslation
export default appWithTranslation(MyApp);
