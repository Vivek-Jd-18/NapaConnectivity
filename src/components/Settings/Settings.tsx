import { settingsTab } from '../../constants/settings.constants';
import Container from '../../Layout/Container/Container';
import type { NextPage } from 'next';
import { useState } from 'react';
import Footer from '../Footer/Footer';
import Tab from '../Tab/Tab';
import GeneralTab from './GeneralTab/GeneralTab';
import styles from './Settings.module.scss';
import WhitelistTab from './WhitelistTab/WhitelistTab';

const SettingsComponent: NextPage = () => {
  const [tab, setTab] = useState('General');

  return (
    <div className={styles.container}>
      <Container className={styles.settingsContainer}>
        <h1 className={styles.settings}>User Settings</h1>
        <div className={styles.tabsContainer}>
          <div className={styles.tabsInnerContainer}>
            <ul className={styles.tab}>
              {settingsTab.map(({ title }, index) => (
                <Tab key={index} setTab={setTab} title={title} tab={tab} />
              ))}
            </ul>
          </div>
        </div>
        {tab === 'General' ? <GeneralTab /> : <WhitelistTab />}
      </Container>
      <div>
        <hr />
        <Footer footerIconShow={false} />
      </div>
    </div>
  );
};

export default SettingsComponent;
