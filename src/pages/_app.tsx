import '../../styles/globals.scss';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from '../components/Header/Header';
import Search from '../components/Search/Search';
import Loader from '../components/Loader/Loader';
import { useRouter } from 'next/router';
import { WebThreeContextProvider } from '../contexts/WebThreeContext';
import { UserContextProvider } from '../contexts/UserContext';

function MyApp({ Component, pageProps }: AppProps) {
  const [isMenu, setIsMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const { pathname } = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const openMenu = () => {
    setIsMenu(true);
  };
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
    AOS.init();
  }, []);

  return (
    <>
      <Head>
        <title>NAPA Society Development Server</title>
        <meta name="description" content="NAPA Developmeent Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WebThreeContextProvider>
        <UserContextProvider>
          {loading ? (
            <Loader />
          ) : (
            <div className="main-container">
              {pathname !== '/404' && pathname !== '/wallet' && (
                <>
                  <Header
                    openMenu={openMenu}
                    setIsMenu={setIsMenu}
                    isMenu={isMenu}
                    setShowSearch={setShowSearch}
                  />
                  {showSearch && <Search setShowSearch={setShowSearch} />}
                </>
              )}
              <Component {...pageProps} />

              <ToastContainer
                key="toast"
                {...{
                  position: 'top-right',
                  newestOnTop: false,
                  draggable: false,
                  hideProgressBar: true,
                }}
              />
            </div>
          )}
        </UserContextProvider>
      </WebThreeContextProvider>
    </>
  );
}

export default MyApp;
