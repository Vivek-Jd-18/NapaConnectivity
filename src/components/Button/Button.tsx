import type { NextPage } from 'next';
import styles from './Button.module.scss';

type ButtonProps = {
  text: string;
  outlined?: boolean;
  customStyle?: string;
};

const Button: NextPage<ButtonProps> = ({ text, outlined, customStyle }) => {
  return (
    <button
      className={`${outlined ? styles.btnOutlined : styles.btn} ${
        customStyle && customStyle
      }`}
    >
      {text}
    </button>
  );
};
export default Button;
