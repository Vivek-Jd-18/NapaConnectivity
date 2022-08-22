import WalletComponent from '../components/Wallet/Wallet';
import type { NextPage } from 'next';
import Head from 'next/head';

const Wallet: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wallet</title>
        <meta name="description" content="NAPA Developmeent Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WalletComponent />
    </>
  );
};

export default Wallet;
