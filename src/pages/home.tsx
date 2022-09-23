import type { NextPage } from 'next';
import { useEffect } from 'react';
import Head from 'next/head';
import styles from '../../styles/pages/Home.module.scss';

import { WEBSOCKET_URL } from '../constants/url';

import TrendingSection from '../components/TrendingSection/Trending';
import LeaderboardSection from '../components/LeaderboardSection/LeaderboardSection';
import NapaLounge from '../components/NapaLounge/NapaLounge';

const Home: NextPage = () => {
  const socket = new WebSocket(WEBSOCKET_URL);
  useEffect(() => {
    socket.addEventListener('open', () => {
      console.log('connected from client');
    });
  }, []);

  return (
    <>
      <Head>
        <title>NAPA Society</title>
        <meta name="description" content="NAPA Developmeent Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.container} id="container">
        <div className={styles.child}>
          <TrendingSection socket={socket} />
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
