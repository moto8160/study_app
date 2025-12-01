export type PostsResponse = {
  id: number;
  title: string;
  content: string;
  date: Date;
  studyTime: number;
  updatedAt: Date;
  user: {
    name: string;
  };
};
