import { updateMintPostStatus } from '@/services/MintApi';
import React from 'react';
import { useTimer } from 'react-timer-hook';
import styles from './Mytimer.module.scss';

type MyTimerProps = {
  expiryTimestamp: Date;
  postId: string;
};

function MyTimer({ expiryTimestamp, postId }: MyTimerProps) {
  const { seconds, minutes, hours, isRunning } = useTimer({
    expiryTimestamp,
    onExpire: async () => await updateMintPostStatus(postId, '1'),
  });

  return (
    <>
      {isRunning ? (
        <div className={styles.timerContainer}>
          <h4
            className={`${
              hours > 6
                ? styles.now
                : hours < 6 && hours > 1
                ? styles.sixHoursLeft
                : styles.oneHourLeft
            }`}
          >
            <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
          </h4>
          <p
            className={`${
              hours > 6
                ? styles.now
                : hours < 6 && hours > 1
                ? styles.sixHoursLeft
                : styles.oneHourLeft
            }`}
          >
            Live Post!
          </p>
        </div>
      ) : (
        <>
          <p>Live Time Expired</p>
        </>
      )}
    </>
  );
}

export default MyTimer;
