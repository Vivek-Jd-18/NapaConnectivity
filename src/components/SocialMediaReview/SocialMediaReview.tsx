import type { NextPage } from 'next';
import Image from 'next/image';
import styles from './SocialMediaReview.module.scss';
import moment from 'moment';

type SocialMediaReviewProps = {
  description: string;
  icon: string;
  date: string;
  username: string;
};

const SocialMediaReview: NextPage<SocialMediaReviewProps> = ({
  description,
  icon,
  date,
  username,
}) => {
  return (
    <div className={styles.reviewContainer}>
      <div className={styles.review}>
        <p>{description}</p>
      </div>
      <div className={styles.userContainer}>
        <div className={styles.avatar}>
          <Image src={icon} width={40} height={40} alt="avatar" />
        </div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{username}</span>
          <span className={styles.date}>
            {moment(date).format('DD MMMM YYYY')}
          </span>
        </div>
      </div>
    </div>
  );
};
export default SocialMediaReview;
