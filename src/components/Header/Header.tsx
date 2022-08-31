import {
  BurgerMenuIcon,
  SearchIcon,
  WalletBlueIcon,
  WalletIconWhite,
} from '../../components/assets';
import Container from '../../Layout/Container/Container';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Vivus from 'vivus';
import Sidebar from '../Sidebar/Sidebar';
import { NapaLogo, NapaLogoWhite } from '../Svg';
import styles from './Header.module.scss';
import WalletPopup from '../WalletPopup/WalletPopup';
import { useWeb3 } from '@/hooks/useWeb3';
import Image from 'next/image';

// Please import define the logo and hamburger menu//
// Decouple the search icon with the container //

type HeaderProps = {
  openMenu: () => void;
  setIsMenu: (menu: boolean) => void;
  isMenu: boolean;
  setShowSearch: (search: boolean) => void;
};

const Header: NextPage<HeaderProps> = ({
  openMenu,
  isMenu,
  setIsMenu,
  setShowSearch,
}) => {
  const { push } = useRouter();
  const [popupShow, setPopupShow] = useState(false);
  const { walletEth, account, walletBnb, walletNapa } = useWeb3();
  useEffect(() => {
    new Vivus('napa-logo', {
      type: 'delayed',
      duration: 200,
      animTimingFunction: Vivus.EASE_OUT,
    });
  }, []);
  return (
    <>
      <Container className={styles.innerContainer}>
        <div onClick={openMenu}>
          <Image
            src={BurgerMenuIcon}
            alt="BurgerMenuIcon"
            className={styles.burgerMenuIcon}
            width={64}
            height={32}
          />
        </div>
        <div>
          <div className={styles.svgWrapper} onClick={() => push('/')}>
            <NapaLogo className={styles.napaLogo} />
          </div>
          <div className={styles.svgWrapper} onClick={() => push('/')}>
            <NapaLogoWhite className={styles.napaLogoWhite} />
          </div>
        </div>
        <div className="d-flex align-items-center">
          <div className={styles.search} onClick={() => setShowSearch(true)}>
            <Image width={36} height={36} src={SearchIcon} alt="search" />
          </div>
          <div className={styles.wallet}>
            <div
              onClick={() => {
                if (account) {
                  setPopupShow(true);
                  return;
                }
                push('/wallet');
              }}
              role="button"
            >
              <Image
                src={popupShow ? WalletBlueIcon : WalletIconWhite}
                className={styles.walletIcon}
                width={36}
                height={36}
                alt="wallet"
              />
            </div>
            {popupShow && (
              <WalletPopup
                account={account}
                setPopupShow={setPopupShow}
                ethereum={walletEth}
                napa={walletNapa}
                bnb={walletBnb}
                crypto={false}
              />
            )}
          </div>
        </div>
      </Container>
      {isMenu && (
        <Sidebar
          isMenu={isMenu}
          onClick={() => setIsMenu(false)}
          account={account}
        />
      )}
    </>
  );
};

export default Header;
