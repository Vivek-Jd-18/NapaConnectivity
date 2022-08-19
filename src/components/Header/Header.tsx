import { BurgerMenuIcon, WalletIconWhite } from '@/components/assets/index';
import Container from '@/Layout/Container/Container';
import type { NextPage } from 'next';
import Router from 'next/router';
import { useEffect } from 'react';
import Vivus from 'vivus';
import Button from '../Button/Button';
import Sidebar from '../Sidebar/Sidebar';
import { NapaLogo, NapaLogoWhite } from '../Svg';
import styles from './Header.module.scss';

// Please import define the logo and hamburger menu//
// Decouple the search icon with the container //

type HeaderProps = {
  openMenu: () => void;
  setIsMenu: (menu: boolean) => void;
  isMenu: boolean;
};

const Header: NextPage<HeaderProps> = ({ openMenu, isMenu, setIsMenu }) => {
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
          <div className={styles.svgWrapper}>
            <NapaLogo className={styles.napaLogo} />
          </div>
          <div className={styles.svgWrapper}>
            <NapaLogoWhite className={styles.napaLogoWhite} />
          </div>
        </div>
        <div
          onClick={() => {
            Router.push('/wallet');
          }}
          role="button"
        >
          <img src={WalletIconWhite} />
        </div>
      </Container>
      {isMenu && <Sidebar isMenu={isMenu} onClick={() => setIsMenu(false)} />}
    </>
  );
};

export default Header;
