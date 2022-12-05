import React from 'react'
import styles from './MintedTabList.module.scss';
import Image from 'next/image';

export default function MintedTabList() {
  return (
    <div className={styles.MainListBox}>
        <div className={styles.MainListHead}>
            <div className={`${styles.HeadLabel} ${styles.LabelOne}`}>
                Name
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
                <div className={styles.MainListListInn}>
                    <div className={`${styles.RowLabel} ${styles.RowOne}`}>
                        <Image src="/img/list01.png" alt="" width={72} height={72} />
                        <div className={styles.RspnsvListtext}>
                            <div className={styles.TxtH3}>
                                <h3>Illusions of Darkness</h3>
                            </div>
                            <div className={styles.RspnsvEarn}>
                                <Image src="/img/napa_icon_blue.png" alt="" width={17} height={13} />
                                12.35
                                <span className={styles.DefSpan}>Earned</span>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowTwo}`}>
                        <div className={styles.Rspnsvh4}>
                            <h4>Date Minted</h4>
                        </div>
                        <h6>12 Mar 2022</h6>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowThree}`}>
                        <div className={styles.Rspnsvh4}>
                            <h4>Date Minted</h4>
                        </div>
                        <h6>4 Aug 2022</h6>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowFour}`}>
                        <div className={styles.Rspnsvh4}>
                            <h4>Date Minted</h4>
                        </div>
                        <h6>17 Aug 2022 </h6>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowFive}`}>
                        <div className={styles.Rspnsvh4}>
                            <h4>Date Minted</h4>
                        </div>
                        <div className={styles.RspnsvIcnSpn}>
                            <Image src="/img/napa_icon.png" alt="" width={17} height={13} />
                            <h6>20.01</h6>
                        </div>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowSix}`}>
                        <div className={styles.Rspnsvh4}>
                            <h4>Date Minted</h4>
                        </div>
                        <div className={styles.RspnsvIcnSpn}>
                            <Image src="/img/napa_icon_blue.png" alt="" width={17} height={13} />
                            <h3 className={styles.BlueH6}>12.35</h3>
                        </div>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowSeven}`}>
                        <button role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <Image src="/img/dotet_ic.png" alt="" width={24} height={24} />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end drpdwn_list">
                            <li>
                                <a className="dropdown-item" href="#">
                                    <Image src="/img/gift_icon.png" alt="" width={20} height={20} />
                                    Redeem Tokens
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    <Image src="/img/send_icon.png" alt="" width={20} height={20} />
                                    Submit to NFT Marketplace    
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Second Box */}

                <div className={styles.MainListListInn}>
                    <div className={`${styles.RowLabel} ${styles.RowOne}`}>
                        <Image src="/img/list02.png" alt="" width={72} height={72} />
                        <div className={styles.RspnsvListtext}>
                            <div className={styles.TxtH3}>
                                <h3>We Came As Aliens</h3>
                            </div>
                            <div className={styles.RspnsvEarn}>
                                <Image src="/img/napa_icon_blue.png" alt="" width={17} height={13} />
                                    8.21
                                <span className={styles.DefSpan}>Earned</span>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowTwo}`}>
                        <div className={styles.Rspnsvh4}>
                            <h4>Date Minted</h4>
                        </div>
                        <h6>8 Mar 2022</h6>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowThree}`}>
                        <div className={styles.Rspnsvh4}>
                            <h4>Date Minted</h4>
                        </div>
                        <h6>1 Aug 2022</h6>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowFour}`}>
                        <div className={styles.Rspnsvh4}>
                            <h4>Date Minted</h4>
                        </div>
                        <h6>12 Aug 2022 </h6>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowFive}`}>
                        <div className={styles.Rspnsvh4}>
                            <h4>Date Minted</h4>
                        </div>
                        <div className={styles.RspnsvIcnSpn}>
                            <Image src="/img/napa_icon.png" alt="" width={17} height={13} />
                            <h6>0.32</h6>
                        </div>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowSix}`}>
                        <div className={styles.Rspnsvh4}>
                            <h4>Date Minted</h4>
                        </div>
                        <div className={styles.RspnsvIcnSpn}>
                            <Image src="/img/napa_icon_blue.png" alt="" width={17} height={13} />
                            <h3 className={styles.BlueH6}>12.35</h3>
                        </div>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowSeven}`}>
                        <button role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <Image src="/img/dotet_ic.png" alt="" width={24} height={24} />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end drpdwn_list">
                            <li>
                                <a className="dropdown-item" href="#">
                                    <Image src="/img/gift_icon.png" alt="" width={20} height={20} />
                                    Redeem Tokens
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    <Image src="/img/send_icon.png" alt="" width={20} height={20} />
                                    Submit to NFT Marketplace    
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                
                {/* ThirdBox */}

                <div className={styles.MainListListInn}>
                    <div className={`${styles.RowLabel} ${styles.RowOne}`}>
                        <Image src="/img/list03.png" alt="" width={72} height={72} />
                        <div className={styles.RspnsvListtext}>
                            <div className={styles.TxtH3}>
                                <h3>Of Aliens & Men</h3>
                            </div>
                            <div className={styles.RspnsvEarn}>
                                <Image src="/img/napa_icon_blue.png" alt="" width={17} height={13} />
                                    10.33 
                                <span className={styles.DefSpan}>Earned</span>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowTwo}`}>
                        <div className={styles.Rspnsvh4}>
                            <h4>Date Minted</h4>
                        </div>
                        <h6>24 Apr 2022</h6>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowThree}`}>
                        <div className={styles.Rspnsvh4}>
                            <h4>Date Minted</h4>
                        </div>
                        <h6>19 Aug 2022</h6>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowFour}`}>
                        <div className={styles.Rspnsvh4}>
                            <h4>Date Minted</h4>
                        </div>
                        <h6>24 Aug 2022 </h6>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowFive}`}>
                        <div className={styles.Rspnsvh4}>
                            <h4>Date Minted</h4>
                        </div>
                        <div className={styles.RspnsvIcnSpn}>
                            <Image src="/img/napa_icon.png" alt="" width={17} height={13} />
                            <h6>0.95</h6>
                        </div>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowSix}`}>
                        <div className={styles.Rspnsvh4}>
                            <h4>Date Minted</h4>
                        </div>
                        <div className={styles.RspnsvIcnSpn}>
                            <Image src="/img/napa_icon_blue.png" alt="" width={17} height={13} />
                            <h3 className={styles.BlueH6}>10.33</h3>
                        </div>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowSeven}`}>
                        <button role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <Image src="/img/dotet_ic.png" alt="" width={24} height={24} />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end drpdwn_list">
                            <li>
                                <a className="dropdown-item" href="#">
                                    <Image src="/img/gift_icon.png" alt="" width={20} height={20} />
                                    Redeem Tokens
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    <Image src="/img/send_icon.png" alt="" width={20} height={20} />
                                    Submit to NFT Marketplace    
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>


                {/* ForthBox */}

                <div className={styles.MainListListInn}>
                    <div className={`${styles.RowLabel} ${styles.RowOne}`}>
                        <Image src="/img/list04.png" alt="" width={72} height={72} />
                        <div className={styles.RspnsvListtext}>
                            <div className={styles.TxtH3}>
                                <h3>The Magic Galaxies</h3>
                            </div>
                            <div className={styles.RspnsvEarn}>
                                <Image src="/img/napa_icon_blue.png" alt="" width={17} height={13} />
                                    10.33 
                                <span className={styles.DefSpan}>Earned</span>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowTwo}`}>
                        <div className={styles.Rspnsvh4}>
                            <h4>Date Minted</h4>
                        </div>
                        <h6>9 Apr 2022</h6>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowThree}`}>
                        <div className={styles.Rspnsvh4}>
                            <h4>Date Minted</h4>
                        </div>
                        <h6>2 Aug 2022</h6>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowFour}`}>
                        <div className={styles.Rspnsvh4}>
                            <h4>Date Minted</h4>
                        </div>
                        <h6>29 Aug 2022</h6>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowFive}`}>
                        <div className={styles.Rspnsvh4}>
                            <h4>Date Minted</h4>
                        </div>
                        <div className={styles.RspnsvIcnSpn}>
                            <Image src="/img/napa_icon.png" alt="" width={17} height={13} />
                            <h6>0.48</h6>
                        </div>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowSix}`}>
                        <div className={styles.Rspnsvh4}>
                            <h4>Date Minted</h4>
                        </div>
                        <div className={styles.RspnsvIcnSpn}>
                            <Image src="/img/napa_icon_blue.png" alt="" width={17} height={13} />
                            <h3 className={styles.BlueH6}>6.02</h3>
                        </div>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowSeven}`}>
                        <button role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <Image src="/img/dotet_ic.png" alt="" width={24} height={24} />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end drpdwn_list">
                            <li>
                                <a className="dropdown-item" href="#">
                                    <Image src="/img/gift_icon.png" alt="" width={20} height={20} />
                                    Redeem Tokens
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    <Image src="/img/send_icon.png" alt="" width={20} height={20} />
                                    Submit to NFT Marketplace    
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* fiveBox */}
                <div className={styles.MainListListInn}>
                    <div className={`${styles.RowLabel} ${styles.RowOne}`}>
                        <Image src="/img/list02.png" alt="" width={72} height={72} />
                        <div className={styles.RspnsvListtext}>
                            <div className={styles.TxtH3}>
                                <h3>The Magic Galaxies</h3>
                            </div>
                            <div className={styles.RspnsvEarn}>
                                <Image src="/img/napa_icon_blue.png" alt="" width={17} height={13} />
                                    10.33 
                                <span className={styles.DefSpan}>Earned</span>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowTwo}`}>
                        <div className={styles.Rspnsvh4}>
                            <h4>Date Minted</h4>
                        </div>
                        <h6>9 Apr 2022</h6>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowThree}`}>
                        <div className={styles.Rspnsvh4}>
                            <h4>Date Minted</h4>
                        </div>
                        <h6>2 Aug 2022</h6>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowFour}`}>
                        <div className={styles.Rspnsvh4}>
                            <h4>Date Minted</h4>
                        </div>
                        <h6>29 Aug 2022</h6>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowFive}`}>
                        <div className={styles.Rspnsvh4}>
                            <h4>Date Minted</h4>
                        </div>
                        <div className={styles.RspnsvIcnSpn}>
                            <Image src="/img/napa_icon.png" alt="" width={17} height={13} />
                            <h6>0.48</h6>
                        </div>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowSix}`}>
                        <div className={styles.Rspnsvh4}>
                            <h4>Date Minted</h4>
                        </div>
                        <div className={styles.RspnsvIcnSpn}>
                            <Image src="/img/napa_icon_blue.png" alt="" width={17} height={13} />
                            <h3 className={styles.BlueH6}>6.02</h3>
                        </div>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowSeven}`}>
                        <button role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <Image src="/img/dotet_ic.png" alt="" width={24} height={24} />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end drpdwn_list">
                            <li>
                                <a className="dropdown-item" href="#">
                                    <Image src="/img/gift_icon.png" alt="" width={20} height={20} />
                                    Redeem Tokens
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    <Image src="/img/send_icon.png" alt="" width={20} height={20} />
                                    Submit to NFT Marketplace    
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* sixBox */}
                <div className={styles.MainListListInn}>
                    <div className={`${styles.RowLabel} ${styles.RowOne}`}>
                        <Image src="/img/list01.png" alt="" width={72} height={72} />
                        <div className={styles.RspnsvListtext}>
                            <div className={styles.TxtH3}>
                                <h3>The Magic Galaxies</h3>
                            </div>
                            <div className={styles.RspnsvEarn}>
                                <Image src="/img/napa_icon_blue.png" alt="" width={17} height={13} />
                                    10.33 
                                <span className={styles.DefSpan}>Earned</span>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowTwo}`}>
                        <div className={styles.Rspnsvh4}>
                            <h4>Date Minted</h4>
                        </div>
                        <h6>9 Apr 2022</h6>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowThree}`}>
                        <div className={styles.Rspnsvh4}>
                            <h4>Date Minted</h4>
                        </div>
                        <h6>2 Aug 2022</h6>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowFour}`}>
                        <div className={styles.Rspnsvh4}>
                            <h4>Date Minted</h4>
                        </div>
                        <h6>29 Aug 2022</h6>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowFive}`}>
                        <div className={styles.Rspnsvh4}>
                            <h4>Date Minted</h4>
                        </div>
                        <div className={styles.RspnsvIcnSpn}>
                            <Image src="/img/napa_icon.png" alt="" width={17} height={13} />
                            <h6>0.48</h6>
                        </div>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowSix}`}>
                        <div className={styles.Rspnsvh4}>
                            <h4>Date Minted</h4>
                        </div>
                        <div className={styles.RspnsvIcnSpn}>
                            <Image src="/img/napa_icon_blue.png" alt="" width={17} height={13} />
                            <h3 className={styles.BlueH6}>6.02</h3>
                        </div>
                    </div>
                    <div className={`${styles.RowLabel} ${styles.RowSeven}`}>
                        <button role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <Image src="/img/dotet_ic.png" alt="" width={24} height={24} />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end drpdwn_list">
                            <li>
                                <a className="dropdown-item" href="#">
                                    <Image src="/img/gift_icon.png" alt="" width={20} height={20} />
                                    Redeem Tokens
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    <Image src="/img/send_icon.png" alt="" width={20} height={20} />
                                    Submit to NFT Marketplace    
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* seven box */}
            </div>
        </div>
    </div>
  )
}
