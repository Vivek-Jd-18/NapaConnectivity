import type { NextPage } from 'next';
import { useEffect } from 'react';
// import Vivus from 'vivus';
// import { NapaLogo, NapaLogoWhite } from '../Svg';
import styles from './Loader.module.scss';

const Loader: NextPage = () => {
  useEffect(() => {
    // new Vivus('napa-logo', {
    //   type: 'delayed',
    //   duration: 200,

    //   animTimingFunction: Vivus.EASE_OUT,
    // });
  }, []);

  return (
    <div className={styles.loaderContainer}>
      <div className={styles.svgWrapper}>
        {/* <NapaLogo className={styles.napaLogo} /> */}
      </div>
      <div className={styles.svgWrapper}>
        {/* <NapaLogoWhite className={styles.napaLogoWhite} /> */}
        <h1 className={styles.loaderText} id="napa-logo" data-text="napa">napa</h1>
      </div>
    </div>
  );
};

export default Loader;
