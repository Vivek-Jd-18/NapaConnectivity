import { NapaLogo, NapaLogoWhite } from '../../components/Svg';
import { useEffect } from 'react';
import Vivus from 'vivus';
import Container from '../../Layout/Container/Container';
import type { NextPage } from 'next';
import styles from '../../../styles/pages/Wallet.module.scss';
import { SwapIcon } from '../../components/assets';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { CustomToastWithLink } from '../CustomToast/CustomToast';
import { walletButtonList } from '@/constants/wallet.constants';
import Image from 'next/image';

type WalletComponentProps = {
  connectWallet: () => void;
  account: string;
};

const WalletComponent: NextPage<WalletComponentProps> = ({
  connectWallet,
  account,
}) => {
  const { push } = useRouter();

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
          <div className={`col-xl-6 col-md-12 d-flex justify-content-center`}>
            <div className={styles.svgWrapper} onClick={() => push('/home')}>
              <NapaLogo
                className={styles.napaLogo}
                width={'360'}
                height={'80'}
              />
            </div>
            <div className={styles.svgWrapper} onClick={() => push('/')}>
              <NapaLogoWhite
                className={styles.napaLogoWhite}
                width={'360'}
                height={'80'}
              />
            </div>
          </div>
          <div className="col-xl-6 col-md-12">
            <div className="flex-column">
              <h1 className={styles.walletText}>Select Wallet</h1>
              <span className={styles.descriptionText}>
                By connecting your wallet, you agree to our{' '}
                <span className={styles.termsPrivacyText}>
                  Terms of Service
                </span>
                &nbsp;and our{' '}
                <span className={styles.termsPrivacyText}>Privacy Policy.</span>
              </span>
              <div className={`${styles.btnContainer} flex-column`}>
                {walletButtonList.map(({ borderColor, text, icon }, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (index === 0 && account) {
                          toast.error(
                            CustomToastWithLink({
                              icon: SwapIcon,
                              title: 'Wallet is Already Connected',
                              time: 'Now',
                            })
                          );
                          return;
                        }
                        if (index === 0) {
                          connectWallet();
                        }
                      }}
                      className={styles.walletBtn}
                      style={{ borderColor: borderColor }}
                    >
                      <Image
                        src={icon}
                        width={50}
                        height={50}
                        className={styles.btnIcon}
                        alt={`${text}`}
                      />
                      {text}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default WalletComponent;
