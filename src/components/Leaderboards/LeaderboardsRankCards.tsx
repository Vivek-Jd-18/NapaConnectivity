import React from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import styles from './LeaderboardsRankCards.module.scss';

type cardsData = {
  rank: number;
  userName: string;
  itemName: string;
  itemAmount: number;
  image: string;
};

const LeaderboardsRankCards: NextPage<cardsData> = ({
  rank,
  userName,
  itemAmount,
  image,
  itemName,
}) => {
  return (
    <>
      <div>
        <div className={styles.CardBoxFirst}>
          <div className={styles.Overlay}>
            <Image
              src={image}
              objectFit="fill"
              alt=""
              width={320}
              height={398}
            />
            <div className={styles.FristContent}>
              <h4>
                {itemAmount}
                <span>{itemName}</span>
              </h4>
            </div>
            <div className={styles.SecondContent}>
              <h2>{rank}</h2>
              <p>{userName}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaderboardsRankCards;
