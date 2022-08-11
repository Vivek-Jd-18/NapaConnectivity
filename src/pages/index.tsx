import type { NextPage } from 'next';
import Head from 'next/head';
import SocialArtSection from '@/components/SocialArtSectionWithoutLimit/SocialArtSectionWithoutLimit';
import styles from '../../styles/pages/Home.module.scss';
import NapaSociety from '@/components/NapaSocietySection/NapaSocietySection';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>NAPA Society Development Server</title>
        <meta name="description" content="NAPA Developmeent Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.container}>
        <div className={styles.child}>
          <SocialArtSection />
        </div>
        <div className={styles.child}>
          <NapaSociety />
        </div>
        <div className={styles.child}>Slide 3</div>
        <div className={styles.child}>Slide 4</div>
        <div className={styles.child}>Slide 5</div>
      </section>
    </>
  );
};

export default Home;
