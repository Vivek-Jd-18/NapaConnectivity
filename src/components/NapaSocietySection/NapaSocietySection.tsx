import { LeftWhiteArrowIcon, MouseIcon, RightWhiteArrowIcon } from '../assets';
import Container from '../../Layout/Container/Container';
import { scrollToNextSection } from '../../utils/home';
import type { NextPage } from 'next';
import { useState } from 'react';
import HighlightButton from '../HighlightButton/HighlightButton';
import Steper from '../Steper/Steper';
import styles from './NapaSocietySection.module.scss';
import Image from 'next/image';

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
    <div id="napa-society" className={styles.backgroundImage}>
      <Steper steps={2} top={5} />
      <Container className={styles.societyContainer}>
        <div className={styles.societyContainerBody}>
          <div className={styles.innerSocietyContainer}>
            <h1 className={styles.headingNapa}>NAPA</h1>
            <h1 className={styles.headingSociety}>Society</h1>
            <p className={styles.societyLeftDescription}>
              
                Join our society and turn your social media into social art,
                mint your social art in our social media app into NFTs and earn
                NAPA tokens and buy and sell NFTs in the largest marketplace in
                the world!
             
            </p>
          </div>
          <div className={styles.innerSocietyContainerRightSide}>
            <div className={styles.slider}>
              {/* <h1 className={styles.headingSlider}>0{slider}</h1> */}
              <div className={styles.sliderRightSide}>
                <div className={styles.sliderContainer}>
                  
                  <div className={styles.sliderText}>
                    <p className={styles.sliderCounterText}>0{slider}</p>
                    <p className={styles.sliderSlashtext}>/</p>
                    <p className={styles.sliderSlashtext}>04</p>
                  </div>
                  <div className={styles.sliderArrows}>
                  <div onClick={handleDecrement}>
                    <Image
                      src={LeftWhiteArrowIcon}
                      style={{ cursor: 'pointer' }}
                      width={14}
                      height={26}
                      alt="arrow left"
                    />
                  </div>
                  <div onClick={handleIncrement}>
                    <Image
                      src={RightWhiteArrowIcon}
                      style={{ cursor: 'pointer' }}
                      width={14}
                      height={26}
                      alt="arrow right"
                    />
                  </div>
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
                  {/* <strong>Checkout the NAPA Lounge!</strong> */}
                </h6>
                <div className={styles.slideImages}><img src='assets/images/image-lounge.jpg'></img></div>
                <HighlightButton title="Visit NAPA Lounge" />
              </div>
            ) : slider === 2 ? (
              <div>
                <h6 className={styles.description}>
                  <strong>{/* // Insert Mini Trending Window // */}</strong>
                </h6>
                <div className={styles.trend_row}>
                  <ul>
                    <li>
                      <img src='assets/images/trending1.jpg'></img>
                      <div>
                        <p>4 Aug 2022</p>
                        <h4>Made last it seen went no just when of by.</h4>
                      </div>
                    </li>
                    <li>
                      <img src='assets/images/trending2.jpg'></img>
                      <div>
                        <p>1 Aug 2022</p>
                        <h4>Weather however luckily enquire so certain do.</h4>
                      </div>
                    </li>
                    <li>
                      <img src='assets/images/trending3.jpg'></img>
                      <div>
                        <p>28 Jul 2022</p>
                        <h4>Dearest affixed enquire on explain opinion he.</h4>
                      </div>
                    </li>
                    <li>
                      <img src='assets/images/trending4.jpg'></img>
                      <div>
                        <p>14 Jul 2022</p>
                        <h4>Normally, an artist would add his social media links.</h4>
                      </div>
                    </li>
                  </ul>
                </div>
                <HighlightButton title="Get Updates" />
              </div>
            ) : slider === 3 ? (
              <div>
                <h6 className={styles.description}>
                  <strong>{/* // Insert Mini Leaders List// */}</strong>
                </h6>
                <div className={styles.leaders_row}>
                  <ul>
                    <li>
                      <img src='assets/images/leaders1.jpg'></img>
                      <div>
                        <p>01 <strong><i>8716</i>  <u>likes</u></strong></p>
                        <h4>Dwight Holland</h4>
                      </div>
                    </li>
                    <li>
                      <img src='assets/images/leaders2.jpg'></img>
                      <div>
                        <p>02 <strong><i>5369</i>  <u>likes</u></strong> </p>
                        <h4>Catherine Patton</h4>
                      </div>
                    </li>
                    <li>
                      <img src='assets/images/leaders3.jpg'></img>
                      <div>
                        <p>03 <strong><i>4672</i>  <u>likes</u></strong></p>
                        <h4>Marta Thornton</h4>
                      </div>
                    </li>
                    <li>
                      <img src='assets/images/leaders4.jpg'></img>
                      <div>
                        <p>04 <strong><i>4398</i>  <u>likes</u></strong></p>
                        <h4>Madeline Keller</h4>
                      </div>
                    </li>
                  </ul>
                </div>
                <HighlightButton title="Who is Leading" />
              </div>
            ) : (
              <div>
                <h6 className={styles.description}>
                  <strong>{/* // Display Next Event Image // */}</strong>
                </h6>
                <div className={styles.trend_row}>
                  <ul>
                    <li>
                      <img src='assets/images/events4.jpg'></img>
                      <div>
                        <p>Aug 29, 17:00</p>
                        <h4>Annual Meeting of the NTF Community</h4>
                      </div>
                    </li>
                    <li>
                      <img src='assets/images/events3.jpg'></img>
                      <div>
                        <p>Aug 22, 12:30</p>
                        <h4>A Lecture on NFT from Around the World</h4>
                      </div>
                    </li>
                    <li>
                      <img src='assets/images/events2.jpg'></img>
                      <div>
                        <p>Aug 3, 14:00</p>
                        <h4>Now indulgence dissimilar for his thoroughly has</h4>
                      </div>
                    </li>
                   
                    <li>
                      <img src='assets/images/events1.jpg'></img>
                      <div>
                        <p>Aug 13, 21:30</p>
                        <h4>Change wholly say why eldest period</h4>
                      </div>
                    </li>
                  </ul>
                </div>
                <HighlightButton title="More Events" />
              </div>
            )}
          </div>
        </div>
        <div className={styles.mousePointer}>
          <Image
            src={MouseIcon}
            onClick={() => scrollToNextSection('social-section-art')}
            width={50}
            height={50}
            alt="mouse"
          />
        </div>
      </Container>
    </div>
  );
};

export default NapaSociety;
