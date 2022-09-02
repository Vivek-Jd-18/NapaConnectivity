import type { NextPage } from 'next';
import Head from 'next/head';
import SettingsComponent from '../components/Settings/Settings';
import styles from '../../styles/pages/Settings.module.scss';
import { useWeb3 } from '@/hooks/useWeb3';
import { useProfile } from '@/hooks/useProfile';
import { useEffect } from 'react';

const Settings: NextPage = () => {
  const { account } = useWeb3();
  const { getUserProfileDetails } = useProfile();

  useEffect(() => {
    if (account) {
      getUserProfileDetails(account);
    }
  }, [account]);

  return (
    <>
      <Head>
        <title>NAPA Society Development Server</title>
        <meta name="description" content="NAPA Developmeent Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.settingsContainer}>
        <SettingsComponent />
      </div>
    </>
  );
};

export default Settings;
