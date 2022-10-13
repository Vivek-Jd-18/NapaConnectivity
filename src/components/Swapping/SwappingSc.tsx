import Container from '../../Layout/Container/Container';
import Footer from '../Footer/Footer';
import styles from './SwappingSc.module.scss';
import React from 'react';
import Swapping from './Swapping';

export default function SwappingSc() {

  return (
    <div className={`${styles.container}`}>
      
        <Container className={`${styles.settingsContainer} asinnerContainer`}>
          <h1 className={styles.settings}>Swapping</h1>
          <Swapping />
        </Container>
      
      <div>
        <hr />
        <Footer footerIconShow={false} />
      </div>
    </div>
  );
}
