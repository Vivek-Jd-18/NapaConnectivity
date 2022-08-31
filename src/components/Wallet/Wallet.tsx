import { NapaLogo, NapaLogoWhite } from '../../components/Svg';

import { useCallback, useEffect } from 'react';

import Vivus from 'vivus';
import Container from '../../Layout/Container/Container';
import type { NextPage } from 'next';
import styles from '../../../styles/pages/Wallet.module.scss';
import { WalletConnectedIcon } from '../../components/assets';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { CustomToastWithLink } from '../CustomToast/CustomToast';
import { walletButtonList } from '@/constants/wallet.constants';
import Image from 'next/image';
import { ToastDescription, ToastTitle } from '@/typing/toast';

type WalletComponentProps = {
  connectWallet: () => void;
  account: string;
};

const WalletComponent: NextPage<WalletComponentProps> = ({
  connectWallet,
  account,
}) => {
  const { push } = useRouter();


import {
  MetaMaskIcon,
  CoinbaseIcon,
  AuthereumIcon,
  VenlyIcon,
} from '../../components/assets';
import { getWeb3 } from '../../utils/wallet';
import Web3 from 'web3';
import { toast } from 'react-toastify';

const walletButtonList = [
  {
    text: 'Metamask',
    icon: MetaMaskIcon,
    borderColor: '#F5841F',
  },
  {
    text: 'Coinbase',
    icon: CoinbaseIcon,
    borderColor: '#2B5EE2',
  },
  {
    text: 'Authereum',
    icon: AuthereumIcon,
    borderColor: '#FF4C2F',
  },
  {
    text: 'Venly',
    icon: VenlyIcon,
    borderColor: '#7735E8',
  },
];

const WalletComponent: NextPage = () => {

  useEffect(() => {
    new Vivus('napa-logo', {
      type: 'delayed',
      duration: 200,

      animTimingFunction: Vivus.EASE_OUT,
    });
  }, []);


  const connectWallet = useCallback(async () => {
    try {
      const web3: any = await getWeb3();
      const walletAddress = await web3.eth.requestAccounts();
      const accounts = await web3.eth.getAccounts();
      const walletBalanceInWei = await web3.eth.getBalance(walletAddress[0]);
      const walletBalanceInEth =
        // @ts-ignore
        Math.round(Web3.utils.fromWei(walletBalanceInWei) * 1000) / 1000;
      toast.success('Connected Successfully');
      console.log('address', walletAddress);
      console.log('balance', walletBalanceInEth);
      console.log('accounts', accounts);
    } catch (error: any) {
      if (
        error.message ===
        "Cannot read properties of undefined (reading 'request')"
      ) {
        toast.error('Please install the Metamask extension');
        return;
      }
      toast.error(error.message);
    }
  }, [getWeb3]);


  return (
    <div className={styles.backgroundImage}>
      <Container>
        <div
          className={`row justify-content-between align-items-center col-12 ${styles.innerMainContainer}`}
        >

          <div className={`col-xl-6 col-md-12 d-flex justify-content-center`}>
            <div className={styles.svgWrapper} onClick={() => push('/home')}>

          <div className="col-xl-6 col-md-12">
            <div className={styles.svgWrapper}>

              <NapaLogo
                className={styles.napaLogo}
                width={'360'}
                height={'80'}
              />
            </div>

            <div className={styles.svgWrapper} onClick={() => push('/')}>

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
              <h1 className={styles.walletText}>Select Wallet</h1>

            <div className="flex-column mx-width">
              <h1 className={styles.walletText}>Select a Wallet</h1>

              <span className={styles.descriptionText}>
                By connecting your wallet, you agree to our{' '}
                <span className={styles.termsPrivacyText}>
                  Terms of Service
                </span>

                &nbsp;and our{' '}

                &nbsp;<br></br>and our{' '}

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
                              icon: WalletConnectedIcon,
                              title: ToastTitle.WALLET_IS_ALREADY_CONNECTED,
                              description:
                                ToastDescription.WALLET_IS_ALREADY_CONNECTED,
                              time: 'Now',
                            })
                          );
                          return;
                        }
                        if (index === 0) {
                          connectWallet();
                        }

                        if (index === 0) connectWallet();

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
