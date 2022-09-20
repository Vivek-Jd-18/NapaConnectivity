import type { NextPage } from 'next';
import Image from 'next/image';
import styles from './Search.module.scss';
import Container from '../../Layout/Container/Container';

import { ExitIcon } from '../assets';

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
