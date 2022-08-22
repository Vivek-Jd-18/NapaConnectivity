import type { NextPage } from 'next';
import styles from './SocialMediaReview.module.scss';

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
          <img src={icon} />
        </div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{username}</span>
          <span className={styles.date}>{date}</span>
        </div>
      </div>
    </div>
  );
};
export default SocialMediaReview;
