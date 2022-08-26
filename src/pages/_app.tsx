import '../../styles/globals.scss';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
    AOS.init();
  }, []);
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer
        key="toast"
        {...{
          position: 'top-center',
          newestOnTop: false,
          draggable: false,
        }}
      />
    </>
  );
}

export default MyApp;
