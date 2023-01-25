export type UsersCountResponse = {
  weeklyCount: string;
  monthlyCount: string;
  totalCount: string;
};

export type GetUsersCountResponse = {
  data: UsersCountResponse;
  code: number;
  responseTime: string;
};

export type UsersCount = {
  weeklyActiveUsers: string;
  monthlyActiveUsers: string;
  totalUsers: string;
};
