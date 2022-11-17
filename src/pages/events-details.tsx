import Head from 'next/head';
import styles from '../../styles/pages/Home.module.scss';
import type { NextPage } from 'next';
import EventsDetailsSc from '@/components/EventsDetails/EventsDetailsSc';

const EventsDetails: NextPage = () => {

  return (
    <>
      <Head>
        <title>NAPA Society | Events</title>
        <meta name="description" content="NAPA Developmeent Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.container} id="earn-container">
        <div className={`${styles.child} earnpage`} id="scrollElement">
          <EventsDetailsSc/>
        </div>
      </section>
    </>
  );
};

export default EventsDetails;
