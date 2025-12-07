'use server';
import { authFetch } from '@/src/utils/authFetch';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const studyTime = Number(formData.get('studyTime'));
  const date = formData.get('date') as string;

  const res = await authFetch('/posts', {
    method: 'POST',
    body: JSON.stringify({ title, content, studyTime, date }), //js-JSON.stringify: オブジェクトをJSONに変換
  });

  if (!res.ok) {
    const data = await res.json();
    return data.message.join('、');
  }

  return 'success';
}
