import type { NextPage } from 'next';
import { useEffect } from 'react';
import Head from 'next/head';
import styles from '../../styles/pages/Home.module.scss';

import Payouts from '../components/Payouts/Payouts';

const PayoutsDetail: NextPage = () => {
  //   useEffect(() => {
  //     document.body.classList.add('home_page');
  //     return () => {
  //       document.body.classList.remove('home_page');
  //     };
  //   }, []);

  return (
    <>
      <Head>
        <title>NAPA Society | Trending</title>
        <meta name="description" content="NAPA Developmeent Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="hm_sc"
        style={{ backgroundColor: '#0A1313', height: '100vh' }}
      >
        <Payouts />
      </div>
    </>
  );
};

export default PayoutsDetail;
