import type { NextPage } from 'next';
import Image from 'next/image';
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
          <Image src={avatar} width={32} height={32} alt="avatar" />
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
