import type { NextPage } from 'next';
import Image from 'next/image';
import styles from './AnimateButton.module.scss';

import { RightArrowBlueIcon } from '../assets';

type AnimateButtonProps = {
  title: string;
  link: string;
};

const AnimateButton: NextPage<AnimateButtonProps> = ({ title, link }) => {
  return (
    <div className={styles.joinSociety}>
      <a className={styles.joinSocietyBtn} href={link}>
        {title}
      </a>
      <Image src={RightArrowBlueIcon} alt="arrow" width={40} height={40} />
    </div>
  );
};

export default AnimateButton;
