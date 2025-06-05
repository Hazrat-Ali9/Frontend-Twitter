export type TUser = {
  _id: string;
  name: string;
  email: string;
  username: string;
  role: string;
  profileImg: string;
  status: string;
  isDeleted: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TPost = {
  _id: string;
  postText: string;
  postPhoto: string;
  userId: TUser;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TComment = {
  _id: string;
  commentText: string;
  postId: TPost;
  userId: TUser;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
