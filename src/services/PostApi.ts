import { CreateNewPostResponse, GetPostsResponse, NewPost } from '@/types/post';
import axios, { AxiosResponse } from 'axios';
import { SOCIAL_ART_API_URL } from '@/constants/url';

export const createNewPost = async (post: NewPost) => {
  try {
    const p = await axios.post<{}, AxiosResponse<CreateNewPostResponse>>(
      `${SOCIAL_ART_API_URL}/user/social/video/new`,
      {
        postedVideos: post,
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
  
