import {
  BurgerMenuIcon,
  LogoIcon,
  SearchIcon,
} from '@/components/assets/index';
import Container from '@/Layout/Container/Container';
import type { NextPage } from 'next';
import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import styles from './Header.module.scss';

// Please import define the logo and hamburger menu//
// Decouple the search icon with the container //
const Header: NextPage = () => {
  const [isMenu, setIsMenu] = useState(false);

  const openMenu = () => {
    setIsMenu(true);
  };

  return (
    <>
      <Container className={styles.innerContainer}>
        <div onClick={openMenu}>
          <img src={BurgerMenuIcon} />
        </div>
        <img src={LogoIcon} className={styles.logo} />
        <img src={SearchIcon} />
      </Container>
      {isMenu && <Sidebar onClick={() => setIsMenu(false)} />}
    </>
  );
};

export default Header;
