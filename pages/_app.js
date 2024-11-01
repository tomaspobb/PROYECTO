// pages/_app.js
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

export default MyApp;
