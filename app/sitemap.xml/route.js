import { buildIndex, XML_HEADERS } from '@/lib/sitemap.mjs';

// Sitemap index. Child sitemaps are served by app/sitemaps/[name]/route.js.
export const dynamic = 'force-dynamic';

export async function GET() {
  return new Response(buildIndex(), { headers: XML_HEADERS });
}
