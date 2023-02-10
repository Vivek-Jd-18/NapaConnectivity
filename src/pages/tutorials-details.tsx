import Head from 'next/head';
import styles from '../../styles/pages/Home.module.scss';
import type { NextPage } from 'next';
import TutorialsDetailsSc from '../components/TipsAndTutorials copy/TutorialsDetailsSc';

const TutorialsDetails: NextPage = () => {

  return (
    <>
      <Head>
        <title>NAPA Society</title>
        <meta name="description" content="NAPA Developmeent Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.container} id="earn-container">
        <div className={`${styles.child} earnpage datails`} id="scrollElement">
          <TutorialsDetailsSc />
        </div>
      </section>
    </>
  );
};

export default TutorialsDetails;
