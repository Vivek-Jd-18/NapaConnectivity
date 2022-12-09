import React from 'react';
import Image from 'next/image';
import Select from 'react-select';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
import styles from './Swapping.module.scss';
import Link from 'next/link';

export default function Swapping() {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ];
  return (
    <>
       
            <div className={styles.tipandtotolmain}>
                <div className="select_main">
                    <Select
                        options={options}
                        // menuIsOpen={true}
                        className="select_pernt slctrspnsv"
                        placeholder="Newest "
                        classNamePrefix="cntrslct"
                    />
                </div>
                <div className={styles.buttonperntAj}>
                    <button className={styles.SearchBtnHad}><Image src='/img/search_icon_aj.svg' alt='' height="24px" width="24px" className='' /></button>
                    {/* <button >Create New</button> */}
                    <Link href="/create-new-swapping"><a className={`${styles.marginPrnt} ${styles.CreateNewBtn}`}>Create New</a></Link>
                    {/* <button><Image src='/img/grid_ic_dark.svg' alt='' height="24px" width="24px" className='' /></button> */}
                </div>
               
            </div>
            <div className={styles.SwappingMain}>
                <div className={styles.SwappingMainInnr}>
                    <div className={styles.ExpolatinForm}>
                        <div className={styles.ExpolatinBg}>
                            <Image
                                src="/img/expoltion.png"
                                height="94px"
                                width="94px"
                                alt=""
                                className="expolr"
                            />
                            <div className={styles.ExpolatinText}>
                                <h4>NFT Name of SNFT Title</h4>
                                <div className={styles.ExpolatinNapaLogo}>
                                    <Image src='/img/expoyr_tex.svg' alt='' height="10px" width="13px" className='' />
                                    <span>0.34 NAPA</span>
                                </div>
                                <div className={styles.ExpolatinSecndImg}>
                                    <Image src='/img/expoyer_text_secnd.svg' alt='' height="24px" width="24px" className='' />
                                    <span>NFT or SNFT Owner</span>
                                </div>
                            </div>
                            <div className={styles.ExpolatinSecndImgAbsolat}>
                                <Image src='/img/absolat_img.png' alt='' height="48px" width="48px" className='' />
                            </div>
                        </div>
                            <div className={`${styles.ExpolatinBg} ${styles.PdingLft}`}>
                                <Image
                                    src="/img/secand_sec_ic.png"
                                    height="94px"
                                    width="94px"
                                    alt=""
                                    className="expolr"
                                />
                                <div className={styles.ExpolatinText}>
                                    <h4>NFT Name or SNFT Title</h4>
                                    <div className={styles.ExpolatinNapaLogo}>
                                        <Image src='/img/expoyr_tex.svg' alt='' height="10px" width="13px" className='' />
                                        <span>0.36 NAPA</span>
                                    </div>
                                    <div className={styles.ExpolatinSecndImg}>
                                        <Image src='/img/expolyer_avtar.png' alt='' height="24px" width="24px" className='' />
                                        <span>NFT or SNFT Owner</span>
                                    </div>
                                </div>
                            </div>
                        
                        <div className={styles.ExpolatinThrd}>
                            <div className={styles.ExpolatinDflx}>
                                <div className={styles.ExpolatiSactionThrd}>
                                    <Image src='/img/thrd_sec_ic.svg' alt='' height="24px" width="24px" className='' />
                                    <span>0.24</span>
                                </div>
                                <div className={styles.ExpolatiSacsesFull}>
                                    <Image src='/img/thrd_sec_aroo.svg' alt='' height="14px" width="14px" className='' />
                                    <span>Swap Status</span>
                                    
                                </div>
                            </div>
                            <div className={styles.ExpolationBatn}>
                                <button className={styles.marginPrnt}>Contact the Author</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}
