export type GetRecentEventsResponse = {
  data: RecentEvents;
  code: number;
  responseTime: string;
};

export type RecentEvents = {
  eventTitle: string;
  eventImageBanner: string;
  updatedAt: string;
};
