import { SOCIAL_ART_WEBSOCKET_URL } from '@/constants/url';
import { updateMintPostStatus } from '@/services/MintApi';
import React, { useEffect, useState } from 'react';
import { useTimer } from 'react-timer-hook';
import styles from './Mytimer.module.scss';

type MyTimerProps = {
  expiryTimestamp: number;
  postId?: string;
  isExpired?: string;
};

function MyTimer({ expiryTimestamp, postId, isExpired }: MyTimerProps) {
  const socialArtSocket = new WebSocket(SOCIAL_ART_WEBSOCKET_URL);
  const [currentNapaPrice, setCurrentNapaPrice] = useState('');
  const { seconds, minutes, hours, isRunning } = useTimer({
    //@ts-ignore
    expiryTimestamp,
    onExpire: async () =>
      postId &&
      isExpired == 'false' &&
      (await updateMintPostStatus(postId, '1', currentNapaPrice)),
  });

  useEffect(() => {
    // @ts-ignore
    socialArtSocket.addEventListener('message', ({ data }) => {
      const response = JSON.parse(data);
      if (response?.event === 'napa-token-price') {
        setCurrentNapaPrice(`${response?.price}`);
      }
    });
    return () => {
      socialArtSocket.removeEventListener('message', () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isRunning ? (
        <div className={styles.timerContainer}>
          <h4
            className={`${
              hours >= 6
                ? styles.now
                : hours < 6 && hours >= 1
                ? styles.sixHoursLeft
                : styles.oneHourLeft
            }`}
          >
            <span>
              {hours < 10 && 0}
              {hours}
            </span>
            :
            <span>
              {minutes < 10 && 0}
              {minutes}
            </span>
            :
            <span>
              {seconds < 10 && 0}
              {seconds}
            </span>
          </h4>
          <p
            className={`${
              hours >= 6
                ? styles.now
                : hours < 6 && hours >= 1
                ? styles.sixHoursLeft
                : styles.oneHourLeft
            }`}
          >
            Live Post!
          </p>
        </div>
      ) : (
        <>
          <p className={styles.timerEnded}>Live Time Expired</p>
        </>
      )}
    </>
  );
}

export default MyTimer;
