import styles from './Footer.module.scss';
import type { NextPage } from 'next';
import Container from '@/Layout/Container/Container';

const Footer: NextPage = () => {
  return (
    <>
      <div className={styles.container}>
        <Container>
          <div className={styles.footerContainer}>
            <div className={styles.footerImageContainer}>
              <img src="assets/logo.svg" className={styles.footerImage} />
            </div>
            <ul className={styles.footerListItem}>
              <li>NAPA Society</li>
              <li>Social Art</li>
              <li>NFT Marketplace</li>
              <li>NAPA Earn</li>
              <li>Contact Us</li>
              <li>Support</li>
            </ul>
            <ul className={styles.footerListItem}>
              <li className={styles.footerIcon}>
                <img src="assets/facebook.svg" />
              </li>
              <li className={styles.footerIcon}>
                <img src="assets/instagram.svg" />
              </li>
              <li className={styles.footerIcon}>
                <img src="assets/twitter.svg" />
              </li>
            </ul>
          </div>
        </Container>
      </div>
      <div className={styles.container}>
        <Container>
          <div className={styles.footerContainer}>
            <span>© 2018 - 2022 Napa Society</span>
            <div>
              <ul className={styles.footerListItem}>
                <li>FAQ</li>
                <li>Privacy Policy</li>
                <li>Terms and Conditions</li>
              </ul>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Footer;
