import { getPostBySlug } from '@/lib/blog';
import Link from 'next/link';

interface BlogPostPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { category, slug } = await params;
  const { meta, content } = await getPostBySlug(category, slug);
  return (
    <article>
      <h1>{meta.title}</h1>
      <p
        className="post-date"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>{meta.date}</span>
        <Link href="/">see all posts</Link>
      </p>
      {meta.image && (
        <img
          src={`/blog_posts/${meta.category}/${meta.image}`}
          alt={meta.title}
          className="post-image"
        />
      )}
      {/* Wrap the markdown-generated HTML */}
      <div className="post-content" dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}