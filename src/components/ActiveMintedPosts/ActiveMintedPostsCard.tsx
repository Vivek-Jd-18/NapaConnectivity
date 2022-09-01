import type { NextPage } from 'next';
import Image from 'next/image';
import { ActiveMintedPostIcon, NapaIcon } from '../assets';
import styles from './ActiveMintedPostsCard.module.scss';

type ActiveMintedPostsCardProps = {};

const dates = [
  {
    title: 'Date Minted',
    date: '12 Mar 2022',
  },
  {
    title: 'Live Start Date',
    date: '4 Aug 2022',
  },
  {
    title: 'Live End Date',
    date: '17 Aug 2022',
  },
  {
    title: 'Current Rewards Tier',
    date: '0.24 NAPA',
  },
];

const ActiveMintedPostsCard: NextPage<ActiveMintedPostsCardProps> = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.innerCardContainer}>
        <div className={styles.leftSide}>
          <Image
            src={ActiveMintedPostIcon}
            width={176}
            height={176}
            alt="ActiveMintedPostIcon"
          />
        </div>
        <div className={styles.rightSide}>
          <h1 className={styles.title}>Illusions of Darkness</h1>
          <div className={styles.innerRightSideContainer}>
            <Image src={NapaIcon} alt="NapaIcon" width={30} height={30} />
            <span className={styles.subtitle}>12.35 NAPA Earned</span>
          </div>
        </div>
      </div>
      <div className={styles.dateContainer}>
        {dates.map((item, index) => {
          return (
            <div key={index} className={styles.dateInnerContainer}>
              <span className={styles.dateTitle}>{item.title}</span>
              <span className={styles.date}>{item.date}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveMintedPostsCard;
