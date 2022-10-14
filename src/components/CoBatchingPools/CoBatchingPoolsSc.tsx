import Container from '../../Layout/Container/Container';
import Footer from '../Footer/Footer';
import styles from './CoBatchingPoolsSc.module.scss';
import React from 'react';
import CoBetchingPools from './CoBetchingPools';


export default function CoBatchingPoolsSc() {

  return (
    <div className={`${styles.container}`}>
      
        <Container className={`${styles.settingsContainer} asinnerContainer`}>
          <h1 className={styles.settings}>Co-Batching Pools</h1>
          <CoBetchingPools />
        </Container>
      
      <div>
        <hr />
        <Footer footerIconShow={false} />
      </div>
    </div>
  );
}
