import type { NextPage } from 'next';
import Head from 'next/head';
import SocialArtSectionWithoutLimit from '@/components/SocialArtSectionWithoutLimit/SocialArtSectionWithoutLimit';
import styles from '../../styles/pages/Home.module.scss';
import NapaSociety from '@/components/NapaSocietySection/NapaSocietySection';
import SocialArtSection from '@/components/SocialArtSection/SocialArtSection';
import NftMarketplaceSection from '@/components/NftMarketplaceSection/NftMarketplaceSection';
import Header from '@/components/Header/Header';
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader/Loader';
import Footer from '@/components/Footer/Footer';

const Home: NextPage = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const openMenu = () => {
    setIsMenu(true);
  };

  return (
    <>
      <Head>
        <title>NAPA Society Development Server</title>
        <meta name="description" content="NAPA Developmeent Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? (
        <Loader />
      ) : (
        <section className={styles.container} id="container">
          <Header openMenu={openMenu} setIsMenu={setIsMenu} isMenu={isMenu} />
          <div className={styles.child}>
            <SocialArtSectionWithoutLimit isMenu={isMenu} />
          </div>
          <div className={styles.child}>
            <NapaSociety isMenu={isMenu} />
          </div>
          <div className={styles.child}>
            <SocialArtSection isMenu={isMenu} />
          </div>
          <div className={styles.child}>
            <NftMarketplaceSection isMenu={isMenu} />
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
