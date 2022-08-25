import { PlusIcon } from '@/components/assets';
import type { NextPage } from 'next';
import { useState } from 'react';
import styles from '../Settings.module.scss';
import WhiteListComponent from '../WhiteListComponent/WhiteListComponent';

const WhitelistTab: NextPage = () => {
  const [toggleSwitch, setToggleSwitch] = useState(false);

  return (
    <div className={`row col-12 ${styles.whitelistContainer}`}>
      <div className={styles.whitelistHeader}>
        <div className={styles.whitelistLeftSide}>
          <label className={styles.switch}>
            <input
              type="checkbox"
              onChange={(e) => setToggleSwitch(e.target.checked)}
            />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
          <span className={styles.enableWhitelist}>Enable Whitelist</span>
        </div>
        <div className={`${styles.whitelistRightSide}`}>
          <img src={PlusIcon} />
          <span>Add New</span>
        </div>
      </div>
      {toggleSwitch && (
        <div className={styles.whitelistContent}>
          <WhiteListComponent />
        </div>
      )}
    </div>
  );
};

export default WhitelistTab;
