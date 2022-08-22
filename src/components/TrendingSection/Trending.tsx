import Container from '../../Layout/Container/Container';
import type { NextPage } from 'next';
import styles from './Trending.module.scss';
import { HowardAvatar } from '../assets';
import Tab from '../Tab/Tab';
import { useState } from 'react';
import SocialMediaReview from '../SocialMediaReview/SocialMediaReview';
import ChatWindow from '../ChatWindow/ChatWindow';

const trendingTabList = [
  {
    title: 'In Social Media',
  },
  {
    title: 'In NFT’s',
  },
];

const reviewCardData = [
  {
    description:
      'Made last it seen went no just when of by. Occasional entreaties comparison.',
    avatar: HowardAvatar,
    userName: 'Howard Copeland',
    date: '4 Aug 2022',
  },
  {
    description:
      'Weather however luckily enquire so certain do. Aware did stood was day under ask.',
    avatar: HowardAvatar,
    userName: 'Dorothy Mccoy',
    date: '1 Aug 2022',
  },
  {
    description:
      'Dearest affixed enquire on explain opinion he. Reached who the mrs joy offices pleased.',
    avatar: HowardAvatar,
    userName: 'Rufus Flores',
    date: '1 Jul 2022',
  },
  {
    description:
      'Dearest affixed enquire on explain opinion he. Reached who the mrs joy offices pleased.',
    avatar: HowardAvatar,
    userName: 'Rufus Flores',
    date: '1 Jul 2022',
  },
  {
    description:
      'Dearest affixed enquire on explain opinion he. Reached who the mrs joy offices pleased.',
    avatar: HowardAvatar,
    userName: 'Rufus Flores',
    date: '1 Jul 2022',
  },
  {
    description:
      'Dearest affixed enquire on explain opinion he. Reached who the mrs joy offices pleased.',
    avatar: HowardAvatar,
    userName: 'Rufus Flores',
    date: '1 Jul 2022',
  },
];

const TrendingSection: NextPage = () => {
  const [tab, setTab] = useState('In Social Media');

  return (
    <div className={styles.backgroundImage}>
      <Container className={styles.trendingContainer}>
        <div className={`row col-12 ${styles.trendingBodyContainer}`}>
          <div className={`col-xl-8 col-md-12`}>
            <h1 className={styles.trending}>What's Trending</h1>
            <div className={styles.tabsContainer}>
              <div className={styles.tabsInnerContainer}>
                <ul className={styles.tab}>
                  {trendingTabList.map(({ title }, index) => (
                    <Tab key={index} setTab={setTab} title={title} tab={tab} />
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.socialMediaReviewContainer}>
              {reviewCardData.map(
                ({ description, userName, avatar, date }, index) => {
                  return (
                    <SocialMediaReview
                      key={`social-media-${index}`}
                      description={description}
                      date={date}
                      icon={avatar}
                      username={userName}
                    />
                  );
                }
              )}
            </div>
          </div>
          <div className={`col-xl-4 col-md-12 ${styles.rightSideContainer}`}>
            <ChatWindow />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TrendingSection;
