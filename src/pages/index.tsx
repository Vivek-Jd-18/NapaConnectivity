import type { NextPage } from 'next';
import Head from 'next/head';
import SocialArtSectionWithoutLimit from '@/components/SocialArtSectionWithoutLimit/SocialArtSectionWithoutLimit';
import styles from '../../styles/pages/Home.module.scss';
import NapaSociety from '@/components/NapaSocietySection/NapaSocietySection';
import SocialArtSection from '@/components/SocialArtSection/SocialArtSection';
import NftMarketplaceSection from '@/components/NftMarketplaceSection/NftMarketplaceSection';
import Header from '@/components/Header/Header';
import { useState } from 'react';

const Home: NextPage = () => {
  const [isMenu, setIsMenu] = useState(false);

  const openMenu = () => {
    setIsMenu(true);
  };
  
  return (
    <>
      <Head>
        <title>NAPA Society Staging Enviornment</title>
        <meta name="description" content="NAPA Staging Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.container}>
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
    </>
  );
};

export default Home;
