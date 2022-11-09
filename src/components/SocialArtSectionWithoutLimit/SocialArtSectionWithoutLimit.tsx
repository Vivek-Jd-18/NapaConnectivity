import { MouseIcon } from '../../components/assets';
import Container from '../../Layout/Container/Container';
import { scrollToNextSection } from '../../utils/home';
import type { NextPage } from 'next';
import styles from './SocialArtSectionWithoutLimit.module.scss';
import Image from 'next/image';
import AnimateButton from '../AnimateButton/AnimateButton';
// you are using the footer for the bottom nav options when you should be importing a NavBarSection.tsx  //

const SocialArtSectionWithoutLimit: NextPage = () => {
  return (
    <div
      className={styles.backgroundImage}
      id="social-art-section-without-limit"
    >
      <div className="video_play_bx">
        <video data-autoPlay muted loop className="video_bg_hmpg">
          <source src="https://napa-website.s3.ap-southeast-1.amazonaws.com/coming_soon.mp4" />
        </video>
      </div>

      {/* <Steper steps={1} top={0} /> */}
      <Container className={`${styles.socialContainer} asinnerContainer`}>
        <div className={styles.socialContainerBody}>
          <div className={styles.innerSocialContainer}>
            <h1 className={styles.socialArt}>Social Art</h1>
            <h1 className={styles.withoutLimits}>without Limits</h1>
          </div>
          <div className={styles.innerSocialContainerRightSide}>
            <h6 className={styles.description}>
              <strong>Web3 Social Media Has Arrived</strong>

              {/* <strong>Blockchain Inspired Web3 Social Media Has Arrived</strong> */}
              {/* Welcome to the NAPA Society experience, we are the face of crypto social media in the web3 revolution! Join our society and turn your social media into social art, mint your social art in our social media app and earn NAPA tokens, buy and sell NFTs in the largest marketplace in the world */}
            </h6>
            <AnimateButton title="Get Started" link="/trending" />
          </div>
        </div>
        <div className={styles.mousePointer}>
          <Image
            src={MouseIcon}
            onClick={() => scrollToNextSection('napa-society')}
            width={50}
            height={50}
            alt="mouse"
          />
        </div>
      </Container>
    </div>
  );
};
export default SocialArtSectionWithoutLimit;
