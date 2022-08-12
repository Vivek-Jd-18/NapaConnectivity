import Container from '@/Layout/Container/Container';
import type { NextPage } from 'next';
import Header from '../Header/Header';
import Steper from '../Steper/Steper';
import styles from './SocialArtSection.module.scss';
//import image1 from .... (asset location in S3 bucket) ASSETS SHOULD BE IMPORTED AND DEFINED, DO NOT HARDCODE ASSETS PLEASE

const SocialArtSection: NextPage = () => {
  return (
    <div className={styles.backgroundImage}>
      <Header />
      <Steper steps={3} />
      <Container className={styles.societyContainer}>
        <div className={styles.carouselImage}>
          <img src="/assets/images/carousel.svg" alt="" />
          <div className={styles.slideBtn}>
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
        </div>
        <div className={styles.innerSocietyContainer}></div>
        <div className={styles.innerSocietyContainerRightSide}>
          <h2 className={styles.heading1}>Social</h2>
          <h2 className={styles.heading2}>Art</h2>
          <p className={styles.description}>
            <strong>The NAPA Social Media App is the worlds only social media platform
            that allows you to mint and monetize your posts in real time to
            receive NAPA Tokens</strong>. 
            <br></br>
            <br></br>
            <strong>Choose your audience and share your social art
            with millions of members in the NAPA Society community!</strong>
          </p>
          <div className={styles.viewFeedContainer}>
            <button className={styles.viewFeedBtn}>Post Without Limits</button> 
            {/* Add pop up message with the option to download our app from the App Store or Google Play Store */}
            <img src="/assets/images/arrow_right.svg" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SocialArtSection;
