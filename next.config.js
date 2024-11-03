// next.config.js
// Importamos la configuración de internacionalización de `next-i18next`
const { i18n } = require('./next-i18next.config');

// Exportamos la configuración de Next.js, incluyendo la configuración de internacionalización
module.exports = {
  i18n, // Incluimos la configuración de `i18n` para que Next.js pueda manejar la internacionalización
};
