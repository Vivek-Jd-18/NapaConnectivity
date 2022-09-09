import moment from 'moment';
import type { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';
import { HowardAvatar } from '../assets';
import styles from './ChatListItemCard.module.scss';

type ChatListItemCardProps = {
  username: string;
  avatar?: string;
  description: string;
  date: string;
};

const ChatListItemCard: NextPage<any, ChatListItemCardProps> = ({
  username,
  description,
  date,
}) => {
  const time = new Date(Math.ceil(Number(date) / 10000000) * 1000);
  return (
    // @ts-ignore
    <div className={styles.chatItemContainer}>
      <div className={styles.userContainer}>
        <div className={styles.avatar}>
          <Image src={HowardAvatar} width={32} height={32} alt="avatar" />
        </div>
        <div className={styles.userInfo}>
          <div className={styles.userNameContainer}>
            <span className={styles.userName}>{username}</span>
            <span className={styles.timestamp}>
              {moment(time).format('DD/MM/ hh:mm:ss')}
            </span>
          </div>
          <span className={styles.description}>{description}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatListItemCard;
