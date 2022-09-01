import type { NextPage } from 'next';
import { HowardAvatar } from '../assets';
import ChatListItemCard from '../ChatListItemCard/ChatListItemCard';
import styles from './ChatWindow.module.scss';

const chatList = [
  {
    avatar: HowardAvatar,
    userName: 'Tom Bradley',
    description:
      'Abroad no chatty others my silent an. Fat way appear denote who wholly narrow gay settle.',
  },
  {
    avatar: HowardAvatar,
    userName: 'Tom Bradley',
    description:
      'By spite about do of do allow blush. Additions in conveying or collected objection in. Suffer few desire wonder her object hardly nearer. ',
  },
  {
    avatar: HowardAvatar,
    userName: 'Tom Bradley',
    description: 'Change wholly say why eldest period.',
  },
  {
    avatar: HowardAvatar,
    userName: 'Tom Bradley',
    description:
      'By spite about do of do allow blush. Additions in conveying or collected objection in. Suffer few desire wonder her object hardly nearer. ',
  },
  {
    avatar: HowardAvatar,
    userName: 'Tom Bradley',
    description:
      'By spite about do of do allow blush. Additions in conveying or collected objection in. Suffer few desire wonder her object hardly nearer. ',
  },
  {
    avatar: HowardAvatar,
    userName: 'Tom Bradley',
    description:
      'By spite about do of do allow blush. Additions in conveying or collected objection in. Suffer few desire wonder her object hardly nearer. ',
  },
  {
    avatar: HowardAvatar,
    userName: 'Tom Bradley',
    description:
      'By spite about do of do allow blush. Additions in conveying or collected objection in. Suffer few desire wonder her object hardly nearer. ',
  },
  {
    avatar: HowardAvatar,
    userName: 'Tom Bradley',
    description:
      'By spite about do of do allow blush. Additions in conveying or collected objection in. Suffer few desire wonder her object hardly nearer. ',
  },
  {
    avatar: HowardAvatar,
    userName: 'Tom Bradley',
    description:
      'By spite about do of do allow blush. Additions in conveying or collected objection in. Suffer few desire wonder her object hardly nearer. ',
  },
  {
    avatar: HowardAvatar,
    userName: 'Tom Bradley',
    description:
      'By spite about do of do allow blush. Additions in conveying or collected objection in. Suffer few desire wonder her object hardly nearer. ',
  },
  {
    avatar: HowardAvatar,
    userName: 'Tom Bradley',
    description:
      'By spite about do of do allow blush. Additions in conveying or collected objection in. Suffer few desire wonder her object hardly nearer. ',
  },
  {
    avatar: HowardAvatar,
    userName: 'Tom Bradley',
    description:
      'By spite about do of do allow blush. Additions in conveying or collected objection in. Suffer few desire wonder her object hardly nearer. ',
  },
];

const ChatWindow: NextPage = () => {
  return (
    <>
      <div className={styles.chatWindowContainer}>
        {chatList.map(({ userName, avatar, description }, index) => {
          return (
            <ChatListItemCard
              key={`chat-${index}`}
              username={userName}
              avatar={avatar}
              description={description}
            />
          );
        })}
      </div>
      <div className={styles.chatInputContainer}>
        <input className={styles.input} placeholder="Message.." />
        <button className={styles.send}>Send</button>
      </div>
    </>
  );
};

export default ChatWindow;
