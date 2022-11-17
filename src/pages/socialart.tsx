import Head from 'next/head';
import styles from '../../styles/pages/Home.module.scss';
import type { NextPage } from 'next';
import SocialArtSc from '@/components/SocialArt/SocialArtSc';

const SocialArt: NextPage = () => {

  return (
    <>
      <Head>
        <title>NAPA Society | Social Art</title>
        <meta name="description" content="NAPA Developmeent Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.container} id="earn-container">
        <div className={`${styles.child} earnpage sclart_bg`} id="scrollElement">
          <SocialArtSc />
        </div>
      </section>
    </>
  );
};

export default SocialArt;
