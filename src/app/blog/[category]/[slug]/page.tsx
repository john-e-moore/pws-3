// app/blog/[category]/[slug]/page.tsx
import { getPostBySlug } from '@/lib/blog';

interface BlogPostPageProps {
  params: {
    category: string;
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { category, slug } = await params;
  const { meta, content } = await getPostBySlug(category, slug);

  return (
    <article>
      <h1>{meta.title}</h1>
      <p>{meta.date}</p>
      {/* If there's an image specified in frontmatter, show it */}
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
