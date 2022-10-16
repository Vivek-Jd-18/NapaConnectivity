import React , {useState} from 'react';
import styles from './ContactUsSc.module.scss';
import Footer from '../Footer/Footer';
import Container from '../../Layout/Container/Container';
import Image from 'next/image';
import Link from 'next/link';
import Input from '../Input/Input';

export default function ContactUsSc() {
  const [name, setName] = useState('');
  const [namesec, setNamesec] = useState('');
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
            <div className={styles.StaylinkFrst}>
              <Link href="/help-center"><a> <Image src="/img/arrow_icon.svg" alt="" width="30px" height="16px"/>Back</a></Link>
            </div>
           <h1>Contact Us</h1>
            <div className={styles.ContactUsMain}>
              <div className={styles.LeftContact}>
                <div className={styles.InputContact}>
                   <div className={styles.FrstInput}>
                      <Input
                          value={name}
                          type="text"
                          placeholder="John Ridley"
                          label="Name"
                          onChange={(e) => setName(e.target.value)}
                      />
                  </div>
                  <div className={styles.FrstInput}>
                      <Input
                          value={namesec}
                          type="text"
                          placeholder="john.ridley@gmail.com"
                          label="Email"
                          onChange={(e) => setNamesec(e.target.value)}
                      />
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
                  <Link href="https://twitter.com/NapaSociety"><a><Image src="/img/twitter_icon.png" alt="" width={24} height={24} /></a></Link>
                  <Link href="https://discord.gg/pV2vxbkqpb"><a><Image src="/img/discord_icon.png" alt="" width={24} height={24} /></a></Link>
                  <Link href="https://github.com/NAPA-Society"><a><Image src="/img/github_icon.png" alt="" width={24} height={24} /></a></Link>
                  <Link href="https://medium.com/@Napa_Society"><a className={styles.lastIcon}><Image src="/img/medium_icon.png" alt="" width={24} height={24} /></a></Link>
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
