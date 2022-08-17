import styles from './Footer.module.scss';
import type { NextPage } from 'next';
import Container from '@/Layout/Container/Container';
import {
  TwitterIcon,
  DiscordIcon,
  GithubIcon,
  MediumIcon,
  FooterLogoIcon,
} from '@/components/assets/index';

const Footer: NextPage = () => {
  return (
    <div>
      <div className={styles.container}>
        <Container>
          <div className={styles.footerContainer}>
            <img src={FooterLogoIcon} />
            <div className={styles.footerItemContainer}>
              <ul
                className={`${styles.footerListItem} ${styles.activeFooterListItem}`}
              >
                <li>NAPA Society</li>
                <li>Social Art</li>
                <li>NFT Marketplace</li>
                <li>NAPA Earn</li>
                <li>Leaderboards</li>
                <li>Lauchpad</li>
                <li>Help Center</li>
              </ul>
            </div>
            <ul className={styles.footerIconsContainer}>
              <li className={styles.footerIconItem}>
                <img src={TwitterIcon} />
              </li>
              <li className={styles.footerIconItem}>
                <img src={DiscordIcon} />
              </li>
              <li className={styles.footerIconItem}>
                <img src={GithubIcon} />
              </li>
              <li className={styles.footerIconItem}>
                <img src={MediumIcon} />
              </li>
            </ul>
          </div>
          <div className={styles.footerItemsBlockContainer}>
            <ul
              className={`${styles.footerListItem} ${styles.activeFooterListItem}`}
            >
              <li>NAPA Society</li>
              <li>Social Art</li>
              <li>NFT Marketplace</li>
              <li>NAPA Earn</li>
              <li>Leaderboards</li>
              <li>Lauchpad</li>
              <li>Help Center</li>
            </ul>
          </div>
        </Container>
      </div>
      <div className={styles.footerListMobile}>
        <Container>
          <ul
            className={`${styles.footerListItem} ${styles.activeFooterListItem}`}
          >
            <li>Society</li>
            <li>Social Art</li>
            <li>NFT Marketplace</li>
            <li>Earn</li>
            <li>Leaders</li>
            <li>Lauchpad</li>
          </ul>
        </Container>
      </div>
      <div className={styles.footerBottomContainer}>
        <Container>
          <div className={styles.footerContainer}>
            <p className={styles.footerBottomText}>
              ©2022 NAPA Society Limited
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
    </div>
  );
};

export default Footer;
