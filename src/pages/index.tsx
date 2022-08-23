import type { NextPage } from 'next';
import Head from 'next/head';
import SocialArtSectionWithoutLimit from '../components/SocialArtSectionWithoutLimit/SocialArtSectionWithoutLimit';
import styles from '../../styles/pages/Home.module.scss';
import NapaSociety from '../components/NapaSocietySection/NapaSocietySection';
import SocialArtSection from '../components/SocialArtSection/SocialArtSection';
import NftMarketplaceSection from '../components/NftMarketplaceSection/NftMarketplaceSection';
import Header from '../components/Header/Header';
import { useCallback, useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import bootstrap CSS
import { getAlreadyConnectedWeb3 } from '@/utils/wallet';
import { toast } from 'react-toastify';

const Home: NextPage = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

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
        <title>NAPA Society Staging Enviornment</title>
        <meta name="description" content="NAPA Staging Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? (
        <Loader />
      ) : (
        <section className={styles.container} id="container">
          <Header openMenu={openMenu} setIsMenu={setIsMenu} isMenu={isMenu} account={account} />
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
