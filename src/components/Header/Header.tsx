import { BurgerMenuIcon, WalletIconWhite } from '../../components/assets';
import Container from '../../Layout/Container/Container';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Vivus from 'vivus';
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
  const { push } = useRouter();
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
        <div onClick={() => push('/wallet')} role="button">
          <img src={WalletIconWhite} />
        </div>
      </Container>
      {isMenu && <Sidebar isMenu={isMenu} onClick={() => setIsMenu(false)} />}
    </>
  );
};

export default Header;
