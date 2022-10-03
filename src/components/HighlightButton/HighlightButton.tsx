import type { NextPage } from 'next';
import Image from 'next/image';
import styles from './HighlightButton.module.scss';

import { RightArrowBlueIcon } from '../assets';

type HighlightButtonProps = {
  title: string;
  link: string;
};

const HighlightButton: NextPage<HighlightButtonProps> = ({ title, link }) => {
  console.log(title);
  return (
    <div className={styles.joinSociety}>
      <a className={styles.joinSocietyBtn} href={link}>
        {title}
      </a>
      <Image src={RightArrowBlueIcon} alt="arrow" width={40} height={40} />
    </div>
  );
};

export default HighlightButton;
