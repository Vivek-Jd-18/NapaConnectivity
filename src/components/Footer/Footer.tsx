import styles from './Footer.module.scss';
import type { NextPage } from 'next';
import Container from '@/Layout/Container/Container';
import { MouseIcon, FacebookIcon, InstagramIcon, TwitterIcon } from '@/index';

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
                <li>NAPA Society</li>
                <li>Social Art</li>
                <li>NFT Marketplace</li>
                <li>NAPA Earn</li>
                <li>Leaderboards</li>
                <li>Lauchpad</li>
                <li>Help Center</li>
              </ul>
              {/* <img src={MouseIcon} /> */}
            </div>
            <ul className={styles.footerListItem}>
              <li className={styles.footerIconItem}>
                <img src={FacebookIcon} />
              </li>
              <li className={styles.footerIconItem}>
                <img src={InstagramIcon} />
              </li>
              <li className={styles.footerIconItem}>
                <img src={TwitterIcon} />
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
