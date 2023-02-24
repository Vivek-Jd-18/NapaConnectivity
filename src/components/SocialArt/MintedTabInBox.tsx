import React, { useEffect } from 'react';
import styles from './MintedTabInBox.module.scss';
import 'bootstrap-daterangepicker/daterangepicker.css';
import Image from 'next/image';
import 'rc-slider/assets/index.css';
import { FadeLoader } from 'react-spinners';
import moment from 'moment';
import MyTimer from '../LiverTimer/Mytimer';
import { MintPost } from '../../types/mint';
import { useRouter } from 'next/router';
import { nftAddress } from '../../connectivity/addressHelpers/addressHelper';

type MintedTabInBoxProps = {
  loading: boolean;
  mintPosts: MintPost[] | null;
  getEndDate: CallableFunction;
  Status: CallableFunction;
  handleMintPostUpdate: CallableFunction;
  profileId: string;
  socket: WebSocket;
};

export default function MintedTabInBox({
  loading,
  mintPosts,
  Status,
  getEndDate,
  handleMintPostUpdate,
  profileId,
  socket,
}: MintedTabInBoxProps) {
  const [tokenPrice, setTokenPrice] = React.useState(4.29650254);
  const { push } = useRouter();
  const [filteredMintedPosts, setFilteredMintedPosts] = React.useState<
    MintPost[]
  >([]);

  useEffect(() => {
    if (mintPosts) {
      const temp = mintPosts?.filter((p) => p?.profileId === profileId);
      setFilteredMintedPosts(temp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mintPosts, profileId]);

  useEffect(() => {
    // @ts-ignore
    socket.addEventListener('message', ({ data }) => {
      const response = JSON.parse(data);
      if (response?.event === 'napa-token-price') {
        setTokenPrice(response?.price);
      }
    });
    return () => {
      socket.removeEventListener('message', () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <div className={styles.loadingContainer}>
      <FadeLoader color="#ffffff" />
    </div>
  ) : filteredMintedPosts.length ? (
    <div className={styles.MintedScrollMiddle}>
      <div className={styles.MintedMiiddle}>
        {filteredMintedPosts.map((post, index) => {
          return (
            <div key={`post ${index}`} className={styles.LeftMiddle}>
              <div className={styles.DarknesBox}>
                <div className={styles.DarkimgBox}>
                  <Image src={post.thumbnail} alt="" width={105} height={105} />
                  <div className={styles.DarinHedh}>
                    <h3 className={styles.DariH}>{post.SNFTTitle}</h3>
                    <h6>
                      <span>Etherscan Address:</span>{' '}
                      <a
                        href={
                          'https://goerli.etherscan.io/address/0x20bf1A09C7C7211ead72dE3d96bC129CD2BFE743'
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        {nftAddress}
                      </a>
                    </h6>
                    <h6>
                      <span>Token Id:</span>{' '}
                      {post.tokenId?.toString()?.padStart(7, '0')}
                    </h6>
                    <div className={styles.DarinImgpspan}>
                      <Image
                        src="/img/napa_icon_darknes.svg"
                        alt=""
                        width={24}
                        height={24}
                      />
                      <h2>
                        {post.napaTokenEarned
                          ? post.napaTokenEarned
                          : tokenPrice}{' '}
                        NAPA<span>Earned</span>
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
                      <h3>(tiers 1-10)</h3>
                    </div>
                    <div className={styles.DarkiBxhpdata}>
                      <p>Status</p>
                      <h3>{Status(post.status)}</h3>
                    </div>
                  </div>
                </div>
                <div className={styles.DarkiBoxbtnlst}>
                  <button className={styles.DarkiBlubtn}>Redeem Tokens</button>
                  {post.marketplace_listed == 'true' ? (
                    <button
                      onClick={() => push(`snft-details?id=${post.snftId}`)}
                      className={`${styles.DarkiDarbtn} ${
                        post.status === '0' && styles.disabledSubmitMarketBtn
                      }`}
                    >
                      Already Listed
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleMintPostUpdate({
                          mintId: post.mintId,
                          postId: post.postId,
                          profileId: profileId,
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
                  )}
                  <button className={styles.DarkiDarbtn}>Ask DAVE</button>
                </div>
                <div className={styles.timer}>
                  <MyTimer
                    // @ts-ignore
                    expiryTimestamp={new Date(post.timeMinted).setHours(
                      new Date(post.timeMinted).getHours() + 12
                    )}
                    postId={post.postId}
                    napaTokenEarned={post.napaTokenEarned}
                    socket={socket}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : !profileId ? (
    <h3 className={styles.noPostFound}>Wallet must be connected</h3>
  ) : (
    <h3 className={styles.noPostFound}>No post found</h3>
  );
}
