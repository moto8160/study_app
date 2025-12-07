export type PostList = {
  id: number;
  userId: number;
  title: string;
  content: string;
  date: Date;
  studyTime: number;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
    name: string;
  };
};

export type PostDetail = PostList & {
  comments: {
    id: number;
    postId: number;
    userId: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    user: {
      id: number;
      name: string;
    };
  }[];
};
