/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Image from 'next/image';

import styles from './SocialArtSection.module.scss';
import Container from '../../Layout/Container/Container';
import HighlightButton from '../HighlightButton/HighlightButton';
import { scrollToNextSection } from '../../utils/home';
import { Avatar, Carousel, MouseIcon } from '../../components/assets';

//import image1 from .... (asset location in S3 bucket) ASSETS SHOULD BE IMPORTED AND DEFINED, DO NOT HARDCODE ASSETS PLEASE

const SocialArtSection: NextPage = () => {
  const [slider, setSlider] = useState(1);

  useEffect(() => {
    const interval = setInterval(
      () => setSlider((prevCount) => (prevCount > 4 ? 1 : prevCount + 1)),
      5000
    );
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleNextSection = (slide: number) => {
    if (slider > 4) {
      setSlider(slide);
      return;
    }
    setSlider(slide);
  };

  return (
    <div id="social-section-art" className={styles.backgroundImage}>
      {/* <Steper steps={3} top={12} /> */}
      <Container className={`${styles.socialArtContainer} asinnerContainer pstnrltv`}>
        <div className={styles.socialArtContainerBody}>
          <div className={styles.carouselImage}>
            {slider == 1 ? (
              <img src={Carousel} alt="" className={styles.image} />
            ) : slider == 2 ? (
              <img src={Carousel} alt="" className={styles.image} />
            ) : slider == 3 ? (
              <img src={Carousel} alt="" className={styles.image} />
            ) : slider == 4 ? (
              <img src={Carousel} alt="" className={styles.image} />
            ) : (
              <img src={Carousel} alt="" className={styles.image} />
            )}
            <div className={styles.slideBtn}>
              <div className={`${styles.carouselBottom} carouselBottom`}>
                {slider == 1 ? (
                  <>
                    <Image
                      src={Avatar}
                      alt=""
                      className={styles.avatar}
                      width={70}
                      height={70}
                    />
                    <span className={styles.carouselBottomText}>
                      Clinton Bowman
                    </span>
                  </>
                ) : slider == 2 ? (
                  <>
                    <Image
                      src={Avatar}
                      alt=""
                      className={styles.avatar}
                      width={70}
                      height={70}
                    />
                    <span className={styles.carouselBottomText}>Slide 2</span>
                  </>
                ) : slider == 3 ? (
                  <>
                    <Image
                      src={Avatar}
                      alt=""
                      className={styles.avatar}
                      width={70}
                      height={70}
                    />
                    <span className={styles.carouselBottomText}>Slide 3</span>
                  </>
                ) : slider == 4 ? (
                  <>
                    <Image
                      src={Avatar}
                      alt=""
                      className={styles.avatar}
                      width={70}
                      height={70}
                    />
                    <span className={styles.carouselBottomText}>Slide 4</span>
                  </>
                ) : (
                  <>
                    <Image
                      src={Avatar}
                      alt=""
                      className={styles.avatar}
                      width={70}
                      height={70}
                    />
                    <span className={styles.carouselBottomText}>Slide 5</span>
                  </>
                )}
              </div>
              <div>
                <span onClick={() => handleNextSection(1)}>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {slider == 1 && (
                      <path
                        d="M16 31.5C24.5604 31.5 31.5 24.5604 31.5 16C31.5 7.43959 24.5604 0.5 16 0.5C7.43959 0.5 0.5 7.43959 0.5 16C0.5 24.5604 7.43959 31.5 16 31.5Z"
                        stroke="white"
                      />
                    )}
                    <circle cx="16" cy="16" r="3" fill="white" />
                  </svg>
                </span>
                <span onClick={() => handleNextSection(2)}>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {slider == 2 && (
                      <path
                        d="M16 31.5C24.5604 31.5 31.5 24.5604 31.5 16C31.5 7.43959 24.5604 0.5 16 0.5C7.43959 0.5 0.5 7.43959 0.5 16C0.5 24.5604 7.43959 31.5 16 31.5Z"
                        stroke="white"
                      />
                    )}
                    <circle cx="16" cy="16" r="3" fill="white" />
                  </svg>
                </span>
                <span onClick={() => handleNextSection(3)}>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {slider == 3 && (
                      <path
                        d="M16 31.5C24.5604 31.5 31.5 24.5604 31.5 16C31.5 7.43959 24.5604 0.5 16 0.5C7.43959 0.5 0.5 7.43959 0.5 16C0.5 24.5604 7.43959 31.5 16 31.5Z"
                        stroke="white"
                      />
                    )}
                    <circle cx="16" cy="16" r="3" fill="white" />
                  </svg>
                </span>
                <span onClick={() => handleNextSection(4)}>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {slider == 4 && (
                      <path
                        d="M16 31.5C24.5604 31.5 31.5 24.5604 31.5 16C31.5 7.43959 24.5604 0.5 16 0.5C7.43959 0.5 0.5 7.43959 0.5 16C0.5 24.5604 7.43959 31.5 16 31.5Z"
                        stroke="white"
                      />
                    )}
                    <circle cx="16" cy="16" r="3" fill="white" />
                  </svg>
                </span>
                <span onClick={() => handleNextSection(5)}>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {slider == 5 && (
                      <path
                        d="M16 31.5C24.5604 31.5 31.5 24.5604 31.5 16C31.5 7.43959 24.5604 0.5 16 0.5C7.43959 0.5 0.5 7.43959 0.5 16C0.5 24.5604 7.43959 31.5 16 31.5Z"
                        stroke="white"
                      />
                    )}
                    <circle cx="16" cy="16" r="3" fill="white" />
                  </svg>
                </span>
              </div>
            </div>
            <div className={styles.innerSocietyContainer}></div>
          </div>
          <div className={styles.innerSocietyContainerRightSide}>
            <div className={styles.innerSocietyContainerwt}>
              <div className={styles.socialHeading}>
                <h2 className={styles.socialText}>Social</h2>
                <h2 className={styles.artText}>Art</h2>
              </div>
              <p className={styles.description}>
                The NAPA Social Media App is the worlds only social media
                platform that allows you to mint and monetize your posts in real
                time to receive <strong>NAPA Tokens!</strong>
                <br></br>
                <br></br>Pick and choose your audience and share your social art
                with millions of members in the NAPA Society community!
              </p>
              <HighlightButton title="NAPA Social Art" link="/socialart" />
              <div className={styles.socialImages}>
                <Image src="/img/qrcode_ic.png" alt="" width="300px" height="300px" className={styles.MrgnRgt30} />
                <Image src="/img/qrcode_ic.png" alt="" width="300px" height="300px" />
              </div>
              <div>
               <button className={styles.Dawnldnapabtn}>Download The NAPA App</button>
              </div>
            </div>

            {/* <p className={styles.description}>
>>>>>>> 05f8c9f7b340ac05ca05b8fbcdd435a1c0816cbf
              <strong>
                The NAPA Social Media App is the worlds only social media
                platform that allows you to mint and monetize your posts in real
                time to receive NAPA Tokens
              </strong>
              .<br />
              <br />
              <strong>
                Choose your audience and share your social art with millions of
                members of the NAPA Society community!
              </strong>

            </p> */}
          </div>
        </div>
        <div className={styles.mousePointer}>
          <Image
            src={MouseIcon}
            onClick={() => scrollToNextSection('nft-marketplace')}
            width={50}
            height={50}
            alt="mouse"
          />
        </div>
      </Container>
    </div>
  );
};

export default SocialArtSection;
