import NftProjectCard from '../NftProjectCard/NftProjectCard';
import React from 'react';
import styles from './NftMarketplaceSection.module.scss';
import LeaderboardsSliderComponent from '../Leaderboards/LeaderboardsSlider';
import { Avatar } from '../../components/assets';

const NftMarketplaceSectionTab3 = () => {
  const data = [
    {
      background: '',
      userName: '@TomBradley',
      title: 'Illusions of Darkness',
      currentBid: '200',
      ending: '10',
      avatar: Avatar,
    },
    {
      background: '',
      userName: '@TomBradley',
      title: 'Illusions of Darkness',
      currentBid: '200',
      ending: '10',
      avatar: Avatar,
    },
    {
      background: '',
      userName: '@TomBradley',
      title: 'Illusions of Darkness',
      currentBid: '200',
      ending: '10',
      avatar: Avatar,
    },
    {
      background: '',
      userName: '@TomBradley',
      title: 'Illusions of Darkness',
      currentBid: '200',
      ending: '10',
      avatar: Avatar,
    },
  ];
  return (
    <>
      <div id="sliderComponent">
        <LeaderboardsSliderComponent dataLength={data.length}>
          {data.map((val) => {
            return (
              <div key={1} className={styles.projectCardContainer}>
                <NftProjectCard
                  backgroundImage={''}
                  avatar={val.avatar}
                  ending={val.ending}
                  currentBid={val.currentBid}
                  userName={val.userName}
                  title={val.title}
                />
              </div>
            );
          })}
        </LeaderboardsSliderComponent>
      </div>
    </>
  );
};

export default NftMarketplaceSectionTab3;
