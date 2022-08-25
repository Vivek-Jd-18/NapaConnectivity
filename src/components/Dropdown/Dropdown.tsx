import { Options } from '@/typing/typing';
import type { NextPage } from 'next';
import styles from './Dropdown.module.scss';

type DropDownComponentProps = {
  options: Options[];
  title: string;
};

const DropDownComponent: NextPage<DropDownComponentProps> = ({
  options,
  title,
}) => {
  return (
    <div className={`form-floating ${styles.dropdownContainer}`}>
      <select
        className={`form-select ${styles.selectContainer}`}
        id="floatingSelect"
        aria-label="Floating label select example"
      >
        {options.map(({ value, name }, index) => {
          return (
            <option
              className={styles.option}
              selected={index == 0}
              value={value}
              key={index}
            >
              {name}
            </option>
          );
        })}
      </select>
      <label className={styles.selectLabel} htmlFor="floatingSelect">
        {title}
      </label>
    </div>
  );
};

export default DropDownComponent;
