import React from 'react'
import styles from './SectionOne.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function SectionOne() {
  return (
    <div className={styles.SectionOne}>
        <div className={styles.CustomGridContainer}>
            <div className={styles.CustomGrid}>
                <div className={styles.imgPerntScone}>
                    <Image src="/img/crat_nft_tow_aj.png" alt="" width={540} height={540} />
                </div>
            </div>
            <div className={styles.CustomGrid}>
                <div className={styles.ScOneLeftCont}>
                    <h1>Illusions of Darkness</h1>
                    <p>Abilities or he perfectly pretended so strangers be exquisite. Oh to another chamber pleased imagine do in.</p>
                    <div className={styles.imgAndperaFlex}>
                        <Image src="/img/tombradley_img_aj.svg" alt="" width={40} height={40} />
                        <p>Tom Bradley</p>
                    </div>
                    <div className={styles.thrBtnPrnt}>
                        <Link  href="/" ><a className={styles.linkPernt}>Edit</a></Link>
                        <Link href="/" ><a className={styles.linkPernt}>Sell</a></Link>
                        <div className={`${styles.RowLabel} ${styles.RowSeven}`}>
                            <div className={styles.butnPernt}>
                                <button role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <Image src="/img/tow_dot_white_img.svg" alt="" width={32} height={32} />
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end drpdwn_list">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Add to Watchlist
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Add to Valuator
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Add to Favorites
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
  )
}
