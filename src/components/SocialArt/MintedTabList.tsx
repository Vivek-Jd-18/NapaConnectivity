import React from 'react';
import styles from './MintedTabList.module.scss';
import Image from 'next/image';
import { MintPost } from '@/types/mint';
import { FadeLoader } from 'react-spinners';
import moment from 'moment';
import MyTimer from '../LiverTimer/Mytimer';

type MintedTabListProps = {
  loading: boolean;
  mintPosts: MintPost[] | null;
  getEndDate: CallableFunction;
  Status: CallableFunction;
  handleMintPostUpdate: CallableFunction;
  profileId: string;
};

export default function MintedTabList({
  loading,
  mintPosts,
  getEndDate,
  Status,
  handleMintPostUpdate,
  profileId,
}: MintedTabListProps) {
  return (
    <div className={styles.MainListBox}>
      <div className={styles.MainListHead}>
        <div className={`${styles.HeadLabel} ${styles.LabelOne}`}>Name</div>
        <div className={`${styles.HeadLabel} ${styles.LabelTwo}`}>
          Live Time Remaining
        </div>
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
              {mintPosts
                .filter((p) => p?.profileId == profileId)
                .map((post, index) => {
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
                      <div className={`${styles.RowLabel} ${styles.RowThree}`}>
                        <div className={styles.Rspnsvh4}>
                          <h4>Live Post Remaining</h4>
                        </div>
                        <MyTimer
                          // @ts-ignore
                          expiryTimestamp={new Date(post.timeMinted).setHours(
                            new Date(post.timeMinted).getHours() + 12
                          )}
                        />
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
                          <h6>(tiers 1-10)</h6>
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
                                  profileId: profileId,
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
                              Submit to Marketplace
                            </a>
                            <a className={`dropdown-item`}>
                              <Image
                                src="/img/send_icon.png"
                                alt=""
                                width={20}
                                height={20}
                              />
                              Ask DAVE
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
