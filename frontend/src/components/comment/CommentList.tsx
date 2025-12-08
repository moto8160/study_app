import { Comment } from '@/src/types/comment';
import CommentItem from './CommentItem';

type Props = { comments: Comment[] };

export default function CommentList({ comments }: Props) {
  if (comments.length === 0) {
    return <p className="text-center text-gray-500">コメントがありません</p>;
  }

  return (
    <div className="space-y-2">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
