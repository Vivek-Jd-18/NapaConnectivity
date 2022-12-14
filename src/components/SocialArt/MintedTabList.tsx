import React, { useEffect } from 'react';
import styles from './MintedTabList.module.scss';
import Image from 'next/image';
import { getAllMintedPosts, updatePostMint } from '@/services/MintApi';
import { MintPost } from '@/types/mint';
import { FadeLoader } from 'react-spinners';
import moment from 'moment';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { CustomToastWithLink } from '../CustomToast/CustomToast';
import { ErrorIcon } from '../assets';
import useProfile from '@/hooks/useProfile';

export default function MintedTabList() {
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

  useEffect(() => {
    handleGetMintPosts();
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
    push('/sell-nft');
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
  };
  const Status = (statusVal: string) => {
    if (statusVal == '0') {
      return 'Live Post';
    }
    if (statusVal == '1') {
      return 'Sent for Review';
    }
    if (statusVal == '2') {
      return 'In Progress';
    }
    if (statusVal == '3') {
      return 'Pending Further Review';
    }
    if (statusVal == '4') {
      return 'Approved'
    }
    if(statusVal == '5'){
      return 'Declined'
    }
    return;
  };
  return (
    <div className={styles.MainListBox}>
      <div className={styles.MainListHead}>
        <div className={`${styles.HeadLabel} ${styles.LabelOne}`}>Name</div>
        <div className={`${styles.HeadLabel} ${styles.LabelTwo}`}>
          Date Minted
        </div>
        <div className={`${styles.HeadLabel} ${styles.LabelThree}`}>
          Live Start Date
        </div>
        <div className={`${styles.HeadLabel} ${styles.LabelFour}`}>
          Live End Date
        </div>
        <div className={`${styles.HeadLabel} ${styles.LabelSix}`}>Status</div>
        <div className={`${styles.HeadLabel} ${styles.LabelFive}`}>
          Current Tier
        </div>
        <div className={`${styles.HeadLabel} ${styles.LabelSix}`}>
          Earned <Image src="/img/tbl_sort.png" alt="" width={16} height={16} />
        </div>
        <div className={`${styles.HeadLabel} ${styles.LabelSeven}`}></div>
      </div>
      <div className={styles.MainListShdo}>
        <div className={styles.MainListList}>
          {loading ? (
            <div className={styles.loadingContainer}>
              <FadeLoader color="#ffffff" />
            </div>
          ) : mintPosts?.length ? (
            <div className={`${styles.RowLabel} ${styles.RowTwo}`}>
              {mintPosts.map((post, index) => {
                return (
                  <div className={styles.MainListListInn} key={index}>
                    <div className={`${styles.RowLabel} ${styles.RowOne}`}>
                      <Image
                        src={post.thumbnail}
                        alt=""
                        width={72}
                        height={72}
                      />
                      <div className={styles.RspnsvListtext}>
                        <div className={styles.TxtH3}>
                          <h3>{post.SNFTTitle}</h3>
                        </div>
                        <div className={styles.RspnsvEarn}>
                          <Image
                            src="/img/napa_icon_blue.png"
                            alt=""
                            width={17}
                            height={13}
                          />
                          12.35
                          <span className={styles.DefSpan}>Earned</span>
                        </div>
                      </div>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowTwo}`}>
                      <div className={styles.Rspnsvh4}>
                        <h4>Date Minted</h4>
                      </div>
                      <h6>{moment(post.timeMinted).format('D MMM YYYY')}</h6>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowThree}`}>
                      <div className={styles.Rspnsvh4}>
                        <h4>Live Start Date</h4>
                      </div>
                      <h6>{moment(post.timeMinted).format('h:mm:ss a')}</h6>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowFour}`}>
                      <div className={styles.Rspnsvh4}>
                        <h4>Live End Date</h4>
                      </div>
                      <h6>{getEndDate(post.timeMinted)}</h6>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowFour}`}>
                      <div className={styles.Rspnsvh4}>
                        <h4>Status</h4>
                      </div>
                      <h6>{Status(post.status)}</h6>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowFive}`}>
                      <div className={styles.Rspnsvh4}>
                        <h4>Current Tier</h4>
                      </div>
                      <div className={styles.RspnsvIcnSpn}>
                        <Image
                          src="/img/napa_icon.png"
                          alt=""
                          width={17}
                          height={13}
                        />
                        <h6>20.01</h6>
                      </div>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowSix}`}>
                      <div className={styles.Rspnsvh4}>
                        <h4>Earned</h4>
                      </div>
                      <div className={styles.RspnsvIcnSpn}>
                        <Image
                          src="/img/napa_icon_blue.png"
                          alt=""
                          width={17}
                          height={13}
                        />
                        <h3 className={styles.BlueH6}>12.35</h3>
                      </div>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowSeven}`}>
                      <button
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <Image
                          src="/img/dotet_ic.png"
                          alt=""
                          width={24}
                          height={24}
                        />
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end drpdwn_list">
                        <li>
                          <a className="dropdown-item" href="#">
                            <Image
                              src="/img/gift_icon.png"
                              alt=""
                              width={20}
                              height={20}
                            />
                            Redeem Tokens
                          </a>
                        </li>
                        <li>
                          <a
                            className={`${
                              post.status === '0' && styles.disabled
                            } dropdown-item`}
                            href="#"
                            onClick={() =>
                              handleMintPostUpdate({
                                mintId: post.mintId,
                                postId: post.postId,
                                profileId: profileDetails?.profileId,
                                marketplace_listed: 'true',
                              })
                            }
                          >
                            <Image
                              src="/img/send_icon.png"
                              alt=""
                              width={20}
                              height={20}
                            />
                            Submit to NFT Marketplace
                          </a>
                          <a
                            className={`dropdown-item`}
                            href="#"
                            onClick={() =>
                              handleMintPostUpdate({
                                mintId: post.mintId,
                                postId: post.postId,
                                profileId: profileDetails?.profileId,
                                marketplace_listed: 'true',
                              })
                            }
                          >
                            <Image
                              src="/img/send_icon.png"
                              alt=""
                              width={20}
                              height={20}
                            />
                            Ask Dave
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <h3 className={styles.noPostFound}>No post found</h3>
          )}
        </div>
      </div>
    </div>
  );
}
