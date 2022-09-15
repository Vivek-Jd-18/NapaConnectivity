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
  profileId: string;
  profileName: string;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserContextProvider = (props: { children: React.ReactNode }) => {
  const [profileDetails, setProfileDetails] = useState<ProfileDetails>();
  const [profileId, setProfileId] = useState('');
  const { account } = useWebThree();
  const [profileName, setProfileName] = useState('');

  const getProfileIdFromLocalStorage = useCallback(async () => {
    const data = await localStorage.getItem('profileId');
    if (data !== null) {
      setProfileId(JSON.parse(data));
    }
  }, [setProfileId]);

  useEffect(() => {
    getProfileIdFromLocalStorage();
  }, []);

  useEffect(() => {
    if (account) {
      getUserProfileDetails(profileId || account);
    }
  }, [profileId, account]);

  const getUserProfileDetails = useCallback(
    async (profileId: string) => {
      try {
        if (!profileId) {
          return;
        }
        const response = await axios.get(
          `${API_URL}/user/account/details/${profileId}`
        );
        setProfileId(response?.data?.data?.profileId);
        setProfileDetails(response?.data?.data);
      } catch (error: any) {
        if (error.response.data.message === 'User Not Found') {
          console.log('Account Not Found in our System');
          toast.error(
            CustomToastWithLink({
              title: ToastTitle.ERROR,
              icon: ErrorIcon,
              description: 'Account Not Found in our System',
            })
          );
          return;
        }
        toast.error(
          CustomToastWithLink({
            title: ToastTitle.ERROR,
            icon: ErrorIcon,
            description: ToastDescription.ERROR,
          })
        );
      }
    },
    [setProfileId, setProfileDetails]
  );

  const createUserProfile = useCallback(
    async (user: any) => {
      try {
        const res = await axios.post(`${API_URL}/user/account/new`, {
          user,
        });
        localStorage.setItem(
          'profileId',
          JSON.stringify(res?.data?.data.profileId)
        );
        setProfileId(res?.data?.data.profileId);
        setProfileDetails(res.data.data);
        await getUserProfileDetails(profileDetails?.profileId || account);
      } catch (error) {
        console.log('Unable to create profile');
        toast.error(
          CustomToastWithLink({
            title: ToastTitle.ERROR,
            icon: ErrorIcon,
            description: ToastDescription.ERROR,
          })
        );
      }
    },
    [setProfileId, setProfileDetails, account]
  );

  const updateUserProfile = useCallback(
    async (user: any, profileId: string) => {
      try {
        const res = await axios.patch(
          `${API_URL}/user/account/update/${profileId}`,
          {
            user,
          }
        );
        setProfileName(res?.data?.data.profileName);
        await getUserProfileDetails(res?.data?.data.profileId || account);
      } catch (error) {
        console.log('Unable to update profile');
        toast.error(
          CustomToastWithLink({
            title: ToastTitle.ERROR,
            icon: ErrorIcon,
            description: ToastDescription.ERROR,
          })
        );
      }
    },
    [setProfileName, account]
  );

  const value = {
    profileDetails,
    getProfileIdFromLocalStorage,
    createUserProfile,
    profileId,
    profileName,
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
