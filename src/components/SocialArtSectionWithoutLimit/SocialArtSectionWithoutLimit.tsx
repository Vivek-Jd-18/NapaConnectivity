import { MouseIcon } from '../../components/assets';
import Container from '../../Layout/Container/Container';
import { scrollToNextSection } from '../../utils/home';
import type { NextPage } from 'next';
import HighlightButton from '../HighlightButton/HighlightButton';
import Steper from '../Steper/Steper';
import styles from './SocialArtSectionWithoutLimit.module.scss';
import Image from 'next/image';
// you are using the footer for the bottom nav options when you should be importing a NavBarSection.tsx  //

const SocialArtSectionWithoutLimit: NextPage = () => {
  return (
    <div
      className={styles.backgroundImage}
      id="social-art-section-without-limit"
    >
      <Steper steps={1} top={0} />
      <Container className={styles.socialContainer}>
        <div className={styles.socialContainerBody}>
          <div className={styles.innerSocialContainer}>
            <h1 className={styles.socialArt}>Social Art</h1>
            <h1 className={styles.withoutLimits}>without Limits</h1>
          </div>
          <div className={styles.innerSocialContainerRightSide}>
            <h6 className={styles.description}>
              <strong>Blockchain Inspired Web3 Social Media Has Arrived</strong>
            </h6>
            <HighlightButton title="NAPA Society" />
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
