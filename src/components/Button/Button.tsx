import type { NextPage } from 'next';
import styles from './Button.module.scss';

type ButtonProps = {
  text: string;
  outlined?: boolean;
  customStyle?: string;
  icon?: string;
};

const Button: NextPage<ButtonProps> = ({
  text,
  outlined,
  customStyle,
  icon,
}) => {
  return (
    <button
      className={`${outlined ? styles.btnOutlined : styles.btn} ${
        customStyle && customStyle
      }`}
    >
      <img src={icon} className={styles.icon} />
      {text}
    </button>
  );
};
export default Button;
