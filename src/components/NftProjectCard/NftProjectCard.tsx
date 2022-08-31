import { Avatar, NapaIcon } from '../../components/assets';
import type { NextPage } from 'next';
import styles from './NftProjectCard.module.scss';
import Image from 'next/image';

const NftProjectCard: NextPage = () => {
  return (
    <div
      className={styles.cardContainer}
      style={{ backgroundImage: "url('/assets/images/nftprojectcard.png')" }}
    >
      <div className={styles.avatarContainer}>
        <Image
          src={Avatar}
          alt="Avatar"
          className={styles.avatar}
          width={52}
          height={52}
        />
        <span className={styles.username}>@TomBradley</span>
      </div>
      <div className={styles.cardInfoContainer}>
        <span className={styles.title}>Illusions of Darkness</span>
        <div className={styles.description}>
          <div className={styles.bitContainer}>
            <span className={styles.bit}>Current Bit</span>
            <div className={styles.bitContainerLeftSide}>
              <Image src={NapaIcon} alt="NapaIcon" width={26} height={26} />
              <span className={styles.bitContainerLeftSideText}>0.24 NAPA</span>
            </div>
          </div>
          <div className={styles.bitContainer}>
            <span className={styles.bit}>Ending In</span>
            <div className={styles.bitContainerRightSide}>
              <span className={styles.bitContainerRightSideText}>4h 32min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftProjectCard;
