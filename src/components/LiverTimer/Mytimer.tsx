import React from 'react';
import { useTimer } from 'react-timer-hook';

type MyTimerProps = {
  expiryTimestamp: Date;
};

function MyTimer({ expiryTimestamp }: MyTimerProps) {
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn('onExpire called'),
  });

  return (
    <h4>
      <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
    </h4>
  );
}

export default MyTimer;
