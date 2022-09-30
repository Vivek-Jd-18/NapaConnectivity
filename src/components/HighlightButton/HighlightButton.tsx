import type { NextPage } from 'next';
import Image from 'next/image';
import styles from './HighlightButton.module.scss';

import { RightArrowBlueIcon } from '../assets';

type HighlightButtonProps = {
  title: string;
};

const HighlightButton: NextPage<HighlightButtonProps> = ({ title }) => {
  return (
    <div className={styles.joinSociety}>
      <button className={styles.joinSocietyBtn}>{title}</button>
      <Image src={RightArrowBlueIcon} alt="arrow" width={40} height={40} />
    </div>
  );
};

export default HighlightButton;
