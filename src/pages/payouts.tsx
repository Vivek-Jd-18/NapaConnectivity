import type { NextPage } from 'next';
import Head from 'next/head';

import Payouts from '../components/Payouts/Payouts';

const PayoutsDetail: NextPage = () => {
  return (
    <>
      <Head>
        <title>NAPA Society | Trending</title>
        <meta name="description" content="NAPA Developmeent Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="payouts_container ProgressBar" id="scrollElement">
        <Payouts />
      </section>
    </>
  );
};

export default PayoutsDetail;
