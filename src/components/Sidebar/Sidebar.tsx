import type { NextPage } from 'next';
import { ExitIcon, ProfileIcon, WalletIcon } from '../assets';
import styles from './Sidebar.module.scss';
import Button from '../../components/Button/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';

type SidebarProps = {
  onClick: () => void;
  isMenu: boolean;
  connected?: boolean;
};

const Sidebar: NextPage<SidebarProps> = ({ onClick, isMenu, connected }) => {
  const { push } = useRouter();

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
          <Link href="/napasociety">NAPA Society</Link>
          <Link href="/socialart">Social Art</Link>
          {/* <link href="/napaearn">NAPA Earn</link> */}
          <Link href="/nftmarketplace">NFT Marketplace</Link>
          <Link href="/napaearn">NAPA Earn</Link>
          <Link href="/launchpad">Launchpad</Link>
          <Link href="/leaderboard">Leaderboard</Link>
        </div>
        <div className={styles.buttonsContainer}>
          {connected ? (
            <>
              <Button text="My Profile" outlined icon={ProfileIcon} />
              <Button text="Connect Wallet" icon={WalletIcon} />
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
