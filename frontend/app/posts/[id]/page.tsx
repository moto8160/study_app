export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await fetch(`http://localhost:4000/posts/${id}`);
  const post = await res.json();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-lg">{post.content}</p>
      </div>
    </div>
  );
}
