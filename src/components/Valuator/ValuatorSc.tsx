import Container from '../../Layout/Container/Container';
import Footer from '../Footer/Footer';
import styles from './ValuatorSc.module.scss';
import React from 'react';
import ValuatorTabTwo from './ValuatorTabTwo';

export default function ValuatorSc() {

  return (
    <div className={`${styles.container}`}>
      
        <Container className={`${styles.settingsContainer} asinnerContainer`}>
          <h1 className={styles.settings}>NAPA Valuator</h1>
          <ValuatorTabTwo />
        </Container>
      
      <div>
        <hr />
        <Footer footerIconShow={false} />
      </div>
    </div>
  );
}
