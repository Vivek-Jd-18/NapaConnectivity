import { NapaLogo, NapaLogoWhite } from '@/components/Svg';
import { useEffect } from 'react';
import Vivus from 'vivus';
import Container from '@/Layout/Container/Container';
import type { NextPage } from 'next';
import styles from '../../styles/pages/Wallet.module.scss';
import { metamask, coinbase, authereum, venly } from '@/components/assets';

const Wallet: NextPage = () => {
  const btnText = [
    {
      text: 'Metamask',
      icon: metamask,
      borderColor: '#F5841F',
    },
    {
      text: 'Coinbase',
      icon: coinbase,
      borderColor: '#2B5EE2',
    },
    {
      text: 'Authereum',
      icon: authereum,
      borderColor: '#FF4C2F',
    },
    {
      text: 'Venly',
      icon: venly,
      borderColor: '#7735E8',
    },
  ];

  useEffect(() => {
    new Vivus('napa-logo', {
      type: 'delayed',
      duration: 200,

      animTimingFunction: Vivus.EASE_OUT,
    });
  }, []);
  return (
    <div className={styles.backgroundImage}>
      <Container>
        <div
          className={`row justify-content-between align-items-center col-12 ${styles.innerMainContainer}`}
        >
          <div className="col-xl-6 col-md-12">
            <div className={styles.svgWrapper}>
              <NapaLogo
                className={styles.napaLogo}
                width={'360'}
                height={'80'}
              />
            </div>
            <div className={styles.svgWrapper}>
              <NapaLogoWhite
                className={styles.napaLogoWhite}
                width={'360'}
                height={'80'}
              />
            </div>
          </div>
          <div className="col-xl-6 col-md-12">
            <div className="flex-column">
              <h1 className={styles.walletText}>
                Select <br />a Wallet
              </h1>
              <span className={styles.descriptionText}>
                By connecting your wallet, you agree to our{' '}
                <span className={styles.termsPrivacyText}>
                  Terms of Service
                </span>
                &nbsp;and our{' '}
                <span className={styles.termsPrivacyText}>Privacy Policy.</span>
              </span>
              <div className={`${styles.btnContainer} flex-column`}>
                {btnText.map((item, index) => {
                  return (
                    <button
                      className={styles.walletBtn}
                      style={{ borderColor: item.borderColor }}
                    >
                      <img src={item.icon} />
                      {item.text}
                    </button>
                  );
                })}
                <div className={styles.btnOverlay}></div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Wallet;
