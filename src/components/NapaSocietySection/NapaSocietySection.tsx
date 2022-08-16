import {
  LeftWhiteArrowIcon,
  MouseIcon,
  RightArrowBlueIcon,
  RightWhiteArrowIcon,
} from '@/components/assets/index';
import Container from '@/Layout/Container/Container';
import type { NextPage } from 'next';
import { useState } from 'react';
import HighlightButton from '../HighlightButton/HighlightButton';
import Steper from '../Steper/Steper';
import styles from './NapaSocietySection.module.scss';

type NapaSocietyProps = {
  isMenu: boolean;
};

const NapaSociety: NextPage<NapaSocietyProps> = ({ isMenu }) => {
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
      {!isMenu && <Steper steps={2} top={5} />}
      <Container className={styles.societyContainer}>
        <div className={styles.societyContainerBody}>
          <div className={styles.innerSocietyContainer}>
            <h1 className={styles.headingNapa}>NAPA</h1>
            <h1 className={styles.headingSociety}>Society</h1>
            <p className={styles.societyLeftDescription}>
              Join our society and turn your social media into social art, mint
              your social art in our social media app into NFTs and earn NAPA
              tokens and buy and sell NFTs in the largest marketplace in the
              world!
            </p>
          </div>
          <div className={styles.innerSocietyContainerRightSide}>
            <div className={styles.slider}>
              <h1 className={styles.headingSlider}>0{slider}</h1>
              <div>
                <div className={styles.sliderContainer}>
                  <div onClick={handleDecrement}>
                    <img
                      src={LeftWhiteArrowIcon}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                  <div className={styles.sliderText}>
                    <p className={styles.sliderCounterText}>0{slider}</p>
                    <p className={styles.sliderSlashtext}>/</p>
                    <p className={styles.sliderSlashtext}>04</p>
                  </div>
                  <div onClick={handleIncrement}>
                    <img
                      src={RightWhiteArrowIcon}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                </div>
                {slider === 1 ? (
                  <h3 className={styles.community}>Lounge</h3>
                ) : slider === 2 ? (
                  <h3 className={styles.community}>Trending</h3>
                ) : slider === 3 ? (
                  <h3 className={styles.community}>Leaders</h3>
                ) : (
                  <h3 className={styles.community}>Events</h3>
                )}
              </div>
            </div>

            {/* // Insert the following headings and sections 01 Community, 02 Trending, 03 Leaderboard, 04 The Lounge
          We will need mini images for sections 2, 3 and 4 */}
            {slider === 1 ? (
              <div>
                <h6 className={styles.description}>
                  <strong>Checkout the NAPA Lounge!</strong>
                </h6>
                <HighlightButton title="Visit Lounge" />
              </div>
            ) : slider === 2 ? (
              <div>
                <h6 className={styles.description}>
                  <strong>{/* // Insert Mini Trending Window // */}</strong>
                </h6>
                <HighlightButton title="Get Updates" />
              </div>
            ) : slider === 3 ? (
              <div>
                <h6 className={styles.description}>
                  <strong>{/* // Insert Mini Leaders List// */}</strong>
                </h6>
                <HighlightButton title="Whats Hot" />
              </div>
            ) : (
              <div>
                <h6 className={styles.description}>
                  <strong>{/* // Display Next Event Image // */}</strong>
                </h6>
                <HighlightButton title="Upcoming Events" />
              </div>
            )}
          </div>
        </div>
        <div className={styles.mousePointer}>
          <img src={MouseIcon} />
        </div>
      </Container>
    </div>
  );
};

export default NapaSociety;
