import { settingsTab } from '@/constants/settings.constants';
import { useWeb3 } from '@/hooks/useWeb3';
import Container from '@/Layout/Container/Container';
import type { NextPage } from 'next';
import { useState } from 'react';
import Footer from '../Footer/Footer';
import Tab from '../Tab/Tab';
import GeneralTab from './GeneralTab/GeneralTab';
import styles from './Settings.module.scss';
import WhitelistTab from './WhitelistTab/WhitelistTab';

const SettingsComponent: NextPage = () => {
  const [tab, setTab] = useState('General');

  const { account } = useWeb3();

  return (
    <div className={styles.container}>
      <Container className={styles.settingsContainer}>
        <h1 className={styles.settings}>Settings</h1>
        <div className={styles.tabsContainer}>
          <div className={styles.tabsInnerContainer}>
            <ul className={styles.tab}>
              {settingsTab.map(({ title }, index) => (
                <Tab key={index} setTab={setTab} title={title} tab={tab} />
              ))}
            </ul>
          </div>
        </div>
        {tab === 'General' ? <GeneralTab account={account} /> : <WhitelistTab />}
      </Container>
      <div>
        <hr />
        <Footer footerIconShow={false} />
      </div>
    </div>
  );
};

export default SettingsComponent;
