import React from 'react';
import styles from './SectionOne.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { SnftResponse } from '@/types/marketplace';

type SectionOneProps = {
  snftDetails: SnftResponse | null;
  profileId: string | null;
};

export default function SectionOne({
  snftDetails,
  profileId,
}: SectionOneProps) {
  return (
    <div className={styles.SectionOne}>
      <div className={styles.CustomGridContainer}>
        <div className={styles.CustomGrid}>
          <div className={styles.imgPerntScone}>
            {/* <Image
              src="/img/crat_nft_tow_aj.png"
              alt=""
              width={540}
              height={540}
            /> */}
            <video
              width={'100%'}
              height={'100%'}
              autoPlay
              controls
              muted
              loop
              src={snftDetails?.videoURL as string}
            ></video>
          </div>
        </div>
        <div className={styles.CustomGrid}>
          <div className={styles.ScOneLeftCont}>
            <h1>{snftDetails?.collection}</h1>
            <p>
              Abilities or he perfectly pretended so strangers be exquisite. Oh
              to another chamber pleased imagine do in.
            </p>
            <div className={styles.imgAndperaFlex}>
              <Image
                src={`${snftDetails?.userImage ? snftDetails?.userImage : ''}`}
                alt=""
                width={40}
                height={40}
              />
              <p>{snftDetails?.userName}</p>
            </div>
            {/* <div className={styles.CurrentBitBox}>
                        <div className={styles.CurrentBitBoxInrr}>
                            <p>Current Bit</p>
                            <div className={styles.imgAdnHH}>
                                <Image
                                    src="/img/napa_ic.svg"
                                    height="28px"
                                    width="28px"
                                    alt=""
                                    className=""
                                />
                                <h3>0.24</h3>
                            </div>
                        </div>
                        <div className={styles.CurrentBitBoxInrr}>
                            <p>Ending In</p>
                            <div className={styles.imgAdnHH}>
                                <h3>4 h 32 min</h3>
                            </div>
                        </div>
                    </div> */}
            <div className={styles.thrBtnPrnt}>
              {profileId == snftDetails?.profileId && (
                <Link href="/">
                  <a className={styles.linkPernt}>Edit</a>
                </Link>
              )}
              <Link href="/sell-nft-page-sc">
                <a className={styles.linkPernt}>Sell</a>
              </Link>
              <Link href="/">
                <a className={styles.linkPernt}>Cancel</a>
              </Link>
              <Link href="/">
                <a className={styles.linkPernt}>Submit Offer</a>
              </Link>
              {profileId != snftDetails?.profileId && (
                <Link href="/">
                  <a className={styles.linkPernt}>
                    Buy Now for {snftDetails?.amount} NAPA
                  </a>
                </Link>
              )}
              <div className={`${styles.RowLabel} ${styles.RowSeven}`}>
                <div className={styles.butnPernt}>
                  <button
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <Image
                      src="/img/tow_dot_white_img.svg"
                      alt=""
                      width={32}
                      height={32}
                    />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end drpdwn_list">
                    <li>
                      <a className="dropdown-item" href="#">
                        Add to Watchlist
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Add to DAVE
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="co-batching-pools">
                        Create New Pool
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// for create new pool the NFT or SFT will be added to co-bathing pools on step 2 //
