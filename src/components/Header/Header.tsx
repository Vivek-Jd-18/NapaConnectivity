import { BurgerMenuIcon, LogoIcon, SearchIcon } from '@/index';
import Container from '@/Layout/Container/Container';
import type { NextPage } from 'next';
import styles from './Header.module.scss';

// Please import define the logo and hamburger menu//
// Decouple the search icon with the container //
const Header: NextPage = () => {
  return (
    <>
      <Container className={styles.innerContainer}>
        <img src={BurgerMenuIcon} />
        <img src={LogoIcon} className={styles.logo} />
        <img src={SearchIcon} />
      </Container>
    </>
  );
};

export default Header;
