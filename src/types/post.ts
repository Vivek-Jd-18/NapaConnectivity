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
    videoFile: string;
    videoType: string;
    videoCaption: string;
    accountId: string;
    minted: string
  }

  export type Post = {
    postId: string;
    videoFile: string;
    videoType: string;
    videoCaption: string;
    accountID: string,
    minted: string;
    createdAt: string;
    updatedAt: string; 
  }