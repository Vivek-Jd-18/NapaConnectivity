import {
  CreateNewPostResponse,
  GetAwardPostResponse,
  GetLikePostResponse,
  GetPostsResponse,
} from '@/types/post';
import axios, { AxiosResponse } from 'axios';
import { SOCIAL_ART_API_URL } from '@/constants/url';

export const createNewPost = async (post: any) => {
  try {
    const p = await axios.post<{}, AxiosResponse<CreateNewPostResponse>>(
      `${SOCIAL_ART_API_URL}/user/social/video/new`,
      post,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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

export const getAllPosts = async () => {
  try {
    const p = await axios.get<{}, AxiosResponse<GetPostsResponse>>(
      `${SOCIAL_ART_API_URL}/user/social/video/list`
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

export const likePost = async (profileId: string, postId: string) => {
  try {
    const p = await axios.post<{}, AxiosResponse<GetLikePostResponse>>(
      `${SOCIAL_ART_API_URL}/user/social/video/like`,
      {
        profileId,
        postId,
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

export const awardPost = async (profileId: string, postId: string) => {
  try {
    const p = await axios.post<{}, AxiosResponse<GetAwardPostResponse>>(
      `${SOCIAL_ART_API_URL}/user/social/video/award`,
      {
        profileId,
        postId,
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
