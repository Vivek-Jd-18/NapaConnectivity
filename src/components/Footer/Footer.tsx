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
            <p className={styles.footerBottomText}>
              © 2018 - 2022 Napa Society
            </p>
            <div>
              <ul className={styles.footerListItem}>
                <li className={styles.footerBottomText}>FAQ</li>
                <li className={styles.footerBottomText}>Privacy Policy</li>
                <li className={styles.footerBottomText}>
                  Terms and Conditions
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Footer;
