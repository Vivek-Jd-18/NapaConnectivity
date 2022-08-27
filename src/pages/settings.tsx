import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/Header/Header';
import SettingsComponent from '../components/Settings/Settings';
import styles from '../../styles/pages/Settings.module.scss';
import { useWeb3 } from '@/hooks/useWeb3';

const Settings: NextPage = () => {
  const [isMenu, setIsMenu] = useState(false);
  const { account } = useWeb3();

  const openMenu = () => {
    setIsMenu(true);
  };

  return (
    <>
      <Head>
        <title>NAPA Society Development Server</title>
        <meta name="description" content="NAPA Developmeent Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.settingsContainer}>
        <Header
          openMenu={openMenu}
          setIsMenu={setIsMenu}
          isMenu={isMenu}
          account={account}
        />
        <SettingsComponent />
      </div>
    </>
  );
};

export default Settings;
