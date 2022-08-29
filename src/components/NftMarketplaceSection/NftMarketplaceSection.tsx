import Container from '../../Layout/Container/Container';
import type { NextPage } from 'next';
import { useState } from 'react';
import NftProjectCard from '../NftProjectCard/NftProjectCard';
import Steper from '../Steper/Steper';
import Tab from '../Tab/Tab';
import styles from './NftMarketplaceSection.module.scss';
import SliderComponent from '../Slider/Slider';
import Footer from '../Footer/Footer';
import HighlightButton from '../HighlightButton/HighlightButton';
//import image1 from .... (asset location in S3 bucket) ASSETS SHOULD BE IMPORTED AND DEFINED, DO NOT HARDCODE ASSETS PLEASE

const marketPlaceTab = [
  {
    title: 'Professional NFT Projects',
  },
  {
    title: 'Social Art Minted',
  },
];

const NftMarketplaceSection: NextPage = ({}) => {
  const [tab, setTab] = useState('Professional NFT Projects');

  return (
    <div id="nft-marketplace" className={styles.backgroundImage}>
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
          <HighlightButton title="Explore Projects" />
        </div>
        <SliderComponent centerMode={true}>
          {Array.from({ length: 6 }, () => {
            return (
              <div key={1} className={styles.projectCardContainer}>
                <NftProjectCard />
              </div>
            );
          })}
        </SliderComponent>
      </Container>
      <Footer footerIconShow />
    </div>
  );
};

export default NftMarketplaceSection;
