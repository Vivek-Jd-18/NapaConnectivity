import type { NextPage } from 'next';
import Container from '../../Layout/Container/Container';
import Footer from '../Footer/Footer';
import HighlightButton from '../HighlightButton/HighlightButton';
import styles from './NftMarketplaceSection.module.scss';
import NftMarketplaceSectionTabs from './NftMarketplaceSectionTabs';

const NftMarketplaceSection: NextPage = ({}) => {
  return (
    <div id="nft-marketplace" className={styles.backgroundImage}>
      <Container className={`${styles.nftContainer} asinnerContainer`}>
        <h2 className={styles.nft}>Marketplace</h2>
        <p className={styles.description}>
          Buy, sell and trade the most sought after professional NFTs and social
          art SNFTs with your NAPA token rewards today!
        </p>
        <div className={styles.btnContainer}>
          <div className={styles.btn}>
            <HighlightButton
              title="Explore All Projects"
              link="/marketplace"
              arrow={true}
            />
          </div>
          <NftMarketplaceSectionTabs />
        </div>
      </Container>
      <Footer footerIconShow />
    </div>
  );
};

export default NftMarketplaceSection;
