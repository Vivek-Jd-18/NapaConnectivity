import type { NextPage } from 'next';
import { ExitIcon, ProfileIcon, WalletIcon } from '../assets';
import styles from './Sidebar.module.scss';
import Button from '../../components/Button/Button';
import { useRouter } from 'next/router';
import Image from 'next/image';

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
              push('/napaearn');
              onClick();
            }}
          >
            <a className={`${pathname === '/napaearn' && styles.active}`}>
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
              push('/leaderboard');
              onClick();
            }}
          >
            <a className={`${pathname === '/leaderboard' && styles.active}`}>
              Leaderboard
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
                onClick={() => push('/settings')}
              />
              <Button text="Wallet" icon={WalletIcon} />
            </>
          ) : (
            <>
              <Button
                text="Connect Wallet"
                icon={WalletIcon}
                customStyle={styles.btnConnectWallet}
                onClick={() => push('/wallet')}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
