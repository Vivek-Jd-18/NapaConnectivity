import Container from '../../Layout/Container/Container';
import Footer from '../Footer/Footer';
import styles from './LaunchpadDatalsSc.module.scss';
import React from 'react';
// import CreateNewNFTTow from './CreateNewNFTTow';

export default function LaunchpadDatalsSc() {
  return (
    <div className={`${styles.container}`}>
      <Container className={`${styles.settingsContainer} asinnerContainer`}>
        {/* <div className={styles.pdingTop}>
          sdgg
        </div> */}
        <div className={styles.pdingTop}>
          
        </div>
      </Container>
      <div>
        <hr />
        <Footer footerIconShow={false} />
      </div>
    </div>
  );
}
