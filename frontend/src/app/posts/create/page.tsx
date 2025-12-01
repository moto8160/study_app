'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatePostPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [studyTime, setStudyTime] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [message, setMessage] = useState('');

  // フォーム送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // HTTPリクエスト送信
      const res = await fetch('http://localhost:4000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, //JSON指定
        //js-JSON.stringify: オブジェクトをJSONに変換
        body: JSON.stringify({
          title,
          content,
          studyTime: Number(studyTime),
          date, // "2025-11-30" 形式で送られる
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setMessage(data.message.join('、'));
        return;
      }

      router.push('/posts?status=success&action=post');
    } catch (error) {
      console.error(error);
      setMessage('通信エラーかも・・・');
    }
  };

  // 画面表示
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl text-center font-bold mb-6">新規投稿</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトル"
          className="w-full p-2 border rounded-md"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="内容"
          className="w-full p-2 border rounded-md h-24"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded-md"
        />

        <input
          type="number"
          step="0.5"
          min="0.5"
          value={studyTime}
          onChange={(e) => setStudyTime(e.target.value)}
          placeholder="勉強時間（h）"
          className="w-full p-2 border rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded-md font-semibold hover:shadow-xl transition"
        >
          投稿する
        </button>

        {message && <p className="text-center text-red-500 font-semibold">{message}</p>}
      </form>
    </div>
  );
}

//コンポーネントで分けるよ
