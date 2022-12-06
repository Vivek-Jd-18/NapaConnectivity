export type CreateNewCommentResponse = {
  data: CommentResponse;
  code: number;
  responseTime: string;
};

export type CommentResponse = {
  commentId: string;
  commentText: string;
  postId: string;
  userId: string;
  userName: string;
  userImage: string;
  replies: string;
  likedByUsers: string;
  isReply: string;
  createdAt: string;
  updatedAt: string;
};

export type GetCommentsResponse = {
  data: CommentResponse;
  code: number;
  responseTime: string;
};

export type NewComment = {
  commentText: string;
  postId: string;
  userId: string;
  userName: string;
  userImage: string;
  replies: string;
  likedByUsers: string;
  isReply: string;
};
