import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import styles from '../../styles/pages/Home.module.scss';
import type { NextPage } from 'next';
import TrendingSection from '../components/TrendingSection/Trending';
import LeaderboardSection from '../components/LeaderboardSection/LeaderboardSection';
import NapaLounge from '../components/NapaLounge/NapaLounge';
import { getAlreadyConnectedWeb3 } from '@/utils/wallet';
import { toast } from 'react-toastify';

const Trending: NextPage = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [account, setAccount] = useState('');

  const openMenu = () => {
    setIsMenu(true);
  };

  const getAccounts = useCallback(async () => {
    try {
      const accounts: any = await getAlreadyConnectedWeb3();
      setAccount(accounts[0]);
    } catch (error: any) {
      toast.error(error);
    }
  }, []);

  useEffect(() => {
    getAccounts();
  }, []);

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

export default Trending;
