import type { NextPage } from 'next';
import ChatListItemCard from '../ChatListItemCard/ChatListItemCard';
import styles from './ChatWindow.module.scss';

type ChatWindowProps = {
  message: string;
  setMessage: (message: string) => void;
  messageHandler: () => void;
  messages: any;
};

const ChatWindow: NextPage<ChatWindowProps> = ({
  message,
  setMessage,
  messageHandler,
  messages,
}) => {
  return (
    <>
      <div className={styles.chatWindowContainer}>
        {messages &&
          messages.length > 0 &&
          messages.map(({ message }: any, index: number) => {
            return (
              <ChatListItemCard
                key={`chat-${index}`}
                username={message.from}
                // avatar={avatar}
                description={message.text}
              />
            );
          })}
      </div>
      <div className={styles.chatInputContainer}>
        <input
          className={styles.input}
          placeholder="Message.."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              messageHandler();
            }
          }}
        />
        <button className={styles.send} onClick={messageHandler}>
          Send
        </button>
      </div>
    </>
  );
};

export default ChatWindow;
