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
            NAPA Society is a community driven by those that chose to take back
            control of their social art and develop their own pathways to the
            future of digital social connectivity. Be the first to know what’s
            trending in the world around you and be more than a contributor, be
            on the forefront of the movement. Login and see what’s trending now!
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
          <h3 className={styles.communityHeading}>Community</h3>
          <h6 className={styles.description}>
            However venture pursuit he am mr cordial. Forming musical am hearing
            studied be luckily. Ourselves for determine attending how led
            gentleman sincerity.
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
