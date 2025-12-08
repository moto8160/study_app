import { PostList } from "@/src/types/post";
import { formatDateTime } from "@/src/utils/formatDate";
import Link from "next/link";

type Props = {
  post: PostList;
};

export default function PostCard({ post }: Props) {
  return (
    <Link
      href={`/posts/${post.id}`}
      className="block bg-white p-4 rounded-xl shadow hover:shadow-xl transition"
    >
      <h2 className="text-sm mb-1">{post.user.name}</h2>
      <h2 className="text-xl font-medium mb-2">{post.title}</h2>
      <p className="text-gray-700 mb-5">{post.content}</p>
      <div className="flex gap-5 text-sm text-gray-600">
        <span>📅 {new Date(post.date).toLocaleDateString('ja-JP')}</span>
        <span>⏱ {post.studyTime} 時間</span>
      </div>
      <p className="text-xs text-gray-400 text-right">投稿： {formatDateTime(post.updatedAt)}</p>
    </Link>
  );
}