import React from 'react'
import styles from './MintedTabInBox.module.scss';
import 'bootstrap-daterangepicker/daterangepicker.css';
import Image from 'next/image';
import 'rc-slider/assets/index.css';

export default function MintedTabInBox() {
  return (
    <div className={styles.MintedScrollMiddle}>
        <div className={styles.MintedMiiddle}>
            {/* <Frst_box */}
            <div className={styles.LeftMiddle}>          
                <div className={styles.DarknesBox}>
                    <div className={styles.DarkimgBox}>
                        <Image src="/img/darknes_ic.svg" alt="" width={80} height={80} />
                        <div className={styles.DarinHedh}>                     
                            <h3 className={styles.DariH}>Illusions of Darkness</h3>
                            <div className={styles.DarinImgpspan}>
                                <Image src="/img/napa_icon_darknes.svg" alt="" width={24} height={24} />
                                <h2>12.35 NAPA<span>Earned</span></h2>
                            </div>
                        </div>
                    </div>
                    <div className={styles.DarkiBoxmiddata}>
                        <div className={styles.DarkiBxFrst}>
                            <div className={styles.DarkiBxhpdata}>
                                <p>Date Minted</p>
                                <h3>12 Mar 2022</h3>
                            </div>
                            <div className={styles.DarkiBxhpdata}>
                                <p>Live Start Date</p>
                                <h3>4 Aug 2022 </h3>
                            </div>
                        </div>
                        <div className={styles.DarkiBxSecond}>
                            <div className={styles.DarkiBxhpdata}>
                                <p>Live End Date</p>
                                <h3>17 Aug 2022 </h3>
                            </div>
                            <div className={styles.DarkiBxhpdata}>
                                <p>Current Rewards Tier</p>
                                <h3>0.24 NAPA</h3>
                            </div>
                        </div>
                    </div>
                    <div className={styles.DarkiBoxbtnlst}>
                        <button className={styles.DarkiBlubtn}>Redeem Tokens</button>
                        <button className={styles.DarkiDarbtn}>Submit to Marketplace</button>
                    </div>
                </div>
            </div>
            {/* <Second_box */}
            <div className={styles.RightMiiddle}>
                <div className={styles.DarknesBox}>
                    <div className={styles.DarkimgBox}>
                        <Image src="/img/darknes_ic_02.png" alt="" width={80} height={80} />
                        <div className={styles.DarinHedh}>                     
                            <h3 className={styles.DariH}>We Came As Aliens</h3>
                            <div className={styles.DarinImgpspan}>
                                <Image src="/img/napa_icon_darknes.svg" alt="" width={24} height={24} />
                                <h2>8.21 NAPA<span>Earned</span></h2>
                            </div>
                        </div>
                    </div>
                    <div className={styles.DarkiBoxmiddata}>
                        <div className={styles.DarkiBxFrst}>
                            <div className={styles.DarkiBxhpdata}>
                                <p>Date Minted</p>
                                <h3>8 Mar 2022</h3>
                            </div>
                            <div className={styles.DarkiBxhpdata}>
                                <p>Live Start Date</p>
                                <h3>1 Aug 2022 </h3>
                            </div>
                        </div>
                        <div className={styles.DarkiBxSecond}>
                            <div className={styles.DarkiBxhpdata}>
                                <p>Live End Date</p>
                                <h3>12 Aug 2022 </h3>
                            </div>
                            <div className={styles.DarkiBxhpdata}>
                                <p>Current Rewards Tier</p>
                                <h3>0.32 NAPA</h3>
                            </div>
                        </div>
                        
                    </div>
                    <div className={styles.DarkiBoxbtnlst}>
                        <button className={styles.DarkiBlubtn}>Redeem Tokens</button>
                        <button className={styles.DarkiDarbtn}>Submit to Marketplace</button>
                    </div>
                </div>
            </div>

            {/* <Thied_box */}
            <div className={styles.LeftMiddle}>          
                <div className={styles.DarknesBox}>
                    <div className={styles.DarkimgBox}>
                        <Image src="/img/darknes_ic_03.svg" alt="" width={80} height={80} />
                        <div className={styles.DarinHedh}>                     
                            <h3 className={styles.DariH}>Of Aliens & Men</h3>
                            <div className={styles.DarinImgpspan}>
                                <Image src="/img/napa_icon_darknes.svg" alt="" width={24} height={24} />
                                <h2>10.33 NAPA<span>Earned</span></h2>
                            </div>
                        </div>
                    </div>
                    <div className={styles.DarkiBoxmiddata}>
                        <div className={styles.DarkiBxFrst}>
                            <div className={styles.DarkiBxhpdata}>
                                <p>Date Minted</p>
                                <h3>24 Apr 2022</h3>
                            </div>
                            <div className={styles.DarkiBxhpdata}>
                                <p>Live Start Date</p>
                                <h3>19 Aug 2022 </h3>
                            </div>
                        </div>   
                        <div className={styles.DarkiBxSecond}>
                            <div className={styles.DarkiBxhpdata}>
                                <p>Live End Date</p>
                                <h3>24 Aug 2022 </h3>
                            </div>
                            <div className={styles.DarkiBxhpdata}>
                                <p>Current Rewards Tier</p>
                                <h3>0.95 NAPA</h3>
                            </div>
                        </div>                        
                    </div>
                    <div className={styles.DarkiBoxbtnlst}>
                        <button className={styles.DarkiBlubtn}>Redeem Tokens</button>
                        <button className={styles.DarkiDarbtn}>Submit to Marketplace</button>
                    </div>
                </div>
            </div>
            {/* Four_box */}
            <div className={styles.RightMiiddle}>
                <div className={styles.DarknesBox}>
                    <div className={styles.DarkimgBox}>
                        <Image src="/img/darknes_ic_04.png" alt="" width={80} height={80} />
                        <div className={styles.DarinHedh}>                     
                            <h3 className={styles.DariH}>The Magic Galaxies</h3>
                            <div className={styles.DarinImgpspan}>
                                <Image src="/img/napa_icon_darknes.svg" alt="" width={24} height={24} />
                                <h2>6.02 NAPA<span>Earned</span></h2>
                            </div>
                        </div>
                    </div>
                    <div className={styles.DarkiBoxmiddata}>
                        <div className={styles.DarkiBxFrst}>
                            <div className={styles.DarkiBxhpdata}>
                                <p>Date Minted</p>
                                <h3>9 Apr 2022</h3>
                            </div>
                            <div className={styles.DarkiBxhpdata}>
                                <p>Live Start Date</p>
                                <h3>2 Aug 2022</h3>
                            </div>
                        </div>
                        <div className={styles.DarkiBxSecond}>
                            <div className={`${styles.DarkiBxhpdata} ${styles.DarkiBxhpdataSec}`}>
                                <p>Live End Date</p>
                                <h3>29 Aug 2022</h3>
                            </div>
                            <div className={styles.DarkiBxhpdata}>
                                <p>Current Rewards Tier</p>
                                <h3>0.48 NAPA</h3>
                            </div>
                        </div>
                    </div>
                    <div className={styles.DarkiBoxbtnlst}>
                        <button className={styles.DarkiBlubtn}>Redeem Tokens</button>
                        <button className={styles.DarkiDarbtn}>Submit to Marketplace</button>
                    </div>
                </div>
            </div>


            {/* <Five_box */}
            <div className={styles.LeftMiddle}>          
                <div className={styles.DarknesBox}>
                    <div className={styles.DarkimgBox}>
                        <Image src="/img/darknes_ic_03.svg" alt="" width={80} height={80} />
                        <div className={styles.DarinHedh}>                     
                            <h3 className={styles.DariH}>Of Aliens & Men</h3>
                            <div className={styles.DarinImgpspan}>
                                <Image src="/img/napa_icon_darknes.svg" alt="" width={24} height={24} />
                                <h2>10.33 NAPA<span>Earned</span></h2>
                            </div>
                        </div>
                    </div>
                    <div className={styles.DarkiBoxmiddata}>
                        <div className={styles.DarkiBxFrst}>
                            <div className={styles.DarkiBxhpdata}>
                                <p>Date Minted</p>
                                <h3>24 Apr 2022</h3>
                            </div>
                            <div className={styles.DarkiBxhpdata}>
                                <p>Live Start Date</p>
                                <h3>19 Aug 2022 </h3>
                            </div>
                        </div>    
                        <div className={styles.DarkiBxSecond}>
                            <div className={styles.DarkiBxhpdata}>
                                <p>Live End Date</p>
                                <h3>24 Aug 2022 </h3>
                            </div>
                            <div className={styles.DarkiBxhpdata}>
                                <p>Current Rewards Tier</p>
                                <h3>0.95 NAPA</h3>
                            </div>
                        </div>                        
                    </div>
                    <div className={styles.DarkiBoxbtnlst}>
                        <button className={styles.DarkiBlubtn}>Redeem Tokens</button>
                        <button className={styles.DarkiDarbtn}>Submit to Marketplace</button>
                    </div>
                </div>
            </div>

            {/* Six_box */}
            <div className={styles.RightMiiddle}>
                <div className={styles.DarknesBox}>
                    <div className={styles.DarkimgBox}>
                        <Image src="/img/darknes_ic_04.png" alt="" width={80} height={80} />
                        <div className={styles.DarinHedh}>                     
                            <h3 className={styles.DariH}>The Magic Galaxies</h3>
                            <div className={styles.DarinImgpspan}>
                                <Image src="/img/napa_icon_darknes.svg" alt="" width={24} height={24} />
                                <h2>6.02 NAPA<span>Earned</span></h2>
                            </div>
                        </div>
                    </div>
                    <div className={styles.DarkiBoxmiddata}>
                        <div className={styles.DarkiBxFrst}>
                            <div className={styles.DarkiBxhpdata}>
                                <p>Date Minted</p>
                                <h3>9 Apr 2022</h3>
                            </div>
                            <div className={styles.DarkiBxhpdata}>
                                <p>Live Start Date</p>
                                <h3>2 Aug 2022</h3>
                            </div>
                        </div>
                        <div className={styles.DarkiBxSecond}>
                            <div className={styles.DarkiBxhpdata}>
                                <p>Live End Date</p>
                                <h3>29 Aug 2022</h3>
                            </div>
                            <div className={styles.DarkiBxhpdata}>
                                <p>Current Rewards Tier</p>
                                <h3>0.48 NAPA</h3>
                            </div>
                        </div>                                                
                    </div>
                    <div className={styles.DarkiBoxbtnlst}>
                        <button className={styles.DarkiBlubtn}>Redeem Tokens</button>
                        <button className={styles.DarkiDarbtn}>Submit to Marketplace</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    

  )
}
