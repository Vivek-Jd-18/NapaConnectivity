import type { NextPage } from 'next';
import styles from './Button.module.scss';

type ButtonProps = {
  text: string;
  outlined?: boolean;
  customStyle?: string;
  icon?: string;
  onClick?: () => void;

};

const Button: NextPage<ButtonProps> = ({
  text,
  outlined,
  customStyle,
  icon,

  onClick,

}) => {
  return (
    <button
      className={`${outlined ? styles.btnOutlined : styles.btn} ${
        customStyle && customStyle
      }`}

      onClick={onClick}

    >
      <img src={icon} className={styles.icon} />
      {text}
    </button>
  );
};
export default Button;
