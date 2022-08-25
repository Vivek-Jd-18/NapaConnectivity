import type { NextPage } from 'next';
import { MoreIcon, NapaIcon } from '../../assets';
import styles from './WhiteListComponent.module.scss';

type WhiteListComponentProps = {};

const WhiteListComponent: NextPage<WhiteListComponentProps> = () => {
  return (
    <div className={styles.listContainer}>
      <div className={styles.headerList}>
        <span className={styles.headerListItem}>Currency</span>
        <span className={styles.headerListItem}>Name</span>
        <span className={styles.headerListItem}>Address</span>
      </div>
      <div className={styles.content}>
        {Array.from({ length: 25 }).map((_, index) => {
          return (
            <div key={index} className={styles.listItemContainer}>
              <span className={styles.listItem}>
                <img src={NapaIcon} alt="" />
                <span>NAPA</span>
                <span className={styles.subtitle}>Napa</span>
              </span>
              <span className={styles.listItem}>General NAPA Wallet</span>
              <span className={styles.listItem}>
                Jhdhdj9jHiI3rTyFR5yJklDcV53qWlMn87
              </span>
              <div className={`${styles.listItem} ${styles.moreBtnContainer}`}>
                <img src={MoreIcon} alt="" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhiteListComponent;
