'use client';
import { deletePost } from '@/src/app/posts/delete/actions';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const ok = confirm('投稿を削除しますか？');
    if (!ok) return;

    // serverから直接cookies()使えないから関数を経由
    await deletePost(id);
    router.replace('/posts?status=success&type=post&action=delete');
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-black text-white px-4 py-2 rounded-md font-semibold hover:shadow-xl transition"
    >
      削除
    </button>
  );
}
