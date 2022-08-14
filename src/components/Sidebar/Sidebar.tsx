// import Container from '@/Layout/Container/Container';
import type { NextPage } from 'next';
import { ExitIcon } from '../assets';
import styles from './Sidebar.module.scss';

type SidebarProps = {
  onClick: () => void;
};

const Sidebar: NextPage<SidebarProps> = ({ onClick }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.closebtn} onClick={onClick}>
        <img src={ExitIcon} alt="Close" />
      </div>
      <div className={styles.overlayContent}>
        <a href="#">NAPA Society</a>
        <a href="#">Social Art</a> 
        <a href="#">NFT Marketplace</a>
        <a href="#">Leaderboard</a>
        <a href="#">Launchpad</a>
      </div>
    </div>
  );
};

export default Sidebar;
