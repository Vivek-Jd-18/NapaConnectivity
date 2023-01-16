import { updateMintPostStatus } from '@/services/MintApi';
import React from 'react';
import { useTimer } from 'react-timer-hook';
import styles from './Mytimer.module.scss';

type MyTimerProps = {
  expiryTimestamp: number;
  postId?: string;
};

function MyTimer({ expiryTimestamp, postId }: MyTimerProps) {
  const { days, seconds, minutes, hours, isRunning } = useTimer({
    //@ts-ignore
    expiryTimestamp,
    onExpire: async () => postId && (await updateMintPostStatus(postId, '1')),
  });

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
              {days < 10 && 0}
              {days}
            </span>
            :
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
