import type { NextPage } from 'next';
import styles from './SocialMediaButton.module.scss';

type SocialMediaButtonProps = {
  className: any;
  icon: string;
  title: string;
  textColor: string;
};

const SocialMediaButton: NextPage<SocialMediaButtonProps> = ({
  className,
  icon,
  title,
  textColor,
}) => {
  return (
    <div className={className}>
      <div className={styles.btnLeftSide}>
        <img src={icon} />
        <span>{title}</span>
      </div>
      <div className={styles.connect} style={{ color: `${textColor}` }}>
        <span>Connect</span>
      </div>
    </div>
  );
};

export default SocialMediaButton;
