import type { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import styles from '../Settings.module.scss';
import useWebThree from '../../..//hooks/useWebThree';
import useProfile from '../../../hooks/useProfile';

import {
  AccountNapaLogoIcon,
  DoneIcon,
  ErrorIcon,
  FacebookBlueIcon,
  TwitterBlueIcon,
  WalletNeedsToConnected,
} from '../../../components/assets';
import { CustomToastWithLink } from '../../CustomToast/CustomToast';
import DropDownComponent from '../../Dropdown/Dropdown';
import Input from '../../Input/Input';
import SocialMediaButton from '../../SocialMediaButton/SocialMediaButton';
import Timezone from '../../TimezoneSelect/TimezoneSelect';
import { currencies, languages } from '../../../constants/settings.constants';
import { ToastDescription, ToastTitle } from '../../../typing/toast';

const GeneralTab: NextPage = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [currency, setCurrency] = useState('NAPA');
  const [language, setLanguage] = useState('English');
  const [selectedTimezone, setSelectedTimezone] = useState<any>('');
  const { account } = useWebThree();
  const { push } = useRouter();
  const { createUserProfile, profileDetails, updateUserProfile, profileId } =
    useProfile();

  useEffect(() => {
    if (profileDetails) {
      setName(profileDetails.profileName);
      setBio(profileDetails.bio || '');
      setSelectedTimezone(profileDetails.timezone || '');
      setCurrency(profileDetails.primaryCurrency);
      setLanguage(profileDetails.language || 'English');
    }
  }, [profileDetails]);

  const createUserProfileHandler = useCallback(async () => {
    try {
      if (!account) {
        toast.error(
          CustomToastWithLink({
            icon: WalletNeedsToConnected,
            title: ToastTitle.WALLET_NEEDS_TO_CONNECTED,
            description: ToastDescription.WALLET_NEEDS_TO_CONNECTED,
            time: 'Now',
          })
        );
        return;
      }
      if (!name) {
        toast.error(
          CustomToastWithLink({
            icon: ErrorIcon,
            title: 'Profile name is required',
            description: 'Field is required',
            time: 'Now',
          })
        );
        return;
      }
      const user = {
        accountNumber: account,
        profileName: name,
        bio,
        primaryCurrency: currency,
        language: language || 'English',
        timezone: selectedTimezone.value,
        napaSocialMediaAccount: '',
      };
      // @ts-ignore
      await createUserProfile(user);
      toast.success(
        CustomToastWithLink({
          icon: DoneIcon,
          title: ToastTitle.CHANGES_SAVED,
          description: ToastDescription.CHANGES_SAVED,
          time: 'Now',
        })
      );
      push('/home');
    } catch (error) {
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: ToastTitle.ERROR,
          description: ToastDescription.ERROR,
          time: 'Now',
        })
      );
    }
  }, [name, bio, currency, language, selectedTimezone, account, profileId]);

  const updateUserProfileHandler = useCallback(async () => {
    try {
      if (!account) {
        toast.error(
          CustomToastWithLink({
            icon: WalletNeedsToConnected,
            title: ToastTitle.WALLET_NEEDS_TO_CONNECTED,
            description: ToastDescription.WALLET_NEEDS_TO_CONNECTED,
            time: 'Now',
          })
        );
        return;
      }
      if (!name) {
        toast.error(
          CustomToastWithLink({
            icon: ErrorIcon,
            title: 'Profile name is required',
            description: 'Field is required',
            time: 'Now',
          })
        );
        return;
      }
      const user = {
        accountNumber: account,
        profileName: name,
        bio,
        primaryCurrency: currency,
        language: language || 'English',
        timezone: selectedTimezone.value || selectedTimezone,
        napaSocialMediaAccount: '',
      };
      await updateUserProfile(user, profileId || account);
      toast.success(
        CustomToastWithLink({
          icon: DoneIcon,
          title: ToastTitle.CHANGES_SAVED,
          description: ToastDescription.CHANGES_SAVED,
          time: 'Now',
        })
      );
    } catch (error) {
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: ToastTitle.ERROR,
          description: ToastDescription.ERROR,
          time: 'Now',
        })
      );
    }
  }, [
    name,
    bio,
    currency,
    language,
    selectedTimezone,
    profileDetails,
    profileId,
    account,
  ]);

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
          <Timezone value={selectedTimezone} onChange={setSelectedTimezone} />
          <DropDownComponent
            title="Currency"
            options={currencies}
            dropDownValue={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
          <DropDownComponent
            title="Language"
            options={languages}
            dropDownValue={language}
            onChange={(e) => {
              setLanguage(e.target.value);
            }}
          />
          <button
            className={styles.saveChanges}
            onClick={() => {
              if (!account) {
                toast.error(
                  CustomToastWithLink({
                    icon: WalletNeedsToConnected,
                    title: ToastTitle.WALLET_NEEDS_TO_CONNECTED,
                    description: ToastDescription.WALLET_NEEDS_TO_CONNECTED,
                    time: 'Now',
                  })
                );
                return;
              }
              if (profileDetails) {
                updateUserProfileHandler();
                return;
              }
              createUserProfileHandler();
            }}
          >
            Save changes
          </button>
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
