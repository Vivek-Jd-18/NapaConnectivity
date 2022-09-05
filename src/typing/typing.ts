export enum NapaLoungeTab {
  TIPS_AND_TUTORIALS = 'TIPS_AND_TUTORIALS',
  CO_BATCHING_POOLS = 'CO_BATCHING_POOLS',
  UPCOMING_NFT_PROJECTS = 'UPCOMING_NFT_PROJECTS',
  EVENTS = 'EVENTS',
  ACTIVE_MINTED_POSTS = 'ACTIVE_MINTED_POSTS',
  EARNED_NAPA_TOKENS = 'EARNED_NAPA_TOKENS',
}

export type Options = {
  name: string;
  value: string;
};

export type ProfileDetails = {
  napa_profile_id: string;
  profile_name: string;
  primary_currency: string;
  metamask_wallet_account_number: string;
  language: string;
  Timezone: string;
  NAPA_social_media_account_email: string;
  Bio: string;
  created_at: string;
  updated_at: string;
};
