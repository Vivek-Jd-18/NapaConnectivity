import { NapaLogo, NapaLogoWhite } from '../../components/Svg';
import { useEffect, useState } from 'react';
import Vivus from 'vivus';
import Container from '../../Layout/Container/Container';
import type { NextPage } from 'next';
import styles from '../../../styles/pages/Wallet.module.scss';
import { WalletConnectedIcon } from '../../components/assets';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { CustomToastWithLink } from '../CustomToast/CustomToast';
import { walletButtonList } from '../../constants/wallet.constants';
import Image from 'next/image';
import { ToastDescription, ToastTitle } from '../../typing/toast';
import useProfile from '@/hooks/useProfile';
import useWebThree from '@/hooks/useWebThree';
import Link from 'next/link';

type WalletComponentProps = {
  account: string;
};

const WalletComponent: NextPage<WalletComponentProps> = ({ account }) => {
  const { push, query } = useRouter();
  console.log('query', query);

  const { connectWallet, getAccounts } = useWebThree();
  const [show, setShow] = useState(true);
  const { getUserProfileDetails } = useProfile();

  useEffect(() => {
    if (show) {
      getAccounts();
      setShow(false);
    }
  }, [show]);

  useEffect(() => {
    new Vivus('napa-logo', {
      type: 'delayed',
      duration: 200,

      animTimingFunction: Vivus.EASE_OUT,
    });
  }, []);

  const walletHandler = () => {
    connectWallet()
      // @ts-ignore
      .then(async (response: string) => {
        const profileDetails = await getUserProfileDetails(response);
        // @ts-ignore
        if (response && profileDetails) {
          if (query) {
            push(`/${query.redirectTo}`);
            return;
          }
          push('/trending');
        } else if (response) {
          push('/settings');
        }
      })
      .catch((err) => console.log('error', err));
  };

  return (
    <div className={styles.backgroundImage}>
      <Container>
        <div
          className={`row justify-content-between align-items-center col-12 ${styles.innerMainContainer}`}
        >
          <div className={`col-xl-6 col-md-12 d-flex justify-content-center`}>
            <div className={styles.svgWrapper} onClick={() => push('/')}>
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
                  <Link href="/terms-conditions">Terms of Service</Link>
                </span>
                &nbsp;and our{' '}
                <span className={styles.termsPrivacyText}>
                  <Link href="/privacy-policy">Privacy Policy.</Link>
                </span>
              </span>
              <div className={`${styles.btnContainer} flex-column`}>
                {walletButtonList.map(({ borderColor, text, icon }, index) => {
                  return (
                    <button
                      key={index}
                      onClick={async () => {
                        if (index === 0 && account) {
                          toast.error(
                            CustomToastWithLink({
                              icon: WalletConnectedIcon,
                              title: ToastTitle.WALLET_IS_ALREADY_CONNECTED,
                              description:
                                ToastDescription.WALLET_IS_ALREADY_CONNECTED,
                              time: 'Now',
                            })
                          );
                          push('/home');
                          return;
                        }
                        if (index === 0) {
                          walletHandler();
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
