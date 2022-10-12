import React from 'react';
import Image from 'next/image';
import Select from 'react-select';
import 'bootstrap-daterangepicker/daterangepicker.css';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import moment from 'moment';
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
                    <button className={styles.marginPrnt}>Create New</button>
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
                                <h4>Expulsion from Paradise</h4>
                                <div className={styles.ExpolatinNapaLogo}>
                                    <Image src='/img/expoyr_tex.svg' alt='' height="10px" width="13px" className='' />
                                    <span>0.34 NAPA</span>
                                </div>
                                <div className={styles.ExpolatinSecndImg}>
                                    <Image src='/img/expoyer_text_secnd.svg' alt='' height="24px" width="24px" className='' />
                                    <span>Dorothy Mccoy</span>
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
                                    <h4>The Magic of Galaxies</h4>
                                    <div className={styles.ExpolatinNapaLogo}>
                                        <Image src='/img/expoyr_tex.svg' alt='' height="10px" width="13px" className='' />
                                        <span>0.36 NAPA</span>
                                    </div>
                                    <div className={styles.ExpolatinSecndImg}>
                                        <Image src='/img/expolyer_avtar.png' alt='' height="24px" width="24px" className='' />
                                        <span>Marta Thornton</span>
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
                                    <span>Successfully</span>
                                    
                                </div>
                            </div>
                            <div className={styles.ExpolationBatn}>
                                <button className={styles.marginPrnt}>Contact the Author</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.ExpolatinForm}>
                        <div className={styles.ExpolatinBg}>
                            <Image
                                src="/img/expoyer_bringme.png"
                                height="94px"
                                width="94px"
                                alt=""
                                className="expolr"
                            />
                            <div className={styles.ExpolatinText}>
                                <h4>Bring Me the Space </h4>
                                <div className={styles.ExpolatinNapaLogo}>
                                    <Image src='/img/etc_ic.svg' alt='' height="10px" width="13px" className='' />
                                    <span>0.34 ETH</span>
                                </div>
                                <div className={styles.ExpolatinSecndImg}>
                                    <Image src='/img/expoyer_text_secnd.svg' alt='' height="24px" width="24px" className='' />
                                    <span>Dorothy Mccoy</span>
                                </div>
                            </div>
                            <div className={styles.ExpolatinSecndImgAbsolat}>
                                <Image src='/img/absolat_img.png' alt='' height="48px" width="48px" className='' />
                            </div>
                        </div>
                            <div className={`${styles.ExpolatinBg} ${styles.PdingLft}`}>
                                <Image
                                    src="/img/expotion_ic.png"
                                    height="94px"
                                    width="94px"
                                    alt=""
                                    className="expolr"
                                />
                                <div className={styles.ExpolatinText}>
                                    <h4>Expulsion to Paradise</h4>
                                    <div className={styles.ExpolatinNapaLogo}>
                                        <Image src='/img/etc_ic.svg' alt='' height="10px" width="13px" className='' />
                                        <span>0.36 ETH</span>
                                    </div>
                                    <div className={styles.ExpolatinSecndImg}>
                                        <Image src='/img/tom_bnli_img.png' alt='' height="24px" width="24px" className='' />
                                        <span>Tom Bradley</span>
                                    </div>
                                </div>
                            </div>
                        
                        <div className={styles.ExpolatinThrd}>
                            <div className={styles.ExpolatinDflx}>
                                <div className={styles.ExpolatiSactionThrd}>
                                    <Image src='/img/Etherium_thrd_ic.svg' alt='' height="24px" width="24px" className='' />
                                    <span>0.46</span>
                                </div>
                                <div className={styles.ExpolatiSacsesFull}>
                                    <Image src='/img/thrd_sec_aroo.svg' alt='' height="14px" width="14px" className='' />
                                    <span>Successfully</span>
                                    
                                </div>
                            </div>
                            <div className={styles.ExpolationBatn}>
                                <button className={styles.marginPrnt}>Contact the Author</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.ExpolatinForm}>
                        <div className={styles.ExpolatinBg}>
                            <Image
                                src="/img/rahls_img.png"
                                height="94px"
                                width="94px"
                                alt=""
                                className="expolr"
                            />
                            <div className={styles.ExpolatinText}>
                                <h4>Raphael's Hallucination</h4>
                                <div className={styles.ExpolatinNapaLogo}>
                                    <Image src='/img/expoyr_tex.svg' alt='' height="10px" width="13px" className='' />
                                    <span>0.34 NAPA</span>
                                </div>
                                <div className={styles.ExpolatinSecndImg}>
                                    <Image src='/img/expoyer_text_secnd.svg' alt='' height="24px" width="24px" className='' />
                                    <span>Dorothy Mccoy</span>
                                </div>
                            </div>
                            <div className={styles.ExpolatinSecndImgAbsolat}>
                                <Image src='/img/absolat_img.png' alt='' height="48px" width="48px" className='' />
                            </div>
                        </div>
                            <div className={`${styles.ExpolatinBg} ${styles.PdingLft}`}>
                                <Image
                                    src="/img/flecher_img.png"
                                    height="94px"
                                    width="94px"
                                    alt=""
                                    className="expolr"
                                />
                                <div className={styles.ExpolatinText}>
                                    <h4>Fierce Radiant Cube</h4>
                                    <div className={styles.ExpolatinNapaLogo}>
                                        <Image src='/img/etc_ic.svg' alt='' height="10px" width="13px" className='' />
                                        <span>0.36 NAPA</span>
                                    </div>
                                    <div className={styles.ExpolatinSecndImg}>
                                        <Image src='/img/rufi_img.png' alt='' height="24px" width="24px" className='' />
                                        <span>Rufus Flores</span>
                                    </div>
                                </div>
                            </div>
                        
                        <div className={styles.ExpolatinThrd}>
                            <div className={styles.ExpolatinDflx}>
                                <div className={styles.ExpolatiSactionThrd}>
                                    <Image src='/img/Etherium_thrd_ic.svg' alt='' height="24px" width="24px" className='' />
                                    <span>0.72</span>
                                </div>
                                <div className={styles.ExpolatiSacsesFull}>
                                    <Image src='/img/thrd_sec_aroo.svg' alt='' height="14px" width="14px" className='' />
                                    <span>Successfully</span>
                                    
                                </div>
                            </div>
                            <div className={styles.ExpolationBatn}>
                                <button className={styles.marginPrnt}>Contact the Author</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.ExpolatinForm}>
                        <div className={styles.ExpolatinBg}>
                            <Image
                                src="/img/space_of_img.png"
                                height="94px"
                                width="94px"
                                alt=""
                                className="expolr"
                            />
                            <div className={styles.ExpolatinText}>
                                <h4>Bring Me the Space </h4>
                                <div className={styles.ExpolatinNapaLogo}>
                                    <Image src='/img/etc_ic.svg' alt='' height="10px" width="13px" className='' />
                                    <span>0.34 ETH</span>
                                </div>
                                <div className={styles.ExpolatinSecndImg}>
                                    <Image src='/img/expoyer_text_secnd.svg' alt='' height="24px" width="24px" className='' />
                                    <span>Dorothy Mccoy</span>
                                </div>
                            </div>
                            <div className={styles.ExpolatinSecndImgAbsolat}>
                                <Image src='/img/absolat_img.png' alt='' height="48px" width="48px" className='' />
                            </div>
                        </div>
                            <div className={`${styles.ExpolatinBg} ${styles.PdingLft}`}>
                                <Image
                                    src="/img/bless_flow.png"
                                    height="94px"
                                    width="94px"
                                    alt=""
                                    className="expolr"
                                />
                                <div className={styles.ExpolatinText}>
                                    <h4>Bless Fallout Sadness</h4>
                                    <div className={styles.ExpolatinNapaLogo}>
                                        <Image src='/img/etc_ic.svg' alt='' height="10px" width="13px" className='' />
                                        <span>0.36 ETH</span>
                                    </div>
                                    <div className={styles.ExpolatinSecndImg}>
                                        <Image src='/img/hovel_img.png' alt='' height="24px" width="24px" className='' />
                                        <span>Tom Bradley</span>
                                    </div>
                                </div>
                            </div>
                        
                        <div className={styles.ExpolatinThrd}>
                            <div className={styles.ExpolatinDflx}>
                                <div className={styles.ExpolatiSactionThrd}>
                                    <Image src='/img/Etherium_thrd_ic.svg' alt='' height="24px" width="24px" className='' />
                                    <span>0.15</span>
                                </div>
                                <div className={styles.ExpolatiSacsesFull}>
                                    <Image src='/img/thrd_sec_aroo.svg' alt='' height="14px" width="14px" className='' />
                                    <span>Successfully</span>
                                    
                                </div>
                            </div>
                            <div className={styles.ExpolationBatn}>
                                <button className={styles.marginPrnt}>Contact the Author</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.ExpolatinForm}>
                        <div className={styles.ExpolatinBg}>
                            <Image
                                src="/img/space_of_img.png"
                                height="94px"
                                width="94px"
                                alt=""
                                className="expolr"
                            />
                            <div className={styles.ExpolatinText}>
                                <h4>Bring Me the Space </h4>
                                <div className={styles.ExpolatinNapaLogo}>
                                    <Image src='/img/etc_ic.svg' alt='' height="10px" width="13px" className='' />
                                    <span>0.34 ETH</span>
                                </div>
                                <div className={styles.ExpolatinSecndImg}>
                                    <Image src='/img/expoyer_text_secnd.svg' alt='' height="24px" width="24px" className='' />
                                    <span>Dorothy Mccoy</span>
                                </div>
                            </div>
                            <div className={styles.ExpolatinSecndImgAbsolat}>
                                <Image src='/img/absolat_img.png' alt='' height="48px" width="48px" className='' />
                            </div>
                        </div>
                            <div className={`${styles.ExpolatinBg} ${styles.PdingLft}`}>
                                <Image
                                    src="/img/bless_flow.png"
                                    height="94px"
                                    width="94px"
                                    alt=""
                                    className="expolr"
                                />
                                <div className={styles.ExpolatinText}>
                                    <h4>Bless Fallout Sadness</h4>
                                    <div className={styles.ExpolatinNapaLogo}>
                                        <Image src='/img/etc_ic.svg' alt='' height="10px" width="13px" className='' />
                                        <span>0.36 ETH</span>
                                    </div>
                                    <div className={styles.ExpolatinSecndImg}>
                                        <Image src='/img/hovel_img.png' alt='' height="24px" width="24px" className='' />
                                        <span>Tom Bradley</span>
                                    </div>
                                </div>
                            </div>
                        
                        <div className={styles.ExpolatinThrd}>
                            <div className={styles.ExpolatinDflx}>
                                <div className={styles.ExpolatiSactionThrd}>
                                    <Image src='/img/Etherium_thrd_ic.svg' alt='' height="24px" width="24px" className='' />
                                    <span>0.15</span>
                                </div>
                                <div className={styles.ExpolatiSacsesFull}>
                                    <Image src='/img/thrd_sec_aroo.svg' alt='' height="14px" width="14px" className='' />
                                    <span>Successfully</span>
                                    
                                </div>
                            </div>
                            <div className={styles.ExpolationBatn}>
                                <button className={styles.marginPrnt}>Contact the Author</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.ExpolatinForm}>
                        <div className={styles.ExpolatinBg}>
                            <Image
                                src="/img/space_of_img.png"
                                height="94px"
                                width="94px"
                                alt=""
                                className="expolr"
                            />
                            <div className={styles.ExpolatinText}>
                                <h4>Bring Me the Space </h4>
                                <div className={styles.ExpolatinNapaLogo}>
                                    <Image src='/img/etc_ic.svg' alt='' height="13px" width="10px" className='' />
                                    <span>0.34 ETH</span>
                                </div>
                                <div className={styles.ExpolatinSecndImg}>
                                    <Image src='/img/expoyer_text_secnd.svg' alt='' height="24px" width="24px" className='' />
                                    <span>Dorothy Mccoy</span>
                                </div>
                            </div>
                            <div className={styles.ExpolatinSecndImgAbsolat}>
                                <Image src='/img/absolat_img.png' alt='' height="48px" width="48px" className='' />
                            </div>
                        </div>
                            <div className={`${styles.ExpolatinBg} ${styles.PdingLft}`}>
                                <Image
                                    src="/img/bless_flow.png"
                                    height="94px"
                                    width="94px"
                                    alt=""
                                    className="expolr"
                                />
                                <div className={styles.ExpolatinText}>
                                    <h4>Bless Fallout Sadness</h4>
                                    <div className={styles.ExpolatinNapaLogo}>
                                        <Image src='/img/etc_ic.svg' alt='' height="13px" width="10px" className='' />
                                        <span>0.36 ETH</span>
                                    </div>
                                    <div className={styles.ExpolatinSecndImg}>
                                        <Image src='/img/hovel_img.png' alt='' height="24px" width="24px" className='' />
                                        <span>Tom Bradley</span>
                                    </div>
                                </div>
                            </div>
                        
                        <div className={styles.ExpolatinThrd}>
                            <div className={styles.ExpolatinDflx}>
                                <div className={styles.ExpolatiSactionThrd}>
                                    <Image src='/img/Etherium_thrd_ic.svg' alt='' height="24px" width="24px" className='' />
                                    <span>0.15</span>
                                </div>
                                <div className={styles.ExpolatiSacsesFull}>
                                    <Image src='/img/thrd_sec_aroo.svg' alt='' height="14px" width="14px" className='' />
                                    <span>Successfully</span>
                                    
                                </div>
                            </div>
                            <div className={styles.ExpolationBatn}>
                                <button className={styles.marginPrnt}>Contact the Author</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.ExpolatinForm}>
                        <div className={styles.ExpolatinBg}>
                            <Image
                                src="/img/space_of_img.png"
                                height="94px"
                                width="94px"
                                alt=""
                                className="expolr"
                            />
                            <div className={styles.ExpolatinText}>
                                <h4>Bring Me the Space </h4>
                                <div className={styles.ExpolatinNapaLogo}>
                                    <Image src='/img/etc_ic.svg' alt='' height="13px" width="10px" className='' />
                                    <span>0.34 ETH</span>
                                </div>
                                <div className={styles.ExpolatinSecndImg}>
                                    <Image src='/img/expoyer_text_secnd.svg' alt='' height="24px" width="24px" className='' />
                                    <span>Dorothy Mccoy</span>
                                </div>
                            </div>
                            <div className={styles.ExpolatinSecndImgAbsolat}>
                                <Image src='/img/absolat_img.png' alt='' height="48px" width="48px" className='' />
                            </div>
                        </div>
                            <div className={`${styles.ExpolatinBg} ${styles.PdingLft}`}>
                                <Image
                                    src="/img/bless_flow.png"
                                    height="94px"
                                    width="94px"
                                    alt=""
                                    className="expolr"
                                />
                                <div className={styles.ExpolatinText}>
                                    <h4>Bless Fallout Sadness</h4>
                                    <div className={styles.ExpolatinNapaLogo}>
                                        <Image src='/img/etc_ic.svg' alt='' height="13px" width="10px" className='' />
                                        <span>0.36 ETH</span>
                                    </div>
                                    <div className={styles.ExpolatinSecndImg}>
                                        <Image src='/img/hovel_img.png' alt='' height="24px" width="24px" className='' />
                                        <span>Tom Bradley</span>
                                    </div>
                                </div>
                            </div>
                        
                        <div className={styles.ExpolatinThrd}>
                            <div className={styles.ExpolatinDflx}>
                                <div className={styles.ExpolatiSactionThrd}>
                                    <Image src='/img/Etherium_thrd_ic.svg' alt='' height="24px" width="24px" className='' />
                                    <span>0.15</span>
                                </div>
                                <div className={styles.ExpolatiSacsesFull}>
                                    <Image src='/img/thrd_sec_aroo.svg' alt='' height="14px" width="14px" className='' />
                                    <span>Successfully</span>
                                    
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
