import React from 'react'
import styles from './ContactUsSc.module.scss';
import Footer from '../Footer/Footer';
import Container from '../../Layout/Container/Container';
import Image from 'next/image';
import Link from 'next/link';

export default function ContactUsSc() {
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
           <h1>Contact Us</h1>
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
                    <p>Message</p> 
                    <textarea></textarea>
                  </div>
                  <div className={styles.SendBtnn}>
                    <button>Send</button>
                  </div>
                </div>
              </div>
              <div className={styles.RightContact}>
                <p>Contact us for more information on our platform.</p>
                <span>Email</span>
                <h5>info@napasociety.io</h5>
                <div className={styles.SocialLinks}>
                  <a><Image src="/img/twitter_icon.png" alt="" width={24} height={24} /></a>
                  <a><Image src="/img/discord_icon.png" alt="" width={24} height={24} /></a>
                  <a><Image src="/img/github_icon.png" alt="" width={24} height={24} /></a>
                  <a className={styles.lastIcon}><Image src="/img/medium_icon.png" alt="" width={24} height={24} /></a>
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
