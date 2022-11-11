import type { NextPage } from 'next';
import Image from 'next/image';
import styles from './HighlightButton.module.scss';

import { RightArrowBlueIcon } from '../assets';

type HighlightButtonProps = {
  title: string;
  link?: string;
  arrow?: boolean;
};

const HighlightButton: NextPage<HighlightButtonProps> = ({
  title,
  link,
  arrow,
}) => {
  console.log(title);
  return (
    <div className={styles.joinSociety}>
      <a className={styles.joinSocietyBtn} href={link}>
        {title}
      </a>
      {arrow && (
        <Image src={RightArrowBlueIcon} alt="arrow" width={40} height={40} />
      )}
    </div>
  );
};

export default HighlightButton;
