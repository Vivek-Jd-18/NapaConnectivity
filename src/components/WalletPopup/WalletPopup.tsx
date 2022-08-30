import type { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import {
  EthereumBlackIcon,
  EtheriumIcon,
  MoreIcon,
  SmallExitIcon,
} from '../assets';
import styles from './WalletPopup.module.scss';

type WalletPopupProps = {
  setPopupShow: (show: boolean) => void;
  account?: string;
  ethereum?: number;
  crypto?: boolean;
};

const WalletPopup: NextPage<WalletPopupProps> = ({
  setPopupShow,
  account,
  crypto,
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
  }, [setPopupShow]);

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.header}>
        <div className="d-flex">
          <h2>Venly ETH</h2>
        </div>
        <div className={styles.actionButtons}>
          <div
            onClick={() => {
              setPopupShow(false);
            }}
          >
            <Image src={SmallExitIcon} width={15} height={15} alt={'cross'} />
          </div>
          <Image src={MoreIcon} alt={'menu'} width={25} height={25} />
        </div>
      </div>
      <div className={styles.left}>
        <span>{account}</span>
      </div>
      <div className={styles.body}>
        <Image src={EtheriumIcon} alt={'Etherium'} width={90} height={90} />
        <h2>{ethereum}</h2>
        {crypto && <span>$98,22 USD</span>}
      </div>
      <div className={styles.footer}>
        <div className={styles.footerLeftSide}>
          <Image
            src={EthereumBlackIcon}
            width={30}
            height={30}
            alt="Etherium"
          />
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
