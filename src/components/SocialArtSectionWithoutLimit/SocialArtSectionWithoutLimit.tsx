import Container from '@/Layout/Container/Container';
import type { NextPage } from 'next';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Steper from '../Steper/Steper';
import styles from './SocialArtSectionWithoutLimit.module.scss';
// you are using the footer for the bottom nav options when you should be importing a NavBarSection.tsx  //

const SocialArtSectionWithoutLimit: NextPage = () => {
  return (
    <div className={styles.backgroundImage}>
      <Header />
      <Steper steps={1} />
      <Container className={styles.socialContainer}>
        <div className={styles.innerSocialContainer}>
          <h1 className={styles.socialArt}>Social Art</h1>
          <h1 className={styles.withoutLimits}>without Limits</h1>
        </div>
        <div className={styles.innerSocialContainerRightSide}>
          <h6 className={styles.description}>
            <strong>Welcome to NAPA Society!<br></br>
            We Are The Face of Social Media In The Web3 Revolution!</strong>
          </h6>
          <div className={styles.joinSociety}>
            <button className={styles.joinSocietyBtn}>Join NAPA</button>
            <img src="/assets/images/arrow_right.svg" />
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};
export default SocialArtSectionWithoutLimit;
