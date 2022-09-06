import Container from '../../Layout/Container/Container';
import type { NextPage } from 'next';
import { useState } from 'react';
import Tab from '../Tab/Tab';
import styles from './LeaderboardSection.module.scss';
import SliderComponent from '../Slider/Slider';
import HighlightButton from '../HighlightButton/HighlightButton';
import LeaderboardCard from '../LeaderboardCard/LeaderboardCard';
//import image1 from .... (asset location in S3 bucket) ASSETS SHOULD BE IMPORTED AND DEFINED, DO NOT HARDCODE ASSETS PLEASE

type LeaderboardSection = {};

const LeaderboardTab = [
  {
    title: 'Most Viewed Post',
  },
  {
    title: 'Most Token Rewards',
  },
  {
    title: 'Most Discussed',
  },
  {
    title: 'Hot Sprints',
  },
];

const LeaderboardCards = [
  {
    likeCount: 8716,
    count: '01',
    title: 'Dwight Holland',
    backgroundImage: 'url(/assets/images/dwight-holland.png)',
  },
  {
    likeCount: 5369,
    count: '02',
    title: 'Catherine Patton',
    backgroundImage: 'url(/assets/images/dwight-holland.png)',
  },
  {
    likeCount: 4672,
    count: '03',
    title: 'Marta Thornton',
    backgroundImage: 'url(/assets/images/dwight-holland.png)',
  },
  {
    likeCount: 3861,
    count: '04',
    title: 'Madeline Keller',
    backgroundImage: 'url(/assets/images/dwight-holland.png)',
  },
  {
    likeCount: 3861,
    count: '04',
    title: 'Madeline Keller',
    backgroundImage: 'url(/assets/images/dwight-holland.png)',
  },
  {
    likeCount: 3861,
    count: '04',
    title: 'Madeline Keller',
    backgroundImage: 'url(/assets/images/dwight-holland.png)',
  },
];

const LeaderboardSection: NextPage<LeaderboardSection> = () => {
  const [tab, setTab] = useState('Most Viewed Post');

  return (
    <div className={styles.backgroundImage} id="leaderboard">
      <Container className={styles.leaderboardContainer}>
        <div>
          <h2 className={styles.leaderboard}>Leaderboards</h2>
          <div className={styles.tabsContainer}>
            <div className={styles.tabsInnerContainer}>
              <ul className={styles.tab}>
                {LeaderboardTab.map(({ title }, index) => (
                  <Tab key={index} setTab={setTab} title={title} tab={tab} />
                ))}
              </ul>
            </div>
            <HighlightButton title="All Leaderboards" />
          </div>
        </div>

        <SliderComponent centerMode={false} slidesToShow={4}>
          {LeaderboardCards.map(
            ({ likeCount, count, title, backgroundImage }) => {
              return (
                <div key={1} className={styles.projectCardContainer}>
                  <LeaderboardCard
                    likeCount={likeCount}
                    count={count}
                    title={title}
                    backgroundImage={backgroundImage}
                  />
                </div>
              );
            }
          )}
        </SliderComponent>
      </Container>
    </div>
  );
};

export default LeaderboardSection;
