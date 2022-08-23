import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/Header/Header';
import styles from '../../styles/pages/Home.module.scss';
import type { NextPage } from 'next';
import TrendingSection from '../components/TrendingSection/Trending';
import LeaderboardSection from '@/components/LeaderboardSection/LeaderboardSection';

const Trending: NextPage = () => {
  const [isMenu, setIsMenu] = useState(false);
  const openMenu = () => {
    setIsMenu(true);
  };
  return (
    <>
      <Head>
        <title>Whats Trending</title>
        <meta name="description" content="NAPA Developmeent Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.container} id="container">
        <Header openMenu={openMenu} setIsMenu={setIsMenu} isMenu={isMenu} />
        <div className={styles.child}>
          <TrendingSection />
        </div>
        <div className={styles.child}>
          <LeaderboardSection />
        </div>
      </section>
    </>
  );
};

export default Trending;
