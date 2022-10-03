import { useCallback, useRef, useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Container from '../../Layout/Container/Container';
import styles from './NapaLounge.module.scss';

import { NapaLoungeTab } from '../../typing/typing';
import {
  events,
  tipsAndTutorialsCards,
  upcomingNftProjects,
} from '../../constants/home.constants';

import HighlightButton from '../HighlightButton/HighlightButton';
import TipsAndTutorialsCard from '../TipsAndTutorialsCard/TipsAndTutorialsCard';
import CoBatchingPoolsCard from '../CoBatchingCard/CoBatchingCard';
import UpcomingNftProjectsCard from '../UpcomingNftProjectsCard/UpcomingNftProjectsCard';
import SliderComponent from '../Slider/Slider';
import EventsCard from '../EventsCard/EventsCard';
import ActiveMintedPostsCard from '../ActiveMintedPosts/ActiveMintedPostsCard';
import EarnedNapaTokensCard from '../EarnedNapaTokensCard/EarnedNapaTokensCard';
import Footer from '../Footer/Footer';
import {
  ActiveMintedPostsBackground,
  CoBatchingPoolsBackground,
  EarnedNapaTokensBackground,
  EventsBackground,
  LeftWhiteArrowIcon,
  NapaLoungeDesktopBackground,
  NftProjectsBackground,
  RightWhiteArrowIcon,
} from '../assets';

const NapaLounge: NextPage = () => {
  const [tabs, setTabs] = useState(NapaLoungeTab.TIPS_AND_TUTORIALS);
  const tutorialRef = useRef(null);

  const changeBackgroundHandler = useCallback(() => {
    if (tabs === NapaLoungeTab.TIPS_AND_TUTORIALS) {
      return `url(${NapaLoungeDesktopBackground})`;
    }
    if (tabs === NapaLoungeTab.CO_BATCHING_POOLS) {
      return `url(${CoBatchingPoolsBackground})`;
    }
    if (tabs === NapaLoungeTab.UPCOMING_NFT_PROJECTS) {
      return `url(${NftProjectsBackground})`;
    }
    if (tabs === NapaLoungeTab.EVENTS) {
      return `url(${EventsBackground})`;
    }
    if (tabs === NapaLoungeTab.ACTIVE_MINTED_POSTS) {
      return `url(${ActiveMintedPostsBackground})`;
    }
    return `url(${EarnedNapaTokensBackground})`;
  }, [tabs]);

  const titleHandler = useCallback(() => {
    if (tabs === NapaLoungeTab.TIPS_AND_TUTORIALS) {
      return 'Whats Trending';
    }
    if (tabs === NapaLoungeTab.CO_BATCHING_POOLS) {
      return 'More Pools';
    }
    if (tabs === NapaLoungeTab.UPCOMING_NFT_PROJECTS) {
      return 'More Projects';
    }
    if (tabs === NapaLoungeTab.EVENTS) {
      return 'More Events';
    }
    if (tabs === NapaLoungeTab.ACTIVE_MINTED_POSTS) {
      return 'More Posts';
    }
    return 'More Earned Tokens ';
  }, [tabs]);

  const tabsHandler = useCallback(
    (tab: NapaLoungeTab) => {
      setTabs(tab);
    },
    [setTabs]
  );

  const previousHandler = useCallback(() => {
    // @ts-ignore
    tutorialRef.current.slickPrev();
  }, [tutorialRef]);

  const nextHandler = useCallback(() => {
    // @ts-ignore
    tutorialRef.current.slickNext();
  }, []);

  return (
    <div
      className={styles.backgroundImage}
      style={{ backgroundImage: changeBackgroundHandler() }}
      id="napa-lounge"
    >
      <Container className={`${styles.napaLoungeContainer} asinnerContainer asinnerContainerv2`}>
        <h1>
          <span className={styles.napa}>The NAPA</span>
          <span className={styles.lounge}> Lounge</span>
        </h1>
        <div className={`row col-12 ${styles.napaLoungeBodyContainer}`}>
          <div className="col-xl-6 col-md-12 rspnsv_order2">
            <div className={`row cstm-box col-12 ${styles.leftSideContainer}`}>
              <div
                className={`col-6 ${styles.boxes} ${
                  tabs === NapaLoungeTab.TIPS_AND_TUTORIALS && styles.active
                }`}
                onClick={() => tabsHandler(NapaLoungeTab.TIPS_AND_TUTORIALS)}
              >
                <span className={`${styles.description}`}>
                Whats Trending
                </span>
              </div>
              <div
                className={`col-6 ${styles.boxes} ${
                  tabs === NapaLoungeTab.CO_BATCHING_POOLS && styles.active
                }`}
                onClick={() => tabsHandler(NapaLoungeTab.CO_BATCHING_POOLS)}
              >
                <span className={`${styles.description}`}>
                  Co Batching Pools
                </span>
              </div>
              <div
                className={`col-6 ${styles.boxes} ${
                  tabs === NapaLoungeTab.UPCOMING_NFT_PROJECTS && styles.active
                }`}
                onClick={() => tabsHandler(NapaLoungeTab.UPCOMING_NFT_PROJECTS)}
              >
                <span className={`${styles.description}`}>
                  Upcoming NFT Projects
                </span>
              </div>
              <div
                className={`col-6 ${styles.boxes} ${
                  tabs === NapaLoungeTab.EVENTS && styles.active
                }`}
                onClick={() => tabsHandler(NapaLoungeTab.EVENTS)}
              >
                <span className={`${styles.description}`}>Events</span>
              </div>
              <div
                className={`col-6 ${styles.boxes} ${
                  tabs === NapaLoungeTab.ACTIVE_MINTED_POSTS && styles.active
                }`}
                onClick={() => tabsHandler(NapaLoungeTab.ACTIVE_MINTED_POSTS)}
              >
                <span className={`${styles.description}`}>
                  Active Minted Posts
                </span>
              </div>
              <div
                className={`col-6 ${styles.boxes} ${
                  tabs === NapaLoungeTab.EARNED_NAPA_TOKENS && styles.active
                }`}
                onClick={() => tabsHandler(NapaLoungeTab.EARNED_NAPA_TOKENS)}
              >
                <span className={`${styles.description}`}>
                  Earned NAPA Tokens
                </span>
              </div>
            </div>
          </div>
          <div className={`col-xl-6 col-md-12 ${styles.rightSideContainer}`}>
            <div className={styles.arrowContainer}>
              <Image
                src={LeftWhiteArrowIcon}
                className={styles.leftIcon}
                onClick={previousHandler}
                width={20}
                height={20}
                alt={'left arrow'}
              />
              <Image
                src={RightWhiteArrowIcon}
                className={styles.rightIcon}
                onClick={nextHandler}
                width={20}
                height={20}
                alt="right arrow"
              />
            </div>
            <div className={styles.sliderContainer}>
              {tabs === NapaLoungeTab.TIPS_AND_TUTORIALS ? (
                <SliderComponent
                  centerMode={false}
                  slidesToShow={2}
                  ref={tutorialRef}
                >
                  {tipsAndTutorialsCards.map(
                    ({ title, date, backgroundImage }) => {
                      return (
                        <div key={1} className={styles.projectCardContainer}>
                          <TipsAndTutorialsCard
                            title={title}
                            date={date}
                            backgroundImage={backgroundImage}
                          />
                        </div>
                      );
                    }
                  )}
                </SliderComponent>
              ) : tabs === NapaLoungeTab.CO_BATCHING_POOLS ? (
                <SliderComponent
                  centerMode={false}
                  slidesToShow={1}
                  ref={tutorialRef}
                >
                  {tipsAndTutorialsCards.map(() => {
                    return (
                      <div key={1} className={styles.projectCardContainer}>
                        <CoBatchingPoolsCard />
                      </div>
                    );
                  })}
                </SliderComponent>
              ) : tabs === NapaLoungeTab.UPCOMING_NFT_PROJECTS ? (
                <SliderComponent
                  centerMode={false}
                  slidesToShow={2}
                  ref={tutorialRef}
                >
                  {upcomingNftProjects.map(
                    ({ title, subTitle, backgroundImage, time }) => {
                      return (
                        <div key={1} className={styles.projectCardContainer}>
                          <UpcomingNftProjectsCard
                            title={title}
                            subTitle={subTitle}
                            backgroundImage={backgroundImage}
                            time={time}
                          />
                        </div>
                      );
                    }
                  )}
                </SliderComponent>
              ) : tabs === NapaLoungeTab.EVENTS ? (
                <SliderComponent
                  centerMode={false}
                  slidesToShow={2}
                  ref={tutorialRef}
                >
                  {events.map(({ title, backgroundImage, date }) => {
                    return (
                      <div key={1} className={styles.projectCardContainer}>
                        <EventsCard
                          title={title}
                          date={date}
                          backgroundImage={backgroundImage}
                        />
                      </div>
                    );
                  })}
                </SliderComponent>
              ) : tabs === NapaLoungeTab.ACTIVE_MINTED_POSTS ? (
                <SliderComponent
                  centerMode={false}
                  slidesToShow={1}
                  ref={tutorialRef}
                >
                  {events.map(() => {
                    return (
                      <div key={1} className={styles.projectCardContainer}>
                        <ActiveMintedPostsCard />
                      </div>
                    );
                  })}
                </SliderComponent>
              ) : (
                <SliderComponent
                  centerMode={false}
                  slidesToShow={1}
                  ref={tutorialRef}
                >
                  {events.map(() => {
                    return (
                      <div key={1} className={styles.projectCardContainer}>
                        <EarnedNapaTokensCard />
                      </div>
                    );
                  })}
                </SliderComponent>
              )}
            </div>
            <div className={styles.buttonContainer}>
              <HighlightButton title={`${titleHandler()}`} />
            </div>
          </div>
        </div>
      </Container>
      <div className={styles.footerContainer}>
        <Footer footerIconShow={false} />
      </div>
    </div>
  );
};

export default NapaLounge;
