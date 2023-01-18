import { SOCIAL_ART_API_URL } from '@/constants/url';
import {
  CreateNewSnftResponse,
  GetSnftsResponse,
  NewSnft,
} from '@/types/marketplace';
import axios, { AxiosResponse } from 'axios';

export const createNewSnft = async (nft: NewSnft) => {
  try {
    const p = await axios.post<{}, AxiosResponse<CreateNewSnftResponse>>(
      `${SOCIAL_ART_API_URL}/user/marketplace/snft/new`,
      nft
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

export const getAllSnfts = async () => {
  try {
    const p = await axios.get<{}, AxiosResponse<GetSnftsResponse>>(
      `${SOCIAL_ART_API_URL}/user/marketplace/snft/list`
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

export const getSnft = async (id: string) => {
  try {
    const p = await axios.get<{}, AxiosResponse<GetSnftsResponse>>(
      `${SOCIAL_ART_API_URL}/user/marketplace/snft/${id}`
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
