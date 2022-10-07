import React from 'react'
import styles from './SupportSc.module.scss';
import Footer from '../Footer/Footer';
import Container from '../../Layout/Container/Container';

export default function SupportSc() {
  return (
    <>
    <div
      className={styles.WidthFull}
    >
      <Container
        className={`${styles.napaLoungeContainer} asinnerContainer`}
      >
        <div className={styles.MainContact}>
          <div className={styles.MainTextHelp}>
            <h1>Support</h1>
            <div className={styles.ContactUsMain}>
              <div className={styles.LeftContact}>
                <div className={styles.InputContact}>
                  <div className={styles.FrstInput}>
                    <p>Name</p>
                    <input type="text" placeholder='John Ridley' />
                  </div>
                  <div className={styles.FrstInput}>
                    <p>Email</p>
                    <input type="text" placeholder='john.ridley@gmail.com' />
                  </div>
                  <div className={styles.TextArea}>
                    <p>Describe Your Problem</p> 
                    <textarea></textarea>
                  </div>
                  <div className={styles.SendBtnn}>
                    <button>Send</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div className={styles.footerContainer}>
        <Footer footerIconShow={false} />
      </div>
    </div>
    </>
  )
}
