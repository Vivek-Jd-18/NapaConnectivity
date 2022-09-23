import Container from '../../Layout/Container/Container';
import Footer from '../Footer/Footer';
import styles from './SocialArt.module.scss';
import React from 'react';


export default function SocialArtSc() {

  return (
    <div className={`${styles.container}`}>
      <Container className={`${styles.settingsContainer} asinnerContainer`}>
        <h1 className={styles.settings}>Social Art</h1>
        
        
      </Container>
      <div>
        <hr />
        <Footer footerIconShow={false} />
      </div>
    </div>
  );
}
