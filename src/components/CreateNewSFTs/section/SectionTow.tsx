import { SnftResponse } from '../../../types/marketplace';
import moment from 'moment';
import Image from 'next/image';
import React from 'react';
import styles from './SectionTow.module.scss';

type SectionTowProps = {
  snftDetails: SnftResponse | null;
};

export default function SectionTow({ snftDetails }: SectionTowProps) {
  return (
    <div className={styles.SectionTow}>
      <div className={styles.CustomGridContainer}>
        <div className={styles.CustomGrid}>
          <div className={styles.DetailsCont}>
            <h1>Details</h1>
            <div className={styles.flexPrntSc02}>
              <h6>Contract Address</h6>
              <p>0x9324...74dCa</p>
            </div>
            <div className={styles.flexPrntSc02}>
              <h6>Etherscan Address</h6>
              <p>3a215a...09sfH</p>
            </div>
            <div className={styles.flexPrntSc02}>
              <h6>Token ID</h6>
              <p>2193</p>
            </div>
            <div className={styles.flexPrntSc02}>
              <h6>Token Standart</h6>
              <p>ERC-284</p>
            </div>
            <div className={styles.flexPrntSc02}>
              <h6>Blockchain</h6>
              <div className={styles.flexNapa}>
                <Image
                  src="/img/napa_ic_aj.svg"
                  alt=""
                  width={17}
                  height={13}
                />
                <p>NAPA</p>
              </div>
            </div>
            <div className={styles.flexPrntSc02}>
              <h6>Last Updated</h6>
              <p>
                {moment(snftDetails?.updatedAt).startOf('seconds').fromNow()}
              </p>
            </div>
            <div className={styles.flexPrntSc02}>
              <h6>Creator Earnings</h6>
              <p>5%</p>
            </div>
          </div>
        </div>
        <div className={styles.CustomGrid}>
          <div className={styles.PriceHistoryCont}>
            <h1>Price History</h1>
            <Image
              src="/img/graph_img_aj.png"
              alt=""
              width={540}
              height={288}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
