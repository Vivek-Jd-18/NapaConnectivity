import { Options } from '../../typing/typing';
import type { NextPage } from 'next';
import styles from './Dropdown.module.scss';

type DropDownComponentProps = {
  options: Options[];
  title?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  dropDownValue: string;
};

const DropDownComponent: NextPage<DropDownComponentProps> = ({
  options,
  title,
  onChange,
  dropDownValue,
}) => {
  return (
    <div className={`form-floating ${styles.dropdownContainer}`}>
      <select
        className={`form-select ${styles.selectContainer}`}
        id="floatingSelect"
        aria-label="Floating label select example"
        value={dropDownValue}
        onChange={onChange}
      >
        {options.map(({ value, name }, index) => {
          return (
            <option
              className={styles.option}
              selected={value === dropDownValue}
              value={value}
              key={index}
            >
              {name}
            </option>
          );
        })}
      </select>
      {title && (
        <label className={styles.selectLabel} htmlFor="floatingSelect">
          {title}
        </label>
      )}
    </div>
  );
};

export default DropDownComponent;
