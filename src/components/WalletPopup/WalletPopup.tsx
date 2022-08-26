import type { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import {
  ArrowDownIcon,
  EthereumBlackIcon,
  EtheriumIcon,
  MoreIcon,
} from '../assets';
import styles from './WalletPopup.module.scss';

type WalletPopupProps = {
  setPopupShow: (show: boolean) => void;
  account?: string;
  ethereum?: number;
};

const WalletPopup: NextPage<WalletPopupProps> = ({
  setPopupShow,
  account,
  ethereum,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      //@ts-ignore
      if (ref.current && !ref.current.contains(event.target)) {
        setPopupShow(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.header}>
        <div className="d-flex">
          <h2>Venly ETH</h2>
          <img src={ArrowDownIcon} alt="" />
        </div>
        <div>
          <img src={MoreIcon} alt="" />
        </div>
      </div>
      <div className={styles.left}>
        <span>{account}</span>
      </div>
      <div className={styles.body}>
        <img src={EtheriumIcon} alt="" />
        <h2>{ethereum}</h2>
        <span>$98,22 USD</span>
      </div>
      <div className={styles.footer}>
        <div className={styles.footerLeftSide}>
          <img src={EthereumBlackIcon} alt="" />
          <span className={styles.ethereum}>Ethereum</span>
          <span className={styles.eth}>ETH</span>
        </div>
        <div className={styles.footerRightSide}>
          <h2>{ethereum}</h2>
        </div>
      </div>
    </div>
  );
};

export default WalletPopup;
