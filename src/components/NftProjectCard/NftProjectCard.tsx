import type { NextPage } from 'next';
import Image from 'next/image';
import styles from './NftProjectCard.module.scss';
import { NapaIcon } from '../../components/assets';

type Props = {
  backgroundImage?: string;
  userName: string;
  title: string;
  currentBid: string;
  ending: string;
  avatar: string;
};

const NftProjectCard: NextPage<Props> = ({
  userName,
  title,
  currentBid,
  ending,
  avatar,
}) => {
  return (
    <div
      className={styles.cardContainer}
      style={{ backgroundImage: `url(/assets/images/nftprojectcard.png)` }}
    >
      <div className={styles.avatarContainer}>
        <Image
          src={avatar ? avatar : '/img/feed_small_img01.png'}
          alt="Avatar"
          className={styles.avatar}
          width={52}
          height={52}
        />
        <span className={styles.username}>{userName}</span>
      </div>
      <div className={styles.cardInfoContainer}>
        <span className={styles.title}>{title}</span>
        <div className={styles.description}>
          <div className={styles.bitContainer}>
            <span className={styles.bit}>Current Bit</span>
            <div className={styles.bitContainerLeftSide}>
              <Image src={NapaIcon} alt="NapaIcon" width={26} height={26} />
              <span className={styles.bitContainerLeftSideText}>
                {currentBid} NAPA
              </span>
            </div>
          </div>
          <div className={styles.bitContainer}>
            <span className={styles.bit}>Ending In</span>
            <div className={styles.bitContainerRightSide}>
              <span className={styles.bitContainerRightSideText}>{ending}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftProjectCard;
