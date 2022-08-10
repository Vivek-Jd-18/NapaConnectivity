import Container from '@/Layout/Container/Container';
import { Tabs } from 'antd';
import type { NextPage } from 'next';
import { useState } from 'react';
import Button from '../Button/Button';
import styles from './Header.module.scss';

const { TabPane } = Tabs;

const Header: NextPage = () => {
  const [tabIndex, setTabIndex] = useState('0');

  const onChange = (key: string) => {
    setTabIndex(key);
  };

  return (
    <>
      <div className={styles.container}>
        <Container className={styles.innerContainer}>
          <img src="https://napa-website.s3.ap-southeast-1.amazonaws.com/transparent-white" className={styles.logo} />
          <Tabs
            activeKey={tabIndex}
            onChange={onChange}
            style={{ marginTop: '1rem' }}
          >
            <TabPane tab="NAPA Society" key="1" tabKey="1" />
            <TabPane tab="Social Art" key="2" tabKey="2" />
            <TabPane tab="NFT Marketplace" key="3" tabKey="3" />
            <TabPane tab="NFT Marketplace" key="4" tabKey="4" />
          </Tabs>
          <div className={styles.rightSide}>
            <img src="assets/search.svg" style={{ marginRight: '1.625rem' }} />
            <Button text="Connect Wallet" />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
