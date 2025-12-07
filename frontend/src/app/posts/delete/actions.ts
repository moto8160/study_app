'use server';
import { authFetch } from '@/src/utils/authFetch';

export async function deletePost(id: string) {
  await authFetch(`/posts/${id}`, { method: 'DELETE' });
}
