export type CreateNewSnftResponse = {
  data: SnftResponse;
  code: number;
  responseTime: string;
};

export type DeleteSnftResponse = {
  message: string;
  code: number;
  responseTime: string;
};

export type SnftResponse = {
  snftId: string;
  currencyType: string;
  amount: string;
  duration: string;
  mintId: string;
  postId: string;
  SNFTDescription: string;
  SNFTTitle: string;
  marketplace_listed?: string;
  profileId: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  thumbnail: string;
  videoURL: string;
  userName: string;
  userImage: string;
  tokenUri?: string;
  accountId?: string;
  tokenId?: string;
};

export type GetSnftsResponse = {
  data: SnftResponse;
  code: number;
  responseTime: string;
};

export type NewSnft = {
  currencyType: string;
  type: string;
  amount: string;
  duration: string;
  mintId?: string;
  profileId?: string;
  postId?: string;
};
