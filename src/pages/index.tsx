import type { NextPage } from 'next';
import Head from 'next/head';
import SocialArtSectionWithoutLimit from '@/components/SocialArtSectionWithoutLimit/SocialArtSectionWithoutLimit';
import styles from '../../styles/pages/Home.module.scss';
import NapaSociety from '@/components/NapaSocietySection/NapaSocietySection';
import SocialArtSection from '@/components/SocialArtSection/SocialArtSection';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>NAPA Society Staging Enviornment</title>
        <meta name="description" content="NAPA Staging Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.container}>
        <div className={styles.child}>
          <SocialArtSectionWithoutLimit />
        </div>
        <div className={styles.child}>
          <NapaSociety />
        </div>
        <div className={styles.child}>
          <SocialArtSection />
        </div>
        <div className={styles.child}>Slide 4</div>
        <div className={styles.child}>Slide 5</div>
      </section>
    </>
  );
};

export default Home;
