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
  SearchIcon,
  WalletBlueIcon,
  WalletIconWhite,
} from '../../components/assets';

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
  const { walletEth, account, walletBnb, walletNapa } = useWebThree();

  const handleScroll = () => {
    const header = document.querySelector<HTMLElement>('.innerContainer');
    if (header) {
      if (window.scrollY > 74) {
        header.style.backgroundColor = 'rgb(0,0,0,0.4)';
        header.style.paddingBottom = '1rem';
        header.style.transition = '0.8s ease';
      } else {
        header.style.backgroundColor = `rgb(0,0,0,${
          (window.scrollY / 150) * 0.4
        })`;
        header.style.paddingBottom = '0';
        header.style.transition = '0.8s ease';
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  const { profileDetails } = useProfile();

  useEffect(() => {
    new Vivus('napa-logo', {
      type: 'delayed',
      duration: 200,
      animTimingFunction: Vivus.EASE_OUT,
    });
  }, []);

  // scroll effect
  const body = document.body;
  // const triggerMenu = document.querySelector(".page-header .trigger-menu");
  // const nav = document.querySelector(".page-header nav");
  // const menu = document.querySelector(".page-header .menu");
  // const lottieWrapper = document.querySelector(".lottie-wrapper");
  // const lottiePlayer = document.querySelector("lottie-player");

  window.addEventListener('scroll', () => {});

  useEffect(() => {
    const element = document.getElementById('scrollElement');
    const scrollUp = 'scroll-up';
    const scrollDown = 'scroll-down';
    let lastScroll = 10;

    element?.addEventListener('scroll', () => {
      const currentScroll = element.scrollTop;
      if (currentScroll <= 0) {
        body.classList.remove(scrollUp);
        return;
      }

      if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
        // down
        body.classList.remove(scrollUp);
        body.classList.add(scrollDown);
        // lottiePlayer.play();
      } else if (
        currentScroll < lastScroll &&
        body.classList.contains(scrollDown)
      ) {
        // up
        body.classList.remove(scrollDown);
        body.classList.add(scrollUp);
        // lottiePlayer.stop();
      }
      lastScroll = currentScroll;
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
