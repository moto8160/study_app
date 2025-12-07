import DeleteButton from '@/src/components/post/DeleteButton';
import { PostDetail } from '@/src/types/post';
import { formatDateTime } from '@/src/utils/formatDate';
import { getCurrentUserId } from '@/src/utils/getCurrentUserId';
import Link from 'next/link';

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const currentUserId = await getCurrentUserId();

  const res = await fetch(`http://localhost:4000/posts/${id}`);
  const post: PostDetail = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-6 ">
      <h1 className="text-3xl text-center font-bold mb-6">投稿詳細</h1>

      <div className="bg-white p-4 rounded-xl shadow">
        <Link href={`/users/${post.user.id}`} className="hover:underline transition">
          <h2 className="mb-1">{post.user.name}</h2>
        </Link>
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-700 mb-5">{post.content}</p>

        <div className="flex gap-5 text-sm text-gray-600">
          <span>📅 {new Date(post.date).toLocaleDateString('ja-JP')}</span>
          <span>⏱ {post.studyTime} 時間</span>
        </div>

        <p className="text-xs text-right">更新: {formatDateTime(post.updatedAt)}</p>
      </div>

      {post.user.id === currentUserId && (
        <div className="mt-3 ml-3 flex gap-3">
          <Link
            href={`/posts/${post.id}/edit`}
            className="bg-black text-white px-4 py-2 rounded-md font-semibold hover:shadow-xl transition"
          >
            編集
          </Link>
          <DeleteButton id={String(post.id)} />
        </div>
      )}

      <h1 className="text-2xl text-center font-bold py-5">コメント</h1>
      <form
        // action={(formData) => createComment(String(post.id), formData)}
        className="my-5 space-y-3"
      >
        <textarea
          name="content"
          placeholder="コメントを入力"
          className="w-full border rounded-lg p-2"
          required
        ></textarea>

        <button className="bg-black text-white px-4 py-2 rounded-md hover:opacity-80 transition">
          コメント投稿
        </button>
      </form>

      {post.comments.length > 0 ? (
        <div className="space-y-2">
          {post.comments.map((comment) => (
            <div key={comment.id} className="bg-white p-4 rounded-xl shadow">
              <Link href={`/users/${post.user.id}`} className="hover:underline transition">
                <div className="font-bold mb-1">{comment.user.name}</div>
              </Link>
              <div>{comment.content}</div>
              <p className="text-xs text-right">{formatDateTime(comment.createdAt)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">コメントがありません</p>
      )}
    </div>
  );
}
