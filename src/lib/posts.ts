import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

// 获取 posts 文件夹的路径
const postsDirectory = path.join(process.cwd(), 'posts');

// 获取所有文章的 ID（即文件名，不包含扩展名）
export async function getAllPostIds() {
  const fileNames = await fs.readdir(postsDirectory);
  return fileNames
    .filter((file) => file.endsWith('.md')) // 仅匹配 Markdown 文件
    .map((fileName) => ({
      id: fileName.replace(/\.md$/, ''), // 去除文件扩展名
    }));
}

// 根据 ID 获取单篇文章的详细内容（包括元数据和 Markdown 内容）
export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`); // 拼接成完整路径
  const fileContents = await fs.readFile(fullPath, 'utf8'); // 读取文件内容

  // 使用 gray-matter 解析 Markdown 文件的头部元数据（如标题、日期等）
  const { data, content } = matter(fileContents);

  // 使用 marked 将 Markdown 转换为 HTML 内容
  const contentHtml = marked(content);

  // 返回文章的元数据和 HTML 内容
  return {
    id,
    title: data.title,
    date: data.date,
    contentHtml,
  };
}


