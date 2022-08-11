import Container from '@/Layout/Container/Container';
import type { NextPage } from 'next';
import Header from '../Header/Header';
import Steper from '../Steper/Steper';
import styles from './NapaSocietySection.module.scss';

const NapaSociety: NextPage = () => {
  return (
    <div className={styles.backgroundImage}>
      <Header />
      <Steper steps={2} />
      <Container className={styles.societyContainer}>
        <div className={styles.innerSocietyContainer}>
          <h1 className={styles.heading1}>NAPA</h1>
          <h1 className={styles.heading2}>Society</h1>
          <p className={styles.societyLeftDescription}>
            NAPA Society is a community driven by those that chose to take back
            control of their social art and develop their own pathways to the
            future of digital social connectivity. Be the first to know what’s
            trending in the world around you and be more than a contributor, be
            on the forefront of the movement. Login and see what’s trending now!
          </p>
        </div>
        <div className={styles.innerSocietyContainerRightSide}>
          <h1 className={styles.heading3}>02</h1>

          <h3 className={styles.communityHeading}>Community</h3>
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
    </div>
  );
};
export default NapaSociety;
