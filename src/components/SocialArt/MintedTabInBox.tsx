import React, { useEffect } from 'react';
import styles from './MintedTabInBox.module.scss';
import 'bootstrap-daterangepicker/daterangepicker.css';
import Image from 'next/image';
import 'rc-slider/assets/index.css';
import { getAllMintedPosts, updatePostMint } from '@/services/MintApi';
import { MintPost } from '@/types/mint';
import { FadeLoader } from 'react-spinners';
import moment from 'moment';
import useProfile from '@/hooks/useProfile';
import { toast } from 'react-toastify';
import { CustomToastWithLink } from '../CustomToast/CustomToast';
import { ErrorIcon } from '../assets';
import { useRouter } from 'next/router';

type MintedTabInBoxProps = {
  socket: WebSocket;
};

export default function MintedTabInBox({ socket }: MintedTabInBoxProps) {
  const [loading, setLoading] = React.useState(false);
  const [mintPosts, setMintPosts] = React.useState<MintPost[] | null>(null);
  const { push } = useRouter();
  const { profileDetails } = useProfile();

  const handleGetMintPosts = async () => {
    setLoading(true);
    const { data }: any = await getAllMintedPosts();
    setMintPosts(data?.data || []);
    setLoading(false);
  };

  const handleNewMint = (post: any) => {
    setMintPosts((prevState) => {
      if (prevState) {
        const data = [post, ...prevState];
        const filteredPost = data.filter(
          (v, i, a) => a.findIndex((v2) => v2?.postId === v?.postId) === i
        );
        return [...filteredPost];
      } else {
        let data = [];
        // @ts-ignore
        data.push(post);
        return [...data];
      }
    });
  };

  useEffect(() => {
    handleGetMintPosts();
  }, []);

  useEffect(() => {
    // @ts-ignore
    socket.addEventListener('message', ({ data }) => {
      const response = JSON.parse(data);
      if (response?.event === 'mints') {
        handleNewMint(response?.posts);
      }
    });
    return () => {
      socket.removeEventListener('message', () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getEndDate = (timestamp: any) => {
    const date = new Date(timestamp).getTime();
    const endTime = new Date(date + 12 * 3600 * 1000);
    return moment(endTime).format('h:mm:ss a');
  };

  const handleMintPostUpdate = async (data: any) => {
    setLoading(true);
    const { message, error } = await updatePostMint(data);
    setLoading(false);
    push('/sell-nft')
    if (error) {
        setLoading(false);
        toast.error(
          CustomToastWithLink({
            icon: ErrorIcon,
            title: 'Error',
            description: message,
            time: 'Now',
          })
        );
        return;
    }
    setLoading(false);
  }

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
                  <Image src={post.thumbnail} alt="" width={105} height={105} />
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
                </div>post
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
                  </div>
                </div>
                <div className={styles.DarkiBoxbtnlst}>
                  <button className={styles.DarkiBlubtn}>Redeem Tokens</button>
                  <button onClick={() => handleMintPostUpdate({mintId:post.mintId, postId: post.postId, profileId: profileDetails?.profileId, marketplace_listed: "true"})} className={`${styles.DarkiDarbtn} ${post.status === "0" && styles.disabledSubmitMarketBtn}`} disabled={post.status === "0"}>
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
