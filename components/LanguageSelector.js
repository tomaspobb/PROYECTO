// components/LanguageSelector.js
import { useRouter } from 'next/router';

const LanguageSelector = () => {
  const router = useRouter();

  const changeLanguage = (lang) => {
    router.push(router.pathname, router.asPath, { locale: lang });
  };

  return (
    <div className="d-flex gap-2 ms-3" style={{ backgroundColor: 'yellow', padding: '5px' }}>
      <button onClick={() => changeLanguage('es')} className="btn btn-link text-dark">ES</button>
      <button onClick={() => changeLanguage('en')} className="btn btn-link text-dark">EN</button>
    </div>
  );
};

export default LanguageSelector;
