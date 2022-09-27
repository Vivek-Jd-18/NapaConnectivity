import Container from '../../Layout/Container/Container';
import Footer from '../Footer/Footer';
import styles from './Events.module.scss';
import React from 'react';
// import Image from 'next/image';
import Cardlist from './Cardlist';

export default function EventsList() {
  return (
    <>
    <div className={`${styles.container}`}>
      <Container className={`${styles.settingsContainer} asinnerContainer`}>
        <h1 className={styles.settings}>Events</h1>
        <div className={styles.EventsListcrol}>
            <div className={styles.EventsListOvrl}>
                <div className={styles.EventsListGridBx}>
                    <div><Cardlist /></div>                                       
                    <div><Cardlist /></div>                                       
                    <div><Cardlist /></div>                                       
                    <div><Cardlist /></div> 
                    <div><Cardlist /></div>                                       
                    <div><Cardlist /></div>                                       
                    <div><Cardlist /></div>                                       
                    <div><Cardlist /></div>                                      
                </div>
            </div>
        </div>
        
      </Container>
      <div>
        <hr />
        <Footer footerIconShow={false} />
      </div>
    </div>
    </>
  )
}
