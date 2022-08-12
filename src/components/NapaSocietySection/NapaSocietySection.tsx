import Container from '@/Layout/Container/Container';
import type { NextPage } from 'next';
import { useState } from 'react';
import Header from '../Header/Header';
import Steper from '../Steper/Steper';
import styles from './NapaSocietySection.module.scss';

const NapaSociety: NextPage = () => {
  const [slider, setSlider] = useState(1);

  const handleIncrement = () => {
    if (slider > 3) {
      return;
    }
    setSlider(slider + 1);
  };

  const handleDecrement = () => {
    if (slider < 2) {
      return;
    }
    setSlider(slider - 1);
  };

  return (
    <div className={styles.backgroundImage}>
      <Header />
      <Steper steps={2} />
      <Container className={styles.societyContainer}>
        <div className={styles.innerSocietyContainer}>
          <h1 className={styles.heading1}>NAPA</h1>
          <h1 className={styles.heading2}>Society</h1>
          <p className={styles.societyLeftDescription}>
            Join our society and turn your
            social media into social art, mint your social art in our social
            media app into NFTs and earn NAPA tokens and buy and sell NFTs in
            the largest marketplace in the world!
          </p>
        </div>
        <div className={styles.innerSocietyContainerRightSide}>
          <h1 className={styles.heading3}>0{slider}</h1>
          <div className={styles.sliderContainer}>
            <div onClick={handleDecrement}>
              <img src="/assets/images/left-arrow-white.svg" />
            </div>
            <div className={styles.sliderText}>
              <p className={styles.sliderText1}>0{slider}</p>
              <p className={styles.sliderText2}>/</p>
              <p className={styles.sliderText2}>04</p>
            </div>
            <div onClick={handleIncrement}>
              <img src="/assets/images/right-arrow-white.svg" />
            </div>
          </div>
          <h3 className={styles.communityHeading}>NAPA</h3>
          {/* // Insert the following headings and sections 01 Community, 02 Trending, 03 Leaderboard, 04 The Lounge
          We will need mini images for sections 2, 3 and 4 
          
          01 Community
          02 Trending */}
          
          <h6 className={styles.description}>
          <strong>Visit the NAPA Community!<br></br> See What is Trending!</strong>
          </h6>
          <div className={styles.joinSociety}>
            <button className={styles.joinSocietyBtn}>Community</button>
            <img src="/assets/images/arrow_right.svg" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NapaSociety;
