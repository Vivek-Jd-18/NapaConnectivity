import { updateMintPostStatus } from '@/services/MintApi';
import React from 'react';
import { useTimer } from 'react-timer-hook';

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
        <>
          <h4>
            <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
          </h4>
          <p>Live Post!</p>
        </>
      ) : (
        <>
          <p>Live Time Expired</p>
        </>
      )}
    </>
  );
}

export default MyTimer;
