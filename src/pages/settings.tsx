import type { NextPage } from 'next';
import Head from 'next/head';
import SettingsComponent from '../components/Settings/Settings';
import styles from '../../styles/pages/Settings.module.scss';
import { useProfile } from '@/hooks/useProfile';
import { useEffect } from 'react';

const Settings: NextPage = () => {
  const { getUserProfileDetails, napaProfileId, getProfileIdFromLocalStorage } =
    useProfile();

  useEffect(() => {
    getProfileIdFromLocalStorage();
  }, []);

  useEffect(() => {
    if (napaProfileId) {
      getUserProfileDetails(napaProfileId);
    }
  }, [napaProfileId]);

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
