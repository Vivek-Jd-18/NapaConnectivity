import type { NextPage } from 'next';
import Image from 'next/image';
import styles from './HighlightButton.module.scss';

import { RightArrowBlueIcon } from '../assets';
import Link from 'next/link';

type HighlightButtonProps = {
  title: string;
  link?: string;
  arrow?: boolean;
  as?: string;
};

const HighlightButton: NextPage<HighlightButtonProps> = ({
  title,
  link,
  arrow,
  as,
}) => {
  return (
    <div className={styles.joinSociety}>
      <Link className={styles.joinSocietyBtn} href={link || ''} as={as} passHref>
        {title}
      </Link>
      {arrow && (
        <Image src={RightArrowBlueIcon} alt="arrow" width={40} height={40} />
      )}
    </div>
  );
};

export default HighlightButton;
