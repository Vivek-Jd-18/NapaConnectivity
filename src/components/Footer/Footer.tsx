/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Container from '../../Layout/Container/Container';
import styles from './Footer.module.scss';

import { scrollToNextSection } from '../../utils/home';
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

type FooterProps = {
  footerIconShow: boolean;
};

const Footer: NextPage<FooterProps> = ({ footerIconShow }) => {
  const { push } = useRouter();
  return (
    <footer>
      <div className={styles.container}>
        <Container>
          <div className={styles.footerContainer}>
            <div onClick={() => push('/')} className={styles.logo}>
              <img src={FooterLogoIcon} alt="FooterLogoIcon" />
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
                  <li>Marketplace</li>
                </Link>
                <Link href={'/earn'}>
                  <li>NAPA Earn</li>
                </Link>
                {/* <li>Leaderboards</li> */}
                {/* <li>Lauchpad</li> */}
                <Link href={'/help-center'}>
                  <li>Help Center</li>
                </Link>
              </ul>
            </div>

            <ul className={styles.footerMobileIconsContainer}>
              <li className={styles.footerMobileIconItem}>
                <Image
                  src={TwitterMobileIcon}
                  alt="twitter"
                  width={18}
                  height={18}
                />
              </li>
              <li className={styles.footerMobileIconItem}>
                <Image
                  src={DiscordMobileIcon}
                  alt="discord"
                  width={18}
                  height={18}
                />
              </li>
              <li className={styles.footerMobileIconItem}>
                <Image
                  src={GithubMobileIcon}
                  alt="github"
                  width={18}
                  height={18}
                />
              </li>
              <li className={styles.footerMobileIconItem}>
                <Image
                  src={MediumMobileIcon}
                  alt="medium"
                  width={18}
                  height={18}
                />
              </li>
            </ul>
            <ul className={styles.footerIconsContainer}>
              <li className={styles.footerIconItem}>
                <Image src={TwitterIcon} alt="twitter" width={32} height={30} />
              </li>
              <li className={styles.footerIconItem}>
                <Image src={DiscordIcon} alt="discord" width={32} height={30} />
              </li>
              <li className={styles.footerIconItem}>
                <Image src={GithubIcon} alt="github" width={32} height={30} />
              </li>
              <li className={styles.footerIconItem}>
                <Image src={MediumIcon} alt="medium" width={32} height={30} />
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
                <li className={styles.footerBottomText}>
                  <Link href="/faq">FAQ</Link>
                </li>
                <li className={styles.footerBottomText}>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </li>
                <li className={styles.footerBottomText}>
                  <Link href="/terms-conditions">Terms and Conditions</Link>
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
              <Image
                src={MouseIcon}
                onClick={() => scrollToNextSection('social-section-art')}
                width={50}
                height={50}
                alt="mouse"
              />
            </div>
          )}
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
