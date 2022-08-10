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
            Abilities or he perfectly pretended so strangers be exquisite. Oh to
            another chamber pleased imagine do in. Went me rank at last loud
            shot an draw.
          </p>
          <Button customStyle={styles.bannerBtn} text="Join Society" />
        </div>
      </Container>
    </div>
  );
};

export default BannerSection;
