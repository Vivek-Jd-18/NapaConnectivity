import { Avatar, NapaIcon } from '@/index';
import type { NextPage } from 'next';
import styles from './NftProjectCard.module.scss';

const NftProjectCard: NextPage = () => {
  return (
    <div
      className={styles.cardContainer}
      style={{ backgroundImage: "url('/assets/images/nftprojectcard.png')" }}
    >
      <div className={styles.avatarContainer}>
        <img src={Avatar} alt="" />
        <span className={styles.username}>@TomBradley</span>
      </div>
      <div className={styles.cardInfoContainer}>
        <span className={styles.title}>Illusions of Darkness</span>
        <div className={styles.description}>
          <div className={styles.bitContainer}>
            <span className={styles.bit}>Current Bit</span>
            <div>
              <img src={NapaIcon} />
              <span>0.24 NAPA</span>
            </div>
          </div>
          <div className={styles.bitContainer}>
            <span className={styles.bit}>Ending In</span>
            <div>
              <span>4h 32min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftProjectCard;
