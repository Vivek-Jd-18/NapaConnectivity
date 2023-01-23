export type CreateNewMintResponse = {
  data: MintResponse;
  code: number;
  responseTime: string;
};

export type MintResponse = {
  postId: string;
  mintedId: string;
  SNFTAddress: string;
  networkTxId: string;
  owner: string;
  status: string;
};

export type GetMintPostsResponse = {
  data: MintPost;
  code: number;
  responseTime: string;
};

export type MintPost = {
  id: string;
  postId: string;
  mintId: string;
  videoType: string;
  accountId: string;
  profileId: string;
  network: string;
  status: string;
  SNFTTitle: string;
  SNFTCollection: string;
  SNFTDescription: string;
  location: string;
  taggedPeople: string;
  genre: string;
  tags: string;
  live: string;
  payoutApproved: string;
  SNFTAddress: string;
  networkTxId: string;
  owner: string;
  gasFees: string;
  timeMinted: string;
  videoURL?: string;
  createdAt: string;
  updatedAt: string;
  thumbnail: string;
  marketplace_listed?: string;
  snftId?: string;
};

export type NewMint = {
  postId: string;
  videoType: string;
  accountId: string;
  profileId: string;
  network: string;
  status: string;
  SNFTTitle: string;
  SNFTCollection: string;
  SNFTDescription: string;
  location: string;
  taggedPeople: string;
  genre: string;
  tags: string;
  live: string;
  payoutApproved: string;
  SNFTAddress: string;
  networkTxId: string;
  owner: string;
  gasFees: string;
  thumbnail: string;
};
