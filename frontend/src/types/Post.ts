export type Post = {
  id: number;
  title: string;
  content: string;
  date: string; // DateTimeは JSON で文字列になる
  studyTime: number;
  updatedAt: string;
  user: { name: string };
};
