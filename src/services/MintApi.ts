import { SOCIAL_ART_API_URL } from '../constants/url';
import {
  CreateNewMintResponse,
  GetMintPostsResponse,
  GetRecentMintPostsResponse,
  NewMint,
} from '../types/mint';
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

export const getAllMintedPosts = async () => {
  try {
    const p = await axios.get<{}, AxiosResponse<GetMintPostsResponse>>(
      `${SOCIAL_ART_API_URL}/user/social/mint`
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

export const getMintedPost = async (id: string) => {
  try {
    const p = await axios.get<{}, AxiosResponse<GetMintPostsResponse>>(
      `${SOCIAL_ART_API_URL}/user/social/mint/details?id=${id}`
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

export const updatePostMint = async ({
  postId,
  profileId,
  mintId,
  marketplace_listed,
}: {
  postId: string;
  profileId: string;
  mintId: string;
  marketplace_listed: string;
}) => {
  try {
    const p = await axios.post<{}, AxiosResponse<''>>(
      `${SOCIAL_ART_API_URL}/user/social/mint/update/${mintId}`,
      {
        profileId,
        postId,
        marketplace_listed,
      }
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

export const updateMintPostStatus = async (
  postId: string,
  status: string,
  napaTokenEarned: string
) => {
  try {
    const p = await axios.post<{}, AxiosResponse<''>>(
      `${SOCIAL_ART_API_URL}/user/social/mint/update/status/${postId}`,
      {
        postId,
        status,
        napaTokenEarned,
      }
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

export const getRecentMintedPosts = async () => {
  try {
    const p = await axios.get<{}, AxiosResponse<GetRecentMintPostsResponse>>(
      `${SOCIAL_ART_API_URL}/user/social/mint/recent`
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
