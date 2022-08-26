import { RightArrowBlueIcon } from '../assets';
import styles from './HighlightButton.module.scss';
import type { NextPage } from 'next';

type HighlightButtonProps = {
  title: string;
};

const HighlightButton: NextPage<HighlightButtonProps> = ({ title }) => {
  return (
    <div className={styles.joinSociety}>
      <button className={styles.joinSocietyBtn}>{title}</button>
      <img src={RightArrowBlueIcon} />
    </div>
  );
};

export default HighlightButton;
