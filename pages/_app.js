import { appWithTranslation } from 'next-i18next';
import NavBar from '../components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(MyApp);
