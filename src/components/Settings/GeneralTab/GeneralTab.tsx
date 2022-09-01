import {
  AccountNapaLogoIcon,
  FacebookBlueIcon,
  TwitterBlueIcon,
} from '@/components/assets';
import DropDownComponent from '@/components/Dropdown/Dropdown';
import Input from '@/components/Input/Input';
import SocialMediaButton from '@/components/SocialMediaButton/SocialMediaButton';
import {
  currencies,
  languages,
  timezones,
} from '@/constants/settings.constants';
import type { NextPage } from 'next';
import { useState } from 'react';
import styles from '../Settings.module.scss';

const GeneralTab: NextPage = () => {
  const [name, setName] = useState('Dwight Holland');
  const [bio, setBio] = useState('');
  return (
    <div className={`row col-12 ${styles.leftSideContainer}`}>
      <div className={`col-xl-6`}>
        <div className={styles.formContainer}>
          <Input
            value={name}
            type="text"
            placeholder="Profile Name"
            label="Profile Name"
            onChange={(e) => setName(e.target.value)}
          />
          <div className={styles.textArea}>
            <span>Bio</span>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
          <DropDownComponent title="Your Timezone" options={timezones} />
          <DropDownComponent title="Currency" options={currencies} />
          <DropDownComponent title="Language" options={languages} />
          <button className={styles.saveChanges}>Save changes</button>
        </div>
      </div>
      <div className={`col-xl-6 ${styles.rightSideContainer}`}>
        <div className={styles.firstChild}>
          <h1 className={styles.napa}>NAPA Social Media</h1>
          <SocialMediaButton
            className={styles.accountBtn}
            title="Your Account"
            textColor="#16E6EF"
            icon={AccountNapaLogoIcon}
          />
        </div>
        <div className={styles.secondChild}>
          <h1 className={styles.social}>Social Connections</h1>
          <SocialMediaButton
            className={styles.twitterBtn}
            title="Twitter"
            textColor="#1D9BF0"
            icon={TwitterBlueIcon}
          />
          <SocialMediaButton
            className={styles.facebookBtn}
            title="Facebook"
            icon={FacebookBlueIcon}
            textColor="#1877F2"
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralTab;
