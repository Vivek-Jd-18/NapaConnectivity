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
  const [napaProfileId, setNapaProfileId] = useState('');

  const getProfileIdFromLocalStorage = useCallback(async () => {
    const data = await localStorage.getItem('profileId');
    if (data !== null) {
      setNapaProfileId(JSON.parse(data));
    }
  }, [setNapaProfileId]);

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
    },
    [setNapaProfileId, setProfileDetails]
  );

  const updateUserProfile = useCallback(
    async (user: any, profileId: string) => {
      await axios.patch(`${API_URL}/user/account/update/${profileId}`, {
        user,
      });
    },
    []
  );

  return {
    getUserProfileDetails,
    profileDetails,
    createUserProfile,
    updateUserProfile,
    napaProfileId,
    getProfileIdFromLocalStorage,
  };
};
