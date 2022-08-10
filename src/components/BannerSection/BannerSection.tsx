import Container from '@/Layout/Container/Container';
import type { NextPage } from 'next';
import Button from '../Button/Button';
import styles from './BannerSection.module.scss';

const BannerSection: NextPage = () => {
  return (
    <div className={styles.container}>
      <Container>
        <h1 className={styles.bannerHeading}>
          Social Art <br />
          without Limits
        </h1>
        <div className={styles.bannerDescription}>
          <p className={styles.bannerText}>
          Welcome to the NAPA Society experience! We are the face of crypto social media in the web3 revolution! Join our society and turn your social media into social art, mint your social art in our social media app into NFT's and earn NAPA tokens, and buy and sell NFTs in the largest marketplace in the world!
          </p>
          <Button customStyle={styles.bannerBtn} text="Join Society" />
        </div>
      </Container>
    </div>
  );
};

export default BannerSection;
