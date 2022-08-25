import type { NextPage } from 'next';
import { Avatar, NapaIcon, TimeIcon } from '../assets';
import styles from './CoBatchingCard.module.scss';

type CoBatchingPoolsCardProps = {};

const CoBatchingPoolsCard: NextPage<CoBatchingPoolsCardProps> = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.leftSide}>
        <div className={styles.innerContainer}>
          <img src={NapaIcon} alt="" />
          <p>20 NAPA</p>
        </div>
      </div>
      <div className={styles.rightSide}>
        <h2 className={styles.title}>Illusions Darkness</h2>
        <div className={styles.timeContainer}>
          <img src={TimeIcon} alt="" />
          <span className={styles.time}>Jul 28, 2022 19:00</span>
        </div>
        <div className={styles.amountContainer}>
          <h3 className={styles.amountTitle}>Amount to Contribute</h3>
          <div className={styles.amountInnerContainer}>
            <img src={NapaIcon} alt="" />
            <span className={styles.amount}>0.25 - 3.00</span>
          </div>
        </div>
        <div className={styles.users}>
          <img src={Avatar} alt="" />
          <img style={{ marginLeft: '-0.2rem' }} src={Avatar} alt="" />
          <img style={{ marginLeft: '-0.2rem' }} src={Avatar} alt="" />
          <img style={{ marginLeft: '-0.2rem' }} src={Avatar} alt="" />
        </div>
        <div className={styles.progressContainer}>
          <div className={styles.innerProgressParentContainer}>
            <div className={styles.innerProgressContainer}>
              <img src={NapaIcon} alt="" />
              <span>14.02</span>
            </div>
            <div className={styles.innerProgressContainer}>
              <img src={NapaIcon} alt="" />
              <span>14.02</span>
            </div>
          </div>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBarParent}>
              <div className={styles.progressBarChild}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoBatchingPoolsCard;
