'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatePostPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [studyTime, setStudyTime] = useState('');
  const [date, setDate] = useState('');
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
        setMessage('登録失敗><');
        return;
      }

      router.push('/posts?success=true');

    } catch (error) {
      console.error(error);
      setMessage('通信エラーかも・・・');
    }
  };

  // 画面表示
  return (
    // ボタン→ハンドルサブミット呼出し
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title" />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="content"
      />

      <input
        type="number"
        value={studyTime}
        onChange={(e) => setStudyTime(e.target.value)}
        placeholder="Study Time (min)"
      />

      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

      <button type="submit">Send</button>

      {message && <p>{message}</p>}
    </form>
  );
}
