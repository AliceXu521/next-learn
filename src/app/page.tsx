import { getAllPostIds, getPostData } from '@/lib/posts';
import Link from 'next/link';

export default async function Home() {
  // 获取所有文章 ID
  const postIds = await getAllPostIds();

  // 根据每个 ID 获取文章的详细信息
  const posts = await Promise.all(
    postIds.map(async ({ id }) => {
      const post = await getPostData(id);
      return {
        id,
        title: post.title,
        date: post.date,
      };
    })
  );

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">我的博客</h1>
      <ul>
        {posts.map(({ id, title, date }) => (
          <li key={id} className="mb-2">
            <Link href={`/posts/${id}`} className="text-blue-600 hover:underline">
              {title}
            </Link>
            <br />
            <small className="text-gray-500">{date}</small>
          </li>
        ))}
      </ul>
    </main>
  );
}



