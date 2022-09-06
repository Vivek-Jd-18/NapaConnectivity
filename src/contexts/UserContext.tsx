import React, { createContext, useCallback, useEffect, useState } from 'react';
import lodash from 'lodash';
import { toast } from 'react-toastify';
import { CustomToastWithLink } from '../components/CustomToast/CustomToast';
import { ErrorIcon } from '../components/assets';
import { ToastDescription, ToastTitle } from '../typing/toast';
import { ProfileDetails } from '../typing/typing';
import { API_URL } from '../constants/url';
import axios from 'axios';
import useWebThree from '../hooks/useWebThree';

type UserContextType = {
  getUserProfileDetails: (id: string) => void;
  createUserProfile: (user: any) => void;
  updateUserProfile: (user: any, id: string) => void;
  getProfileIdFromLocalStorage: () => void;
  profileDetails: ProfileDetails;
  napaProfileId: string;
  napaProfileName: string;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserContextProvider = (props: { children: React.ReactNode }) => {
  const [profileDetails, setProfileDetails] = useState<ProfileDetails>();
  const [napaProfileId, setNapaProfileId] = useState('');
  const { account } = useWebThree();
  const [napaProfileName, setNapaProfileName] = useState('');

  const getProfileIdFromLocalStorage = useCallback(async () => {
    const data = await localStorage.getItem('profileId');
    if (data !== null) {
      setNapaProfileId(JSON.parse(data));
    }
  }, [setNapaProfileId]);

  useEffect(() => {
    getProfileIdFromLocalStorage();
  }, []);

  useEffect(() => {
    if (napaProfileId || account) {
      getUserProfileDetails(napaProfileId || account);
    }
  }, [napaProfileId || account]);

  const getUserProfileDetails = useCallback(
    async (profileId: string) => {
      try {
        const response = await axios.get(
          `${API_URL}/user/account/details/${profileId}`
        );
        setNapaProfileId(response?.data?.user?.napa_profile_id);
        setProfileDetails(response?.data?.user);
      } catch (error) {
        toast.error(
          CustomToastWithLink({
            title: ToastTitle.ERROR,
            icon: ErrorIcon,
            description: ToastDescription.ERROR,
          })
        );
      }
    },
    [setNapaProfileId, setProfileDetails]
  );

  const createUserProfile = useCallback(
    async (user: any) => {
      const res = await axios.post(`${API_URL}/user/account/new`, {
        user,
      });
      localStorage.setItem(
        'profileId',
        JSON.stringify(res?.data?.napa_profile_id)
      );
      setNapaProfileId(res?.data?.napa_profile_id);
      setProfileDetails(res.data);
      await getUserProfileDetails(profileDetails?.napa_profile_id || account);
    },
    [setNapaProfileId, setProfileDetails, account]
  );

  const updateUserProfile = useCallback(
    async (user: any, profileId: string) => {
      const res = await axios.patch(
        `${API_URL}/user/account/update/${profileId}`,
        {
          user,
        }
      );
      setNapaProfileName(res?.data?.profile_name);
      await getUserProfileDetails(res?.data?.napa_profile_id || account);
    },
    [setNapaProfileName, account]
  );

  const value = {
    profileDetails,
    getProfileIdFromLocalStorage,
    createUserProfile,
    napaProfileId,
    napaProfileName,
    getUserProfileDetails,
    updateUserProfile,
  };

  return (
    // @ts-ignore
    <UserContext.Provider value={value}>
      <React.Fragment>
        <div>{lodash.get(props, 'children', false) && props.children}</div>
      </React.Fragment>
    </UserContext.Provider>
  );
};

export default UserContext;
