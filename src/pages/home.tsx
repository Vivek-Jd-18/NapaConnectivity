import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/Header/Header';
import styles from '../../styles/pages/Home.module.scss';
import type { NextPage } from 'next';
import TrendingSection from '../components/TrendingSection/Trending';
import LeaderboardSection from '../components/LeaderboardSection/LeaderboardSection';
import NapaLounge from '../components/NapaLounge/NapaLounge';
import { useWeb3 } from '@/hooks/useWeb3';

const Home: NextPage = () => {
  const [isMenu, setIsMenu] = useState(false);
  const { account } = useWeb3();

  const openMenu = () => {
    setIsMenu(true);
  };

  return (
    <>
      <Head>
        <title>NAPA Society</title>
        <meta name="description" content="NAPA Developmeent Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.container} id="container">
        <Header
          openMenu={openMenu}
          setIsMenu={setIsMenu}
          isMenu={isMenu}
          account={account}
        />
        <div className={styles.child}>
          <TrendingSection />
        </div>
        <div className={styles.child}>
          <LeaderboardSection />
        </div>
        <div className={styles.child}>
          <NapaLounge />
        </div>
      </section>
    </>
  );
};

export default Home;
