import React from 'react';
import styles from './MintedTabInBox.module.scss';
import 'bootstrap-daterangepicker/daterangepicker.css';
import Image from 'next/image';
import 'rc-slider/assets/index.css';
import { FadeLoader } from 'react-spinners';
import moment from 'moment';
import useProfile from '@/hooks/useProfile';
import MyTimer from '../LiverTimer/Mytimer';
import { MintPost } from '@/types/mint';

type MintedTabInBoxProps = {
  loading: boolean;
  mintPosts: MintPost[] | null;
  getEndDate: CallableFunction;
  Status: CallableFunction;
  handleMintPostUpdate: CallableFunction;
};

export default function MintedTabInBox({
  loading,
  mintPosts,
  Status,
  getEndDate,
  handleMintPostUpdate,
}: MintedTabInBoxProps) {
  const { profileDetails, profileId } = useProfile();

  return loading ? (
    <div className={styles.loadingContainer}>
      <FadeLoader color="#ffffff" />
    </div>
  ) : mintPosts?.length ? (
    <div className={styles.MintedScrollMiddle}>
      <div className={styles.MintedMiiddle}>
        {mintPosts
          .filter((p) => p.profileId == profileId)
          .map((post, index) => {
            return (
              <div key={`post ${index}`} className={styles.LeftMiddle}>
                <div className={styles.DarknesBox}>
                  <div className={styles.DarkimgBox}>
                    <Image
                      src={post.thumbnail}
                      alt=""
                      width={105}
                      height={105}
                    />
                    <div className={styles.DarinHedh}>
                      <h3 className={styles.DariH}>{post.SNFTTitle}</h3>
                      <h6>
                        <span>Etherscan Address:</span> 0x8eb2df7137fb74...6e884
                      </h6>
                      <div className={styles.DarinImgpspan}>
                        <Image
                          src="/img/napa_icon_darknes.svg"
                          alt=""
                          width={24}
                          height={24}
                        />
                        <h2>
                          12.35 NAPA<span>Earned</span>
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className={styles.DarkiBoxmiddata}>
                    <div className={styles.DarkiBxFrst}>
                      <div className={styles.DarkiBxhpdata}>
                        <p>Date Minted</p>
                        <h3>{moment(post.timeMinted).format('D MMM YYYY')}</h3>
                      </div>
                      <div className={styles.DarkiBxhpdata}>
                        <p>Live Start Time</p>
                        <h3>{moment(post.timeMinted).format('h:mm:ss a')}</h3>
                      </div>
                    </div>
                    <div className={styles.DarkiBxSecond}>
                      <div className={styles.DarkiBxhpdata}>
                        <p>Live End Time</p>
                        <h3>{getEndDate(post.timeMinted)}</h3>
                      </div>
                      <div className={styles.DarkiBxhpdata}>
                        <p>Current Tier</p>
                        <h3>0.24 NAPA</h3>
                      </div>
                      <div className={styles.DarkiBxhpdata}>
                        <p>Status</p>
                        <h3>{Status(post.status)}</h3>
                      </div>
                    </div>
                  </div>
                  <div className={styles.DarkiBoxbtnlst}>
                    <button className={styles.DarkiBlubtn}>
                      Redeem Tokens
                    </button>
                    <button
                      onClick={() =>
                        handleMintPostUpdate({
                          mintId: post.mintId,
                          postId: post.postId,
                          profileId: profileDetails?.profileId,
                          marketplace_listed: 'true',
                        })
                      }
                      className={`${styles.DarkiDarbtn} ${
                        post.status === '0' && styles.disabledSubmitMarketBtn
                      }`}
                      disabled={post.status === '0'}
                    >
                      Submit to Marketplace
                    </button>
                    <button className={styles.DarkiDarbtn}>Ask Dave</button>
                  </div>
                  <div className={styles.timer}>
                    <MyTimer
                      // @ts-ignore
                      expiryTimestamp={new Date(post.timeMinted).setHours(
                        new Date(post.timeMinted).getHours() + 12
                      )}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  ) : (
    <h3 className={styles.noPostFound}>No post found</h3>
  );
}
