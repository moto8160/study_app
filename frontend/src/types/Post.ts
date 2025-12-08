export type Post = {
  id: number;
  userId: number;
  title: string;
  content: string;
  date: string; // DateTimeは JSON で文字列になる
  studyTime: number;
  createdAt: string;
  updatedAt: string;
};

export type PostList = {
  id: number;
  userId: number;
  title: string;
  content: string;
  date: string;
  studyTime: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
  }
};

export type PostDetail = PostList & {
  user: {
    id: number;
    name: string;
  };
  comments: {
    id: number;
    postId: number;
    userId: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    user: {
      id: number;
      name: string;
    };
  }[];
};
