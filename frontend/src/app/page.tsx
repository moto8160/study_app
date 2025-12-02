import { redirect } from "next/navigation";

// ホームディレクトリを設定
export default function Home() {
  redirect('/posts');
}
