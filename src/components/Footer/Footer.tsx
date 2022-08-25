import styles from './Footer.module.scss';
import type { NextPage } from 'next';
import Container from '../../Layout/Container/Container';
import {
  TwitterIcon,
  DiscordIcon,
  GithubIcon,
  MediumIcon,
  FooterLogoIcon,
  MouseIcon,
  TwitterMobileIcon,
  DiscordMobileIcon,
  GithubMobileIcon,
  MediumMobileIcon,
} from '../../components/assets';
import { scrollToNextSection } from '../../utils/home';
import { useRouter } from 'next/router';
import Link from 'next/link';

type FooterProps = {
  footerIconShow: boolean;
};

const Footer: NextPage<FooterProps> = ({ footerIconShow }) => {
  const { push } = useRouter();
  return (
    <div>
      <div className={styles.container}>
        <Container>
          <div className={styles.footerContainer}>
            <div onClick={() => push('/')} className={styles.logo}>
              <img src={FooterLogoIcon} />
            </div>
            <div className={styles.footerItemContainer}>
              <ul
                className={`${styles.footerListItem} ${styles.activeFooterListItem}`}
              >
                <Link href={'/home'}>
                  <li>NAPA Society</li>
                </Link>
                <Link href={'/socialart'}>
                  <li>Social Art</li>
                </Link>
                <Link href={'/marketplace'}>
                  <li>NFT Marketplace</li>
                </Link>
                {/* <li>NAPA Earn</li> */}
                {/* <li>Leaderboards</li> */}
                {/* <li>Lauchpad</li> */}
                <Link href={'/support'}>
                  <li>Help Center</li>
                </Link>
              </ul>
            </div>
            <ul className={styles.footerMobileIconsContainer}>
              <li className={styles.footerMobileIconItem}>
                <img src={TwitterMobileIcon} />
              </li>
              <li className={styles.footerMobileIconItem}>
                <img src={DiscordMobileIcon} />
              </li>
              <li className={styles.footerMobileIconItem}>
                <img src={GithubMobileIcon} />
              </li>
              <li className={styles.footerMobileIconItem}>
                <img src={MediumMobileIcon} />
              </li>
            </ul>
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
              <Link href={'/home'}>
                <li>NAPA Society</li>
              </Link>
              <Link href={'/socialart'}>
                <li>Social Art</li>
              </Link>
              <Link href={'/marketplace'}>
                <li>NFT Marketplace</li>
              </Link>
              {/* <li>NAPA Earn</li> */}
              {/* <li>Leaderboards</li> */}
              {/* <li>Lauchpad</li> */}
              <Link href={'/support'}>
                <li>Help Center</li>
              </Link>
            </ul>
          </div>
        </Container>
      </div>
      <div className={styles.footerListMobile}>
        <Container>
          <ul
            className={`${styles.footerListItem} ${styles.activeFooterListItem}`}
          >
            <Link href={'/home'}>
              <li>NAPA Society</li>
            </Link>
            <Link href={'/socialart'}>
              <li>Social Art</li>
            </Link>
            <Link href={'/marketplace'}>
              <li>NFT Marketplace</li>
            </Link>
            {/* <li>NAPA Earn</li> */}
            {/* <li>Leaderboards</li> */}
            {/* <li>Lauchpad</li> */}
            <Link href={'/support'}>
              <li>Help Center</li>
            </Link>
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
          {footerIconShow && (
            <div
              className={styles.mouseIcon}
              onClick={() =>
                scrollToNextSection('social-art-section-without-limit')
              }
            >
              <img src={MouseIcon} />
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Footer;
