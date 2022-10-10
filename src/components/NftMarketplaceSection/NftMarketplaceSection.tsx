import Container from '../../Layout/Container/Container';
import type { NextPage } from 'next';
import { useState } from 'react';
import NftProjectCard from '../NftProjectCard/NftProjectCard';
import Tab from '../Tab/Tab';
import styles from './NftMarketplaceSection.module.scss';
import SliderComponent from '../Slider/Slider';
import Footer from '../Footer/Footer';
import HighlightButton from '../HighlightButton/HighlightButton';
//import image1 from .... (asset location in S3 bucket) ASSETS SHOULD BE IMPORTED AND DEFINED, DO NOT HARDCODE ASSETS PLEASE

const marketPlaceTab = [
  {
    title: 'NFT Projects',
    value: 'Nft Projects',
  },
  {
    title: 'Social Art Minted SFT',
    value: 'Art Minted',
  },
  {
    title: 'Top NFTs and SFTs',
    value: 'NFT Listings',
  },
];

const NftMarketplaceSection: NextPage = ({}) => {
  const [tab, setTab] = useState('Nft Projects');

  return (
    <div id="nft-marketplace" className={styles.backgroundImage}>
      {/* <Steper steps={4} bottom={0} /> */}
      <Container className={`${styles.nftContainer} asinnerContainer`}>
        <h2 className={styles.nft}>Marketplace</h2>
        <p className={styles.description}>
          Buy, sell and trade the most sought after professional NFTs and social art SFTs
          with your NAPA token rewards today!
        </p>
        <div className={styles.tabsContainer}>
          <div className={styles.tabsInnerContainer}>
            <ul className={styles.tab}>
              {marketPlaceTab.map(({ title, value }, index) => (
                <Tab
                  value={value}
                  key={index}
                  setTab={setTab}
                  title={title}
                  tab={tab}
                />
              ))}
            </ul>
          </div>
          <HighlightButton title="Explore All Projects" link="" />
        </div>
        <div id="sliderComponent">
          <SliderComponent centerMode={true}>
            {Array.from({ length: 6 }, (_, index) => {
              if (index == 0 || index == 3) {
                var backgroundImage = '/assets/images/nftprojectcard.png';
              } else if (index == 1 || index == 4) {
                var backgroundImage = '/assets/images/nft1.png';
              } else {
                var backgroundImage = '/assets/images/nft2.jpg';
              }
              return (
                <div key={1} className={styles.projectCardContainer}>
                  <NftProjectCard backgroundImage={backgroundImage} />
                </div>
              );
            })}
          </SliderComponent>
        </div>
      </Container>
      <Footer footerIconShow />
    </div>
  );
};

export default NftMarketplaceSection;
