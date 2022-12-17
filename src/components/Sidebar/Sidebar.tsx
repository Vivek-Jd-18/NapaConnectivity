import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './Sidebar.module.scss';

import { ExitIcon } from '../assets';

type SidebarProps = {
  onClick: () => void;
  isMenu: boolean;
  account?: string;
};

const Sidebar: NextPage<SidebarProps> = ({ onClick, isMenu }) => {
  const { push, pathname } = useRouter();
  return (
    <div
      className={styles.overlay}
      style={isMenu ? { width: '100%' } : { width: 0 }}
    >
      <div>
        <div className={styles.closebtn} onClick={onClick}>
          <Image width={40} height={40} src={ExitIcon} alt="Close" />
        </div>
      </div>
      <div className={styles.overlayContentContainer}>
        <div className={styles.overlayContent}>
          <div className={styles.NewMenu}>
            <div>
              <div
                className={`${styles.newlink} `}
                onClick={() => {
                  push('/trending');
                  onClick();
                }}
              >
                <a className={`${pathname === '/trending' && styles.active}`}>
                  Whats Trending
                </a>
              </div>
            </div>
            <div className="rspnsv_dis_none">
              <div
                className={styles.link}
                onClick={() => {
                  push('/marketplace');
                  onClick();
                }}
              >
                <a
                  className={`${pathname === '/marketplace' && styles.active}`}
                >
                  Marketplace
                </a>
              </div>
            </div>
            {/* <div className="trending_rsponce">
              <div
                className={`${styles.newlink}`}
                onClick={() => {
                  push('/trending');
                  onClick();
                }}
              >
                <a className={`${pathname === '/trending' && styles.active}`}>
                  Trending
                </a>
              </div>
            </div> */}
            <div className="rspnsv_dis_none">
              <div
                className={styles.link}
                onClick={() => {
                  push('/leaderboards');
                  onClick();
                }}
              >
                <a
                  className={`${pathname === '/leaderboards' && styles.active}`}
                >
                  SNFT Leaders
                </a>
              </div>
            </div>
            <div>
              <div
                className={styles.link}
                onClick={() => {
                  push('/dave');
                  onClick();
                }}
              >
                <a className={`${pathname === '/dave' && styles.active}`}>
                  DAVE
                </a>
              </div>
            </div>
            <div>
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
            </div>
            <div className="rspnsv_dis_none">
              <div
                className={`${styles.newlink}`}
                onClick={() => {
                  push('/co-batching-pools');
                  onClick();
                }}
              >
                <a
                  className={`${
                    pathname === '/co-batching-pools' && styles.active
                  }`}
                >
                  Co-Batching Pools
                </a>
              </div>
            </div>
            <div>
              <div
                className={styles.link}
                onClick={() => {
                  push('/earn');
                  onClick();
                }}
              >
                <a className={`${pathname === '/earn' && styles.active}`}>
                  Staking
                </a>
              </div>
            </div>
            <div className="rspnsv_dis_none">
              <div
                className={styles.link}
                onClick={() => {
                  push('/swapping');
                  onClick();
                }}
              >
                <a className={`${pathname === '/swapping' && styles.active}`}>
                  Swapping
                </a>
              </div>
            </div>
            <div className="rspnsv_dis_none">
              <div
                className={`${styles.newlink}`}
                onClick={() => {
                  push('/payouts');
                  onClick();
                }}
              >
                <a className={`${pathname === '/payouts' && styles.active}`}>
                  Payouts
                </a>
              </div>
            </div>
           
            <div className="rspnsv_dis_none">
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
            </div>
            
            {/* <div className="trending_rsponce">
              <div
                className={styles.link}
                onClick={() => {
                  push('/events');
                  onClick();
                }}
              >
                <a className={`${pathname === '/events' && styles.active}`}>
                  Events
                </a>
              </div>
            </div> */}
             <div className="rspnsv_dis_none">
              <div
                className={`${styles.newlink}`}
                onClick={() => {
                  push('/events');
                  onClick();
                }}
              >
                <a className={`${pathname === '/events' && styles.active}`}>
                  Events
                </a>
              </div>
            </div>
            <div className="trending_rsponce">
              <div
                className={styles.link}
                onClick={() => {
                  push('/top-nft');
                  onClick();
                }}
              >
                <a className={`${pathname === '/top-nft' && styles.active}`}>
                  Rankings
                </a>
              </div>
            </div>
            
            <div className="rspnsv_dis_none">
              <div
                className={styles.link}
                onClick={() => {
                  push('https://partners-demo.napasociety.io');
                  onClick();
                }}
              >
                <a className={`${pathname === '/partners' && styles.active}`}>
                  Partners Portal
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
