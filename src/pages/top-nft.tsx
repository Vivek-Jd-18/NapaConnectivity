import Head from 'next/head';
import styles from '../../styles/pages/Home.module.scss';
import type { NextPage } from 'next';
import TopNFTsSc from '../components/TopNFT/TopNFTsSc';

const TopNFT: NextPage = () => {

  return (
    <>
      <Head>
        <title>NAPA Society | Rankings</title>
        <meta name="description" content="NAPA Developmeent Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.container} id="earn-container">
        <div className={`${styles.child} earnpage`} id="scrollElement">
          <TopNFTsSc />
        </div>
      </section>
    </>
  );
};

export default TopNFT;
