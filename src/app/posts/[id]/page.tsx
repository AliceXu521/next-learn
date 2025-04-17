// src/app/posts/[id]/page.tsx

import { getAllPostIds, getPostData } from '@/lib/posts';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};

// ✅ 动态生成所有路径
export async function generateStaticParams() {
  const ids = await getAllPostIds();
  return ids.map((post) => ({
    id: post.id,  // 返回的是 id 字符串
  }));
}

// 详情页组件
export default async function PostPage({ params }: Props) {
  const post = await getPostData(params.id);

  if (!post) {
    notFound();
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <div className="text-gray-500 text-sm mb-4">{post.date}</div>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </main>
  );
}


