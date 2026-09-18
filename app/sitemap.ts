import { MetadataRoute } from 'next';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await dbConnect();
  const posts = await Blog.find({ published: true }).select('slug updatedAt').lean();

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post: any) => ({
    url: `https://samirrain.com.np/blog/${post.slug}`,
    lastModified: post.updatedAt || new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    {
      url: 'https://samirrain.com.np',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://samirrain.com.np/projects',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://samirrain.com.np/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://samirrain.com.np/privacy',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...blogRoutes,
  ];
}
