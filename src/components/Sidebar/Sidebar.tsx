import type { NextPage } from 'next';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import styles from './Sidebar.module.scss';

import { ToastDescription, ToastTitle } from '../../typing/toast';
import { CustomToastWithLink } from '../CustomToast/CustomToast';
import {
  ExitIcon,
  ProfileIcon,
  WalletConnectedIcon,
  WalletIcon,
} from '../assets';
import Button from '../../components/Button/Button';

type SidebarProps = {
  onClick: () => void;
  isMenu: boolean;
  account?: string;
};

const Sidebar: NextPage<SidebarProps> = ({ onClick, isMenu, account }) => {
  const { push, pathname } = useRouter();
  return (
    <div
      className={styles.overlay}
      style={isMenu ? { width: '100%' } : { width: 0 }}
    >
      <div className={styles.closebtn} onClick={onClick}>
        <Image width={40} height={40} src={ExitIcon} alt="Close" />
      </div>
      <div className={styles.overlayContentContainer}>
        <div className={styles.overlayContent}>
          <div
            className={styles.link}
            onClick={() => {
              push('/home');
              onClick();
            }}
          >
            <a className={`${pathname === '/home' && styles.active}`}>
              NAPA Society
            </a>
          </div>
          <div
            className={styles.link}
            onClick={() => {
              push('/socialart');
              onClick();
            }}
          >
            <a className={`${pathname === '/socialart' && styles.active}`}>
              Social Art
            </a>
          </div>
          {/* <link href="/napaearn">NAPA Earn</link> */}
          <div
            className={styles.link}
            onClick={() => {
              push('/nftmarketplace');
              onClick();
            }}
          >
            <a className={`${pathname === '/nftmarketplace' && styles.active}`}>
              NFT Marketplace
            </a>
          </div>
          <div
            className={styles.link}
            onClick={() => {
              push('/earn');
              onClick();
            }}
          >
            <a className={`${pathname === '/earn' && styles.active}`}>
              NAPA Earn
            </a>
          </div>
          <div
            className={styles.link}
            onClick={() => {
              push('/launchpad');
              onClick();
            }}
          >
            <a className={`${pathname === '/launchpad' && styles.active}`}>
              Launchpad
            </a>
          </div>
          <div
            className={styles.link}
            onClick={() => {
              push('/leaderboards');
              onClick();
            }}
          >
            <a className={`${pathname === '/leaderboards' && styles.active}`}>
              Leaderboards
            </a>
          </div>
          <div
            className={styles.link}
            onClick={() => {
              push('/leaderboards');
              onClick();
            }}
          >
            <a className={`${pathname === '/leaderboards' && styles.active}`}>
              Partners Portal
            </a>
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          {account ? (
            <>
              <Button
                text="My Profile"
                outlined
                icon={ProfileIcon}
                onClick={() => {
                  push('/settings');
                  onClick();
                }}
              />
              <Button
                text="Wallet"
                icon={WalletIcon}
                onClick={() => {
                  toast.error(
                    CustomToastWithLink({
                      icon: WalletConnectedIcon,
                      title: ToastTitle.WALLET_IS_ALREADY_CONNECTED,
                      description: ToastDescription.WALLET_IS_ALREADY_CONNECTED,
                      time: 'Now',
                    })
                  );
                }}
              />
            </>
          ) : (
            <>
              <Button
                text="Connect Wallet"
                icon={WalletIcon}
                customStyle={styles.btnConnectWallet}
                onClick={() => {
                  push('/wallet');
                  onClick();
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
