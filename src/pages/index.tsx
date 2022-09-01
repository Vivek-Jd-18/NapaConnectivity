import type { NextPage } from 'next';
import Head from 'next/head';
import SocialArtSectionWithoutLimit from '../components/SocialArtSectionWithoutLimit/SocialArtSectionWithoutLimit';
import styles from '../../styles/pages/Home.module.scss';
import NapaSociety from '../components/NapaSocietySection/NapaSocietySection';
import SocialArtSection from '../components/SocialArtSection/SocialArtSection';
import NftMarketplaceSection from '../components/NftMarketplaceSection/NftMarketplaceSection';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import bootstrap CSS

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>NAPA Society Development Server</title>
        <meta name="description" content="NAPA Developmeent Environment" />
        <title>NAPA Society Staging Enviornment</title>
        <meta name="description" content="NAPA Staging Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.container} id="container">
        <div className={styles.child}>
          <SocialArtSectionWithoutLimit />
        </div>
        <div className={styles.child}>
          <NapaSociety />
        </div>
        <div className={styles.child}>
          <SocialArtSection />
        </div>
        <div className={styles.child}>
          <NftMarketplaceSection />
        </div>
      </section>
    </>
  );
};

export default Index;
