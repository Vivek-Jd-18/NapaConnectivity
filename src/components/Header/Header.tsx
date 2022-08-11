import Container from '@/Layout/Container/Container';
import type { NextPage } from 'next';
import styles from './Header.module.scss';

// Please import define the logo and remove the hamburger menu //
// Decouple the search icon with the container //

const Header: NextPage = () => {
  return (
    <>
      <Container className={styles.innerContainer}>
        {/* <img src="/assets/images/burgermenu.svg" /> */}
        <img
          src="https://napa-website.s3.ap-southeast-1.amazonaws.com/transparent-white"
          className={styles.logo}
        />
        {/* <img src="/assets/images/search.svg" /> */}
      </Container>
    </>
  );
};

export default Header;
