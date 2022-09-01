import Container from '@/Layout/Container/Container';
import type { NextPage } from 'next';
import Image from 'next/image';
import { ExitIcon } from '../assets';
import styles from './Search.module.scss';

type SearchProps = {
  setShowSearch: (show: boolean) => void;
};

const Search: NextPage<SearchProps> = ({ setShowSearch }) => {
  return (
    <div className={styles.container}>
      <div className={styles.search} onClick={() => setShowSearch(false)}>
        <Image src={ExitIcon} width={32} height={32} alt="Exit" />
      </div>
      <Container>
        <input
          autoFocus
          className={styles.input}
          placeholder="Search for anything..."
        />
      </Container>
    </div>
  );
};

export default Search;
