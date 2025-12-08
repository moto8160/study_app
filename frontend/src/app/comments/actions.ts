'use server';
import { authFetch } from '@/src/utils/authFetch';

export async function createComment(postId: string, formdata: FormData) {
  const content = formdata.get('content');
  const res = await authFetch(`/posts/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    const data = await res.json();
    return data.message ?? '投稿に失敗しました'; //??-null,undefinedの時
  }
  return 'success';
}
