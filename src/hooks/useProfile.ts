import { ErrorIcon } from '@/components/assets';
import { CustomToastWithLink } from '@/components/CustomToast/CustomToast';
import { API_URL } from '@/constants/url';
import { ToastDescription, ToastTitle } from '@/typing/toast';
import { ProfileDetails } from '@/typing/typing';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

export const useProfile = () => {
  const [profileDetails, setProfileDetails] = useState<ProfileDetails>();

  const getUserProfileDetails = useCallback(
    async (profileId: string) => {
      try {
        const response = await axios.get(
          `${API_URL}/user/account/details/${profileId}`
        );
        setProfileDetails(response.data.user);
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
    [setProfileDetails]
  );

  const createUserProfile = useCallback(async (user: any) => {
    await axios.post(`${API_URL}/user/account/new`, {
      user,
    });
  }, []);

  const updateUserProfile = useCallback(async (user: any) => {
    await axios.post(`${API_URL}/user/account/update`, {
      user,
    });
  }, []);

  return {
    getUserProfileDetails,
    profileDetails,
    createUserProfile,
    updateUserProfile,
  };
};
