import Container from '@/Layout/Container/Container';
import type { NextPage } from 'next';
import { useState } from 'react';
import Header from '../Header/Header';
import NftProjectCard from '../NftProjectCard/NftProjectCard';
import Steper from '../Steper/Steper';
import Tab from '../Tab/Tab';
import styles from './NftMarketplaceSection.module.scss';
import SliderComponent from '../Slider/Slider';
import { RightArrowBlueIcon } from '@/index';
//import image1 from .... (asset location in S3 bucket) ASSETS SHOULD BE IMPORTED AND DEFINED, DO NOT HARDCODE ASSETS PLEASE

const marketPlaceTab = [
  {
    title: 'Professional NFT Projects',
  },
  {
    title: 'Social Media Minted',
  },
];

const NftMarketplaceSection: NextPage = () => {
  const [tab, setTab] = useState('Professional NFT Projects');

  return (
    <div className={styles.backgroundImage}>
      <Header />
      <Steper steps={4} bottom={0} />
      <Container className={styles.nftContainer}>
        <h2 className={styles.nft}>NFT Marketplace</h2>
        <p className={styles.description}>
          Buy, sell and trade the most sought after professional and social art
          NFT’s with your NAPA token rewards today!
        </p>
        <div className={styles.tabsContainer}>
          <div className={styles.tabsInnerContainer}>
            <ul className={styles.tab}>
              {marketPlaceTab.map(({ title }, index) => (
                <Tab key={index} setTab={setTab} title={title} tab={tab} />
              ))}
            </ul>
          </div>
          <div className={styles.viewFeedContainer}>
            <button className={styles.viewFeedBtn}>Post Without Limits</button>
            {/* Add pop up message with the option to download our app from the App Store or Google Play Store */}
            <img src={RightArrowBlueIcon} alt="" />
          </div>
        </div>
        <SliderComponent>
          {Array.from({ length: 6 }, () => {
            return (
              <div className={styles.projectCardContainer}>
                <NftProjectCard />
              </div>
            );
          })}
        </SliderComponent>
      </Container>
    </div>
  );
};

export default NftMarketplaceSection;