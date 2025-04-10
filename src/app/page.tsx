import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <>
      {posts.map((post) => (
        <div key={`${post.category}-${post.slug}`}>
          <h3 className="post-date">{post.date}</h3>
          <Link href={`/blog/${post.category}/${post.slug}`}>
            <div className="post-preview">
              {post.image && (
                <img
                  src={`/blog_posts/${post.category}/${post.image}`}
                  alt={post.title}
                  className="post-preview-image"
                />
              )}
              <h2 className="post-title">{post.title}</h2>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}
