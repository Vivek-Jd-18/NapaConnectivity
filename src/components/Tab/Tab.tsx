import type { NextPage } from 'next';
import styles from './Tab.module.scss';

type TabProps = {
  title: string;
  setTab: (tab: string) => void;
  tab: string;
};

const Tab: NextPage<TabProps> = ({ title, setTab, tab }) => {
  return (
    <li>
      <button
        type="submit"
        className={`${styles.tabBtn} ${tab == title && styles.active}`}
        onClick={() => setTab(title)}
      >
        {title}
      </button>
    </li>
  );
};

export default Tab;
