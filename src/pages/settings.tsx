import type { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import SettingsComponent from '../components/Settings/Settings';
import styles from '../../styles/pages/Settings.module.scss';
import { getAlreadyConnectedWeb3 } from '@/utils/wallet';
import { toast } from 'react-toastify';
import { CustomToastWithLink } from '@/components/CustomToast/CustomToast';
import { SwapIcon } from '@/components/assets';

const Settings: NextPage = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [account, setAccount] = useState('');

  const openMenu = () => {
    setIsMenu(true);
  };

  const getAccounts = useCallback(async () => {
    try {
      const accounts: any = await getAlreadyConnectedWeb3();
      setAccount(accounts[0]);
    } catch (error: any) {
      toast.error(
        CustomToastWithLink({
          icon: SwapIcon,
          title: error.message,
          time: 'Now',
        })
      );
    }
  }, []);

  useEffect(() => {
    getAccounts();
  }, []);

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
