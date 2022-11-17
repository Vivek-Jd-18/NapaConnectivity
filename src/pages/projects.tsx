import Head from 'next/head';
import styles from '../../styles/pages/Home.module.scss';
import type { NextPage } from 'next';
import ProjectsSc from '@/components/Projects/ProjectsSc';

const Projects: NextPage = () => {

  return (
    <>
      <Head>
        <title>NAPA Society | Projects</title>
        <meta name="description" content="NAPA Developmeent Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.container} id="earn-container">
        <div className={`${styles.child} earnpage launchpad_datals_bg`} id="scrollElement">
          {/* <CreateNewSwappingFourSc /> */}
          <ProjectsSc />
        </div>
      </section>
    </>
  );
};

export default Projects;