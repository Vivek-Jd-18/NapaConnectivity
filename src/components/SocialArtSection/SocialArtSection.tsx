import {
  Avatar,
  Carousel,
  MouseIcon,
  RightArrowBlueIcon,
} from '@/components/assets';
import Container from '@/Layout/Container/Container';
import type { NextPage } from 'next';
import Steper from '../Steper/Steper';
import styles from './SocialArtSection.module.scss';
//import image1 from .... (asset location in S3 bucket) ASSETS SHOULD BE IMPORTED AND DEFINED, DO NOT HARDCODE ASSETS PLEASE

type SocialArtSectionProps = {
  isMenu: boolean;
};

const SocialArtSection: NextPage<SocialArtSectionProps> = ({ isMenu }) => {
  return (
    <div className={styles.backgroundImage}>
      {!isMenu && <Steper steps={3} top={12} />}
      <Container className={styles.socialArtContainer}>
        <div className={styles.socialArtContainerBody}>
          <div className={styles.carouselImage}>
            <img src={Carousel} alt="" className={styles.image} />
            <div className={styles.slideBtn}>
              <div className={styles.carouselBottom}>
                <img src={Avatar} alt="" className={styles.avatar} />
                <span className={styles.carouselBottomText}>
                  Clinton Bowman
                </span>
              </div>
              <span>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 31.5C24.5604 31.5 31.5 24.5604 31.5 16C31.5 7.43959 24.5604 0.5 16 0.5C7.43959 0.5 0.5 7.43959 0.5 16C0.5 24.5604 7.43959 31.5 16 31.5Z"
                    stroke="white"
                  />
                  <circle cx="16" cy="16" r="3" fill="white" />
                </svg>
              </span>
              <span>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="16" cy="16" r="3" fill="white" />
                </svg>
              </span>
              <span>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="16" cy="16" r="3" fill="white" />
                </svg>
              </span>
              <span>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="16" cy="16" r="3" fill="white" />
                </svg>
              </span>
              <span>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="16" cy="16" r="3" fill="white" />
                </svg>
              </span>
            </div>
            <div className={styles.innerSocietyContainer}></div>
          </div>
          <div className={styles.innerSocietyContainerRightSide}>
            <div className={styles.socialHeading}>
              <h2 className={styles.socialText}>Social</h2>
              <h2 className={styles.artText}>Art</h2>
            </div>
            <p className={styles.description}>
              <strong>
                The NAPA Social Media App is the worlds only social media
                platform that allows you to mint and monetize your posts in real
                time to receive NAPA Tokens
              </strong>
              .<br />
              <br />
              <strong>
                Choose your audience and share your social art with millions of
                members of the NAPA Society community!
              </strong>
            </p>
            <div className={styles.viewFeedContainer}>
              <button className={styles.viewFeedBtn}>Gallery</button>
              {/* Add pop up message with the option to download our app from the App Store or Google Play Store */}
              <img src={RightArrowBlueIcon} />
            </div>
          </div>
        </div>
        <div className={styles.mousePointer}>
          <img src={MouseIcon} />
        </div>
      </Container>
    </div>
  );
};

export default SocialArtSection;
