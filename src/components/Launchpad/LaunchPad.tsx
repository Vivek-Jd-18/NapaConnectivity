import React from 'react';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
import styles from './LaunchPad.module.scss';
import Image from 'next/image';


export default function LaunchPad() {
   
  return (
    <>
        <div className={styles.LaunchPadMain}>
          <div className={styles.LeftLaunchPad}>
            <h1 className={styles.LaunchPadDeflt}>Launchpad</h1>
            <p>Crowdfund and launch your NFT project with NAPA Society. The NAPA launchpad tools will allow you to give you project exposure and resources to successfully launch your NFT project and showcase your art on the NAPA NFT marketplace. Submit your application for consideration!</p>
            <button className={styles.FrstBtn}>
                Support
                <Image src="/img/right_arrow_help.png" alt="" width={36} height={24}  />
            </button>
          </div>
          <div className={styles.RightPlayBtn}>
              <Image src="/assets/images/play_button.png" alt="" width={340} height={340}  />
          </div>
        </div>      
    </>
  )
}
