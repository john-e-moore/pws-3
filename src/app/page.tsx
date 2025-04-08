// app/page.tsx
import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <>
      {posts.map((post) => (
        <div key={`${post.category}-${post.slug}`}>
          <p>{post.date}</p>
          <Link href={`/blog/${post.category}/${post.slug}`}>
            {post.title}
          </Link>
        </div>
      ))}
    </>
  );
}
