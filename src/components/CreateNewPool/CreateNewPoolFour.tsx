import React from 'react';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
import styles from './CreateNewPoolFour.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { TimeIcon } from '../assets';


export default function CreateNewPoolFour() {
  return (
    <>
        <div className={styles.CreatePoolThree}>
            <div className={styles.CustomGridContainer}>
                <div className={styles.CustomGrid}>
                    <div className={styles.TipsTulsOverlay}>
                        <div className={styles.BoxInnrCont}>
                            <Link href="#">
                                <a href="#" className={`${styles.apernt} hovereffect`}>
                                    <Image
                                        src="/img/ellutionMain.png"
                                        height="490px"
                                        width="360px"
                                        alt=""
                                        className="evmtimg"
                                    />
                                    <div className={styles.downCont}>
                                        <h3>Illusions Darkness</h3>
                                        <div className={styles.flexPernt}>
                                            <div className={styles.currentBit}>
                                                <h5>Current Bid</h5>
                                                <div className={styles.txtimgFlex}>
                                                    {/* <Image
                                                        src="/img/etherium_ic.svg"
                                                        height="24px"
                                                        width="24px"
                                                        alt=""
                                                        className=""
                                                    /> */}
                                                    <Image src="/img/napa_icon_card.png" alt="" width={24} height={24} />
                                                    <p>20 NAPA</p>
                                                </div>
                                            </div>
                                            <div className={styles.endingIn}>
                                                <p>Ending In</p>
                                                <h3>4h 32 min</h3>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={styles.RightEllutions}>
                    <div><h1>Illusions Darkness</h1></div>
                    <div><div className={styles.timeContainer}>
                        <Image src={TimeIcon} alt="TimeIcon" width={20} height={20} />
                        <span className={styles.time}>Jul 28, 2022  19:00</span>
                    </div>
                    <div className={styles.AmounttoContributeBx}>
                       <div className={styles.Amounttext}>
                            <p>Amount to Contribute</p>
                            <div className={styles.Img25Mx}>
                                <Image src='/img/ab_napa_eht_ic_card_02.svg' alt="" width={17} height={13} />
                                <h6>0.25 - 3</h6>       
                            </div>                     
                       </div>
                       <div className={styles.AutoListPrice}>
                            <p>Auto List Price</p>
                            <h6>15</h6>       
                       </div>
                    </div>
                    <div className={`${styles.AmounttoContributeBx} ${styles.AmounttoContributeBxSecnd}`}>
                       <div className={styles.Amounttext}>
                            <p>Consensus Required to Sell</p>
                            <div className={styles.Img25Mx}>
                                <h6>75%</h6>       
                            </div>                     
                       </div>
                       <div className={styles.AutoListPrice}>
                            <p>Selling of Fractional Contributions</p>
                            <h6>Yes</h6>       
                       </div>
                    </div>
                    <div className={styles.progressContainer}>
                        <div className={styles.innerProgressParentContainer}>
                            <div className={styles.innerProgressContainer}>
                                <p>Balance</p>
                                <div className={styles.NapaIcontxt}>
                                    <Image src='/img/ab_napa_eht_ic_card_02.svg' alt="" width={17} height={13} />
                                    <span className={styles.SpanDefltMrgn}>14.02</span>
                                </div>
                            </div>
                            <div className={`${styles.innerProgressContainer} ${styles.innerProgressContainerv2}`}>
                                <p>Target</p>
                                <div className={styles.NapaIcontxt}>
                                    <Image src='/img/ab_napa_eht_ic_card_02.svg' alt="" width={17} height={13} />
                                    <span className={styles.SpanDefltMrgn}>Target</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.progressBarContainer}>
                            <div className={styles.progressBarParent}>
                            <div className={styles.progressBarChild}></div>
                            </div>
                        </div>  
                        <div className={styles.btnAndimg}>
                            <button>Contribute</button>
                            <button className={styles.rightDotBtn}><Image src='/img/more_icon.svg' alt="" width={24} height={24} /></button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className={styles.ContributionHistoryTable}>
                <div className={styles.hedSrchic}>
                    <h1>Contribution History</h1>
                    <button><Image src='/img/search_icon_aj.svg' alt='' height="24px" width="24px" className='' /></button>
                </div>
                <div className={styles.TableHistory}>
                    <div className={styles.TableHad}>
                        <h6 className={styles.TableOne}>Name</h6>
                        <h6 className={styles.TableTwo}>Email</h6>
                        <h6 className={styles.TableThree}>Date</h6>
                        <h6 className={styles.TableFour}>Amount</h6>
                    </div>
                    <div className={styles.TableInnerPool}>
                        <div className={`${styles.TableHad} ${styles.TableBody}`}>
                            <h4 className={styles.TableOne}><Image src='/img/tablegirl01.png' alt="" width={40} height={40} />rMhzPdx6IXkzuGL13</h4>
                            <h4 className={styles.TableTwo}>dorothy.mccoy@gmail.com</h4>
                            <h4 className={styles.TableThree}>Jul 28, 2022</h4>
                            <h4 className={styles.TableFour}><Image src='/img/ab_napa_eht_ic_card_02.svg' alt="" width={17} height={13} />2.68</h4>
                        </div>
                        <div className={`${styles.TableHad} ${styles.TableBody}`}>
                            <h4 className={styles.TableOne}><Image src='/img/tablegirl02.png' alt="" width={40} height={40} />0HjY7dGjliUoPLkn5</h4>
                            <h4 className={styles.TableTwo}>marta.thornton@gmail.com</h4>
                            <h4 className={styles.TableThree}>Jun 12, 2022</h4>
                            <h4 className={styles.TableFour}><Image src='/img/ab_napa_eht_ic_card_02.svg' alt="" width={17} height={13} />1.23</h4>
                        </div>
                        <div className={`${styles.TableHad} ${styles.TableBody}`}>
                            <h4 className={styles.TableOne}><Image src='/img/tablegirl03.png' alt="" width={40} height={40} />kHFtr87TreDV8o4Gl</h4>
                            <h4 className={styles.TableTwo}>catherine.patton@gmail.com</h4>
                            <h4 className={styles.TableThree}>Jun 8, 2022</h4>
                            <h4 className={styles.TableFour}><Image src='/img/ab_napa_eht_ic_card_02.svg' alt="" width={17} height={13} />3.02</h4>
                        </div>
                        <div className={`${styles.TableHad} ${styles.TableBody}`}>
                            <h4 className={styles.TableOne}><Image src='/img/tablegirl01.png' alt="" width={40} height={40} />rMhzPdx6IXkzuGL13</h4>
                            <h4 className={styles.TableTwo}>dorothy.mccoy@gmail.com</h4>
                            <h4 className={styles.TableThree}>Jul 28, 2022</h4>
                            <h4 className={styles.TableFour}><Image src='/img/ab_napa_eht_ic_card_02.svg' alt="" width={17} height={13} />2.68</h4>
                        </div>
                        <div className={`${styles.TableHad} ${styles.TableBody}`}>
                            <h4 className={styles.TableOne}><Image src='/img/tablegirl02.png' alt="" width={40} height={40} />0HjY7dGjliUoPLkn5</h4>
                            <h4 className={styles.TableTwo}>marta.thornton@gmail.com</h4>
                            <h4 className={styles.TableThree}>Jun 12, 2022</h4>
                            <h4 className={styles.TableFour}><Image src='/img/ab_napa_eht_ic_card_02.svg' alt="" width={17} height={13} />1.23</h4>
                        </div>
                        <div className={`${styles.TableHad} ${styles.TableBody}`}>
                            <h4 className={styles.TableOne}><Image src='/img/tablegirl03.png' alt="" width={40} height={40} />kHFtr87TreDV8o4Gl</h4>
                            <h4 className={styles.TableTwo}>catherine.patton@gmail.com</h4>
                            <h4 className={styles.TableThree}>Jun 8, 2022</h4>
                            <h4 className={styles.TableFour}><Image src='/img/ab_napa_eht_ic_card_02.svg' alt="" width={17} height={13} />3.02</h4>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.ParticipantsBx}>
            <div className={styles.FrstPartnerH1}>
                <h1>Participants  <span>8</span></h1>
            </div>
            <div className={styles.RightImgLines}>
                <div className={styles.RigthImgBx}>
                    <div className={styles.AllH4ImgRight}>
                        <h4 className={styles.RigthImgh4}><Image src='/img/tablegirl01.png' alt="" width={40} height={40} />Dorothy Mccoy</h4>
                        <h4 className={styles.RigthImgh4}><Image src='/img/tablegirl02.png' alt="" width={40} height={40} />Marta Thornton</h4>
                        <h4 className={styles.RigthImgh4}><Image src='/img/tablegirl03.png' alt="" width={40} height={40} />Catherine Patton</h4>
                        <h4 className={styles.RigthImgh4}><Image src='/img/tablegirl04.png' alt="" width={40} height={40} />Howard Copeland</h4>
                        <h4 className={styles.RigthImgh4}><Image src='/img/tablegirl05.png' alt="" width={40} height={40} />Rufus Flores</h4>
                        <h4 className={styles.RigthImgh4}><Image src='/img/tablegirl06.png' alt="" width={40} height={40} />Tom Bradley</h4>
                        <h4 className={styles.RigthImgh4}><Image src='/img/tablegirl07.png' alt="" width={40} height={40} />Patricia Rose</h4>
                        <h4 className={styles.RigthImgh4}><Image src='/img/tablegirl08.png' alt="" width={40} height={40} />Gerardo Swanson</h4>
                        <h4 className={styles.RigthImgh4}><Image src='/img/tablegirl01.png' alt="" width={40} height={40} />Dorothy Mccoy</h4>
                        <h4 className={styles.RigthImgh4}><Image src='/img/tablegirl02.png' alt="" width={40} height={40} />Marta Thornton</h4>
                        <h4 className={styles.RigthImgh4}><Image src='/img/tablegirl03.png' alt="" width={40} height={40} />Catherine Patton</h4>
                        <h4 className={styles.RigthImgh4}><Image src='/img/tablegirl04.png' alt="" width={40} height={40} />Howard Copeland</h4>
                        <h4 className={styles.RigthImgh4}><Image src='/img/tablegirl05.png' alt="" width={40} height={40} />Rufus Flores</h4>
                        <h4 className={styles.RigthImgh4}><Image src='/img/tablegirl06.png' alt="" width={40} height={40} />Tom Bradley</h4>
                        <h4 className={styles.RigthImgh4}><Image src='/img/tablegirl07.png' alt="" width={40} height={40} />Patricia Rose</h4>
                        <h4 className={styles.RigthImgh4}><Image src='/img/tablegirl08.png' alt="" width={40} height={40} />Gerardo Swanson</h4>
                    </div>
                    <div className={styles.RigthImgLastH4}>
                        <h4 className={styles.RigthImgh4}><Image src='/img/last_iconplus.png' alt="" width={40} height={40} />Add User</h4>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
