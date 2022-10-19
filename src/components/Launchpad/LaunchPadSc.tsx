import Container from '../../Layout/Container/Container';
import Footer from '../Footer/Footer';
import styles from './LaunchPadSc.module.scss';
import React from 'react';
import LaunchPad from './LaunchPad';

export default function LaunchPadSc() {
  return (
    <div className={`${styles.container}`}>
      <div className={styles.OverLayLaunchpad}>
        <Container className={`${styles.settingsContainer} asinnerContainer`}>
        <div className={`${styles.StaylinkFrst}`}>
            {/* <Link href="/marketplace"><a> <Image src="/img/arrow_icon.svg" alt="" width="18px" height="12px"/>Marketplace</a></Link> */}
          {/* </div>
            <h1 className={styles.settings}>Create New NFT</h1>
          <div> */}
            <LaunchPad />
          </div>
        </Container>
      </div>
      <div>
        <hr />
        <Footer footerIconShow={false} />
      </div>
    </div>
  );
}
