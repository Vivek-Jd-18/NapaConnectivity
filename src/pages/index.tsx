import BannerSection from '@/components/BannerSection/BannerSection';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>NAPA Society Development Server</title>
        <meta name="description" content="NAPA Developmeent Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <BannerSection />
      <Footer />
    </>
  );
};

export default Home;
