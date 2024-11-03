// utils/i18nUtils.js
// Importamos serverSideTranslations de next-i18next para cargar las traducciones en el servidor
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Definimos una función para cargar las traducciones necesarias en las props estáticas
// Esta función recibe el parámetro 'locale', que indica el idioma actual de la página
export const getStaticPropsWithTranslations = async (locale) => ({
  // Retornamos un objeto con las traducciones cargadas para el idioma especificado
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
