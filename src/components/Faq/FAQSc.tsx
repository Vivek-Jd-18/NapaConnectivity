import React from 'react'
import styles from './FAQSc.module.scss';
import Footer from '../Footer/Footer';
import Container from '../../Layout/Container/Container';
import Image from 'next/image';


export default function FAQSc() {
  return (
    <>
    <div
      className={styles.WidthFull}
    >
      <Container
        className={`${styles.napaLoungeContainer} asinnerContainer`}
      >
        <div className={styles.MainContact}>
          <div className={styles.MainTextHelp}>
            <h1>FAQ</h1>
            <div className="AccodianFaq">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button acoordin_btn_ic" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      <div className='accodian_img_bx'>
                        <div className="img_plus">
                          <Image src="/img/plus_icon.svg" alt="" width={18} height={18}  />
                        </div>
                        <div className="minus_img">
                          <Image src="/img/minus_icon.svg" alt="" width={18} height={18}  />
                        </div>
                      </div>
                      What is NAPA?
                    </button>
                  </h2>
                  <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body acodian_in_p">
                     <p>This guide explains how to withdraw funds from the NAPA blockchain to the Ethereum mainnet. This withdrawal is a two-stage process that takes up to 4 hours to complete. Make sure you have enough NAPA (on NAPA mainnet) in your wallet to cover withdrawal from the NAPA</p>
                     <p>To get started, navigate to the top right of the NAPA Society website and click the wallet icon. For this tutorial, we'll be withdrawing ETH from NAPA (represented by a purple diamond logo).You should see your NAPA wallet dashboard and all current tokens bridged to NAPA. Locate the Ether (NAPA-WETH) token and click Withdraw. You'll have to click Continue on three pop-up windows. You will be asked to confirm the transaction fee and acknowledge that the withdrawal process may take up to 4 hours to complete. </p>
                     <p>You'll be asked to sign the transaction on wallet.matic.network (seen above on MetaMask). The gas amount should be low. The first part of the withdrawal process will take approximately 45 mins to 1 hour. This will move funds to a checkpoint on the Ethereum network. You can return to the window later on to complete the checkpoint. You will see an "Action Required" notification on the top right of the window.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div className={styles.footerContainer}>
        <Footer footerIconShow={false} />
      </div>
    </div>
    </>
  )
}





