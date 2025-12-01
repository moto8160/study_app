import Link from 'next/link';
import { Post } from '@/src/types/Post';
import Message from '@/src/components/message';

export default async function PostsPage() {
  const res = await fetch('http://localhost:4000/posts', {
    cache: 'no-store', // 常に最新を取得
  });
  const posts: Post[] = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-6 ">
      <Message />

      <h1 className="text-3xl text-center font-bold mb-6">投稿一覧</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href={`/posts/${post.id}`}
              className="block bg-white p-4 rounded-xl shadow hover:shadow-xl transition"
            >
              <h2 className="text-sm text-gray-600 mb-1">{post.user.name}</h2>
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-700 mb-5">{post.content}</p>
              <div className="flex gap-5 text-sm text-gray-600">
                <span>📅 {new Date(post.date).toLocaleDateString('ja-JP')}</span>
                <span>⏱ {post.studyTime} 時間</span>
              </div>
              <p className="text-xs text-gray-400 text-right">
                更新: {new Date(post.updatedAt).toLocaleDateString('ja-JP')}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
