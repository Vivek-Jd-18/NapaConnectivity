import styles from './Footer.module.scss';
import type { NextPage } from 'next';
import Container from '@/Layout/Container/Container';

type Props = {
  show?: boolean;
};

const Footer: NextPage<Props> = ({ show }) => {
  return (
    <>
      <div className={styles.container}>
        <Container>
          <div className={styles.footerContainer}>
            <div className={styles.leftSideFooterContainer}>
              <ul className={styles.footerListItem}>
                <li>Society</li>
                <li>Social Art</li>
                <li>NFT Marketplace</li>
                <li>Earn</li>
                <li>Leaders</li>
                <li>Lauchpad</li>
                {/* <li>Help Center</li> */}
              </ul>
              <img src="/assets/images/mouse.svg" />
            </div>
            <ul className={styles.footerListItem}>
              <li className={styles.footerIcon}>
                <img src="/assets/images/facebook.svg" />
              </li>
              <li className={styles.footerIcon}>
                <img src="/assets/images/instagram.svg" />
              </li>
              <li className={styles.footerIcon}>
                <img src="/assets/images/twitter.svg" />
              </li>
            </ul>
          </div>
        </Container>
      </div>
      {show && (
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
      )}
    </>
  );
};

export default Footer;
