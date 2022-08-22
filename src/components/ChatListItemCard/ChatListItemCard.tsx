import type { NextPage } from 'next';
import styles from './ChatListItemCard.module.scss';

type ChatListItemCardProps = {
  username: string;
  avatar: string;
  description: string;
};

const ChatListItemCard: NextPage<ChatListItemCardProps> = ({
  avatar,
  description,
  username,
}) => {
  return (
    <div className={styles.chatItemContainer}>
      <div className={styles.userContainer}>
        <div className={styles.avatar}>
          <img src={avatar} />
        </div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{username}</span>
          <span className={styles.description}>{description}</span>
        </div>
      </div>
    </div>
  );
};
export default ChatListItemCard;
