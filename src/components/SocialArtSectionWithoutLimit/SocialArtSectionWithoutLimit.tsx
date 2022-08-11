import Container from '@/Layout/Container/Container';
import type { NextPage } from 'next';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Steper from '../Steper/Steper';
import styles from './SocialArtSectionWithoutLimit.module.scss';

const SocialArtSectionWithoutLimit: NextPage = () => {
  return (
    <div className={styles.backgroundImage}>
      <Header />
      <Steper />
      <Container className={styles.socialContainer}>
        <div className={styles.innerSocialContainer}>
          <h1 className={styles.heading1}>Social Art</h1>
          <h1 className={styles.heading2}>without Limits</h1>
        </div>
        <div className={styles.innerSocialContainerRightSide}>
          <h6 className={styles.description}>
            Welcome to the NAPA Society experience! We are the face of crypto
            social media in the web3 revolution! Join our society and turn your
            social media into social art, mint your social art in our social
            media app into NFT's and earn NAPA tokens, and buy and sell NFTs in
            the largest marketplace in the world!
          </h6>
          <div className={styles.joinSociety}>
            <button className={styles.joinSocietyBtn}>Join Society</button>
            <img src="/assets/images/arrow_right.svg" />
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};
export default SocialArtSectionWithoutLimit;
