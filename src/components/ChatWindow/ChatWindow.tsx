import type { NextPage } from 'next';
import { useEffect, useRef } from 'react';
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
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      // @ts-ignore
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div className={styles.chatWindowContainer} ref={ref}>
        {messages &&
          messages.length &&
          messages.map(({ message, timetoken }: any, index: number) => {
            return (
              <ChatListItemCard
                key={`chat-${index}`}
                username={message?.from}
                // avatar={avatar}
                description={message?.text}
                date={timetoken}
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
            if (!message) {
              return;
            }
            if (e.key === 'Enter') {
              messageHandler();
              setMessage('');
            }
          }}
        />
        <button
          className={styles.send}
          onClick={() => {
            // @ts-ignore
            ref.current.scrollIntoView({ behavior: 'smooth' });
            if (!message) {
              return;
            }
            messageHandler();
            setMessage('');
          }}
        >
          Send
        </button>
      </div>
    </>
  );
};

export default ChatWindow;
