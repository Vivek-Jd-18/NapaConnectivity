import React, { useEffect } from 'react';
import styles from './MintedTabInBox.module.scss';
import 'bootstrap-daterangepicker/daterangepicker.css';
import Image from 'next/image';
import 'rc-slider/assets/index.css';
import { getAllMintedPosts } from '@/services/MintApi';
import { MintPost } from '@/types/mint';
import { FadeLoader } from 'react-spinners';
import useProfile from '@/hooks/useProfile';
import moment from 'moment';

export default function MintedTabInBox() {
  const [loading, setLoading] = React.useState(false);
  const [mintPosts, setMintPosts] = React.useState<MintPost[] | null>(null);
  const { profileId } = useProfile();

  const handleGetMintPosts = async () => {
    setLoading(true);
    const { data }: any = await getAllMintedPosts();
    setMintPosts(data?.data || []);
    setLoading(false);
  };

  useEffect(() => {
    handleGetMintPosts();
  }, []);

  const getEndDate = (timestamp: any) => {
    let date = new Date(timestamp);
    date.setTime(date.getTime() + 12 * 60 * 60 * 1000);
    return moment(date).format('D MMM YYYY');
  };

  return loading ? (
    <div className={styles.loadingContainer}>
      <FadeLoader color="#ffffff" />
    </div>
  ) : mintPosts?.length ? (
    <div className={styles.MintedScrollMiddle}>
      <div className={styles.MintedMiiddle}>
        {mintPosts.map((post, index) => {
          return (
            <div key={`post ${index}`} className={styles.LeftMiddle}>
              <div className={styles.DarknesBox}>
                <div className={styles.DarkimgBox}>
                  <Image
                    src="/img/darknes_ic.svg"
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
                      <p>Live Start Date</p>
                      <h3>{moment(post.timeMinted).format('D MMM YYYY')}</h3>
                    </div>
                  </div>
                  <div className={styles.DarkiBxSecond}>
                    <div className={styles.DarkiBxhpdata}>
                      <p>Live End Date</p>
                      <h3>{getEndDate(post.timeMinted)}</h3>
                    </div>
                    <div className={styles.DarkiBxhpdata}>
                      <p>Current Rewards Tier</p>
                      <h3>0.24 NAPA</h3>
                    </div>
                  </div>
                </div>
                <div className={styles.DarkiBoxbtnlst}>
                  <button className={styles.DarkiBlubtn}>Redeem Tokens</button>
                  <button className={styles.DarkiDarbtn}>
                    Submit to Marketplace
                  </button>
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
