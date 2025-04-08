// lib/blog.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const BLOG_POSTS_DIR = path.join(process.cwd(), 'public', 'blog_posts');

export interface PostMetaData {
  title: string;
  date: string;
  category: string;
  slug: string;
  image?: string; // optional
}

export interface Post {
  meta: PostMetaData;
  content: string; // HTML content
}

/**
 * Returns all blog posts' metadata
 */
export async function getAllPosts(): Promise<PostMetaData[]> {
  const categories = fs.readdirSync(BLOG_POSTS_DIR);
  const allPosts: PostMetaData[] = [];

  for (const category of categories) {
    const categoryPath = path.join(BLOG_POSTS_DIR, category);
    // Ensure it's a directory
    if (!fs.lstatSync(categoryPath).isDirectory()) {
      continue;
    }
    // Read all .md files in this category
    const files = fs.readdirSync(categoryPath).filter((file) => file.endsWith('.md'));

    for (const file of files) {
      const slug = file.replace(/\.md$/, '');
      const filePath = path.join(categoryPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContents);

      // Build metadata
      allPosts.push({
        title: data.title ?? slug,
        date: data.date ?? '',
        category,
        slug,
        image: data.image ?? undefined,
      });
    }
  }

  // Sort by date descending
  allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));

  return allPosts;
}

/**
 * Returns the full content (as HTML) plus metadata for a single post
 */
export async function getPostBySlug(category: string, slug: string): Promise<Post> {
  const filePath = path.join(BLOG_POSTS_DIR, category, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found: ${category}/${slug}`);
  }

  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContents);

  // Convert markdown to HTML
  const processedContent = await remark().use(html).process(content);
  const htmlContent = processedContent.toString();

  return {
    meta: {
      title: data.title ?? slug,
      date: data.date ?? '',
      category,
      slug,
      image: data.image ?? undefined,
    },
    content: htmlContent,
  };
}
