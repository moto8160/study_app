'use server';
import { authFetch } from '@/src/utils/authFetch';

export async function updatePost(formData: FormData) {
  // フォームデータの取り出し
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const studyTime = Number(formData.get('studyTime'));
  const date = formData.get('date') as string;

  const res = await authFetch(`/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, content, studyTime, date }),
  });

  if (!res.ok) {
    const data = await res.json();
    return data.message.join('、');
  }

  return 'success';
}
