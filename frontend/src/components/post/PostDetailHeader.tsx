import { PostDetail, PostList } from '@/src/types/post';
import { formatDateTime } from '@/src/utils/formatDate';
import Link from 'next/link';
import DeleteButton from './DeleteButton';

type Props = {
  post: PostDetail;
  currentUserId: number;
};

export default function PostDetailHeader({ post, currentUserId }: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <Link href={`/users/${post.user.id}`} className="hover:underline transition">
        <h2 className="text-sm mb-1">{post.user.name}</h2>
      </Link>
      <h2 className="text-xl font-medium mb-2">{post.title}</h2>
      <p className="text-gray-700 mb-5">{post.content}</p>
      <div className="flex gap-5 text-sm text-gray-600 mb-3">
        <span>📅 {new Date(post.date).toLocaleDateString('ja-JP')}</span>
        <span>⏱ {post.studyTime} 時間</span>
      </div>
      <div className="flex justify-between items-center">
        <span>💬 {post.comments.length}</span>
        <span className="text-xs text-gray-400">
          投稿： {formatDateTime(post.updatedAt)}
        </span>
      </div>

      {post.user.id === currentUserId && (
        <div className="flex gap-3">
          <Link
            href={`/posts/${post.id}/edit`}
            className="bg-black text-white px-4 py-2 rounded-md font-semibold hover:shadow-xl transition"
          >
            編集
          </Link>
          <DeleteButton id={String(post.id)} />
        </div>
      )}
    </div>
  );
}
