'use client';

import { useSearchParams } from 'next/navigation';

export default function Message() {
  const searchParams = useSearchParams(); //クエリ文字列を取得
  // パラメータを取得
  const status = searchParams.get('status');
  const action = searchParams.get('action');

  if (!status || !action) return null;

  let classes = 'p-3 rounded font-medium mb-4';
  let message = '';

  if (status === 'success') {
    classes += ' bg-green-100 ';
    if (action === 'post') {
      message = '新規投稿しました！';
    }
  }

  if (status === 'error') {
    classes += ' bg-red-100 text-red-600';
  }

  return <p className={classes}>{message}</p>;
}
