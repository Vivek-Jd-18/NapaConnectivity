export type CreateNewPostResponse = {
  data: Post;
  code: number;
  responseTime: string;
};

export type GetPostsResponse = {
  data: Post;
  code: number;
  responseTime: string;
};

export type NewPost = {
  videoTitle: string;
  videoFile: string | ArrayBuffer | null;
  videoType: string;
  videoCaption: string;
  accountId: string;
  minted: string;
  userName: string;
  userImage: string;
};

export type Post = {
  postId: string;
  videoTitle: string;
  videoFile: string | ArrayBuffer | null;
  videoType: string;
  videoCaption: string;
  accountId: string;
  minted: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
  userImage: string;
};

export type activePost = {
  postId: string;
  type: string;
};
