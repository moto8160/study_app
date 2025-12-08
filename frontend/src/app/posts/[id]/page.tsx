import { PostDetail } from '@/src/types/post';
import { getCurrentUserId } from '@/src/utils/getCurrentUserId';
import PostDetailHeader from '@/src/components/post/PostDetailHeader';
import CommentForm from '@/src/components/comment/CommentForm';
import CommentList from '@/src/components/comment/CommentList';

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const currentUserId = await getCurrentUserId();

  const res = await fetch(`http://localhost:4000/posts/${id}`);
  const post: PostDetail = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-6 ">
      <PostDetailHeader post={post} currentUserId={currentUserId ?? 0} />
      <h2 className="text-lg font-medium mb-4 border-b pb-1 mt-5">コメント</h2>
      <CommentForm postId={post.id} />
      <CommentList comments={post.comments} />
    </div>
  );
}
