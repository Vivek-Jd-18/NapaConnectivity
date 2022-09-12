import type { NextPage } from 'next';
import styles from './Loader.module.scss';

const Loader: NextPage = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.svgWrapper}></div>
      <div className={styles.svgWrapper}>
        <h1 className={styles.loaderText} id="napa-logo" data-text="napa">
          napa
        </h1>
      </div>
    </div>
  );
};

export default Loader;
