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
import 'tippy.js/dist/tippy.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [isMenu, setIsMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const { pathname } = useRouter();
  const [lastScroll, setLastScroll] = useState(0);

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

  const handleScroll = (element: any) => {
    const body = document.body;
    const scrollUp = 'scroll-up';
    const scrollDown = 'scroll-down';
    const currentScroll = element.scrollTop;
    if (currentScroll <= 0) {
      body.classList.remove(scrollUp);
      return;
    }

    if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
      // down
      body.classList.remove(scrollUp);
      body.classList.add(scrollDown);
    } else if (
      currentScroll < lastScroll &&
      body.classList.contains(scrollDown)
    ) {
      // up
      body.classList.remove(scrollDown);
      body.classList.add(scrollUp);
    }
    setLastScroll(currentScroll);
  };

  return (
    <>
      <Head>
        <title>NAPA Society Staging Server</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="NAPA Staging Environment" />
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
              <div onScrollCapture={(e) => handleScroll(e.target)}>
                <Component {...pageProps} />
              </div>
              <ToastContainer
                autoClose={1500}
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
