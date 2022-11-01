import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Vivus from 'vivus';
import styles from './Header.module.scss';
import Container from '../../Layout/Container/Container';

import useWebThree from '../../hooks/useWebThree';
import useProfile from '../../hooks/useProfile';

import Sidebar from '../Sidebar/Sidebar';
import WalletPopup from '../WalletPopup/WalletPopup';
import { NapaLogo, NapaLogoWhite } from '../Svg';
import {
  BurgerMenuIcon,
  ProfileIcon,
  SearchIcon,
  WalletBlueIcon,
  WalletIconTwo,
  WalletIconWhite,
} from '../../components/assets';
import Button from '../Button/Button';

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
  const [show, setShow] = useState(true);
  const { walletEth, account, walletBnb, walletNapa, getAccounts } =
    useWebThree();

  useEffect(() => {
    if (show) {
      getAccounts();
      setShow(false);
    }
  }, [show]);

  const { profileDetails } = useProfile();

  useEffect(() => {
    new Vivus('napa-logo', {
      type: 'delayed',
      duration: 200,
      animTimingFunction: Vivus.EASE_OUT,
    });
  }, []);

  return (
    <header className="page-header">
      <Container className={`${styles.innerContainer} asinnerContainer`}>
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
        <div className="d-flex align-items-center had_right_btns">
          <div className={styles.search} onClick={() => setShowSearch(true)}>
            <Image width={36} height={36} src={SearchIcon} alt="search" />
          </div>
          {account && (
            <>
                <Button
                  // text="My Profile"
                  text=""
                  outlined
                  icon={ProfileIcon}
                  onClick={() => {
                    push('/settings');
                    setIsMenu(false);
                  }}
                />
              {/* <Button
                text="Wallet"
                icon={WalletIconTwo}
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
              /> */}
            </>
          )}
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
                napaProfileName={profileDetails?.profileName as string}
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
    </header>
  );
};

export default Header;
