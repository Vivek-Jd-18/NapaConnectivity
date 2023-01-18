export type CreateNewSnftResponse = {
  data: SnftResponse;
  code: number;
  responseTime: string;
};

export type SnftResponse = {
  snftId: string;
  collection: string;
  amount: string;
  duration: string;
  mintId: string;
  postId: string;
  profileId: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  thumbnail: string;
  videoURL: string;
  userName: string;
  userImage: string;
};

export type GetSnftsResponse = {
  data: SnftResponse;
  code: number;
  responseTime: string;
};

export type NewSnft = {
  collection: string;
  type: string;
  amount: string;
  duration: string;
  mintId: string;
  postId: string;
  profileId: string;
  thumbnail: string;
  videoURL: string;
};
