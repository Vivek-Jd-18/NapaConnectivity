import {
  BurgerMenuIcon,
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

// Please import define the logo and hamburger menu//
// Decouple the search icon with the container //

type HeaderProps = {
  openMenu: () => void;
  setIsMenu: (menu: boolean) => void;
  isMenu: boolean;
  account?: string;
};

const Header: NextPage<HeaderProps> = ({
  openMenu,
  isMenu,
  setIsMenu,
  account,
}) => {
  const { push } = useRouter();
  const [popupShow, setPopupShow] = useState(false);
  const { walletEth } = useWeb3();
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
          <img src={BurgerMenuIcon} className={styles.burgerMenuIcon} />
        </div>
        <div>
          <div className={styles.svgWrapper} onClick={() => push('/')}>
            <NapaLogo className={styles.napaLogo} />
          </div>
          <div className={styles.svgWrapper} onClick={() => push('/')}>
            <NapaLogoWhite className={styles.napaLogoWhite} />
          </div>
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
            <img
              src={popupShow ? WalletBlueIcon : WalletIconWhite}
              className={styles.walletIcon}
            />
          </div>
          {popupShow && (
            <WalletPopup
              account={account}
              setPopupShow={setPopupShow}
              ethereum={walletEth}
              crypto={false}
            />
          )}
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
