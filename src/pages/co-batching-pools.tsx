import Head from 'next/head';
import styles from '../../styles/pages/Home.module.scss';
import type { NextPage } from 'next';
import CoBatchingPoolsSc from '@/components/CoBatchingPools/CoBatchingPoolsSc';

const CoBatchingPools: NextPage = () => {

  return (
    <>
      <Head>
        <title>NAPA Society | Co-Batching Pools</title>
        <meta name="description" content="NAPA Developmeent Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.container} id="earn-container">
        <div className={`${styles.child} earnpage mrktplcbg`} id="scrollElement">
          <CoBatchingPoolsSc />
        </div>
      </section>
    </>
  );
};

export default CoBatchingPools;
