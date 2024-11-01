// utils/i18nUtils.js
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticPropsWithTranslations = async (locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
