import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from './Steper.module.scss';

const Steper: NextPage = () => {
  const [steps, setSteps] = useState(1);

  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  console.log('steps', showTopBtn);

  return (
    <div className={styles.container}>
      <div className={styles.topText}>
        <span>0{steps}</span>
      </div>
      <div className={styles.steper}>
        {steps === 1 && <span className={styles.stepActive}></span>}
        {steps === 2 && <span className={styles.stepActive}></span>}
        {steps === 3 && <span className={styles.stepActive}></span>}
        {steps === 4 && <span className={styles.stepActive}></span>}
      </div>
      <div className={styles.bottomText}>
        <span>04</span>
      </div>
    </div>
  );
};

export default Steper;
