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
};
