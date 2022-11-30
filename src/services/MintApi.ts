import { SOCIAL_ART_API_URL } from '@/constants/url';
import { CreateNewMintResponse, NewMint } from '@/types/mint';
import axios, { AxiosResponse } from 'axios';

export const createNewMint = async (mint: NewMint) => {
  try {
    const p = await axios.post<{}, AxiosResponse<CreateNewMintResponse>>(
      `${SOCIAL_ART_API_URL}/user/social/mint/new`,
      mint
    );
    return {
      data: p.data,
      message: '',
      error: false,
    };
  } catch (error) {
    return {
      data: null,
      error: true,
      message: error?.response?.data?.message,
    };
  }
};
