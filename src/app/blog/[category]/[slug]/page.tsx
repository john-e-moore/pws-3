// src/app/blog/[category]/[slug]/page.tsx
import { getPostBySlug } from '@/lib/blog';

interface BlogPostPageProps {
  params: {
    category: string;
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // Await the params object before destructuring its properties
  const { category, slug } = await params;

  // Get the blog post content
  const { meta, content } = await getPostBySlug(category, slug);

  return (
    <article>
      <h1>{meta.title}</h1>
      <p>{meta.date}</p>
      {meta.image && (
        <img
          src={`/blog_posts/${meta.category}/${meta.image}`}
          alt={meta.title}
          className="post-image"
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}
