'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type Post = {
  id: number;
  title: string;
  content: string;
  date: string; // DateTimeは JSON で文字列になる
  studyTime: number;
  updatedAt: string;
  user: { name: string };
};

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const searchParams = useSearchParams();
  const success = searchParams.get('success');

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('http://localhost:4000/posts');
      const data = await res.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);
  return (
    <div className="max-w-4xl mx-auto p-6 ">
      {success && <p style={{ color: 'green' }}>新規の投稿したよ！</p>}
      <h1 className="text-3xl font-bold mb-6">Posts</h1>

      <ul className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.id}
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
        ))}
      </ul>
    </div>
  );
}
