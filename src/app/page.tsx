import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';

export default function Home() {
  const posts = getSortedPostsData();

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


