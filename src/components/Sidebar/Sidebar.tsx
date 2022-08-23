import type { NextPage } from 'next';
import { ExitIcon, ProfileIcon, WalletIcon } from '../assets';
import styles from './Sidebar.module.scss';
import Button from '../../components/Button/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
        <img src={ExitIcon} alt="Close" />
      </div>
      <div className={styles.overlayContentContainer}>
        <div className={styles.overlayContent}>
          <Link href="/home">
            <a className={`${pathname === '/home' && styles.active}`}>
              NAPA Home
            </a>
          </Link>
          <Link href="/socialart">
            <a className={`${pathname === '/socialart' && styles.active}`}>
              Social Art
            </a>
          </Link>
          {/* <link href="/napaearn">NAPA Earn</link> */}
          <Link href="/nftmarketplace">
            <a className={`${pathname === '/nftmarketplace' && styles.active}`}>
              NFT Marketplace
            </a>
          </Link>
          <Link href="/napaearn">
            <a className={`${pathname === '/napaearn' && styles.active}`}>
              NAPA Earn
            </a>
          </Link>
          <Link href="/launchpad">
            <a className={`${pathname === '/launchpad' && styles.active}`}>
              Launchpad
            </a>
          </Link>
          <Link href="/leaderboard">
            <a className={`${pathname === '/leaderboard' && styles.active}`}>
              Leaderboard
            </a>
          </Link>
        </div>
        <div className={styles.buttonsContainer}>
          {account ? (
            <>
              <Button text="My Profile" outlined icon={ProfileIcon} />
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
