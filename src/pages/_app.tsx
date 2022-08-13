import '../../styles/globals.scss';
import type { AppProps } from 'next/app';
import { useEffect } from "react";
import 'antd/dist/antd.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AOS from "aos";
import "aos/dist/aos.css";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
      AOS.init({
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
      });
  },[])
  return <Component {...pageProps} />;
}

export default MyApp;
