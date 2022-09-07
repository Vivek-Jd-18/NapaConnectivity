import WalletComponent from '../components/Wallet/Wallet';
import type { NextPage } from 'next';
import Head from 'next/head';
import useWebThree from '../hooks/useWebThree';

const Wallet: NextPage = () => {
  const { account, connectWallet } = useWebThree();

  return (
    <>
      <Head>
        <title>Connect Wallet</title>
        <meta name="description" content="NAPA Developmeent Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WalletComponent account={account} connectWallet={connectWallet} />
    </>
  );
};

export default Wallet;
