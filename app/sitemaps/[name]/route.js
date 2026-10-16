import { buildUrlset, XML_HEADERS } from '@/lib/sitemap.mjs';

// Child sitemaps: /sitemaps/pages.xml, /sitemaps/cities.xml, /sitemaps/city-services.xml
export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const { name } = await params;
  const xml = name.endsWith('.xml') ? buildUrlset(name.slice(0, -4)) : null;
  if (!xml) return new Response('Not Found', { status: 404, headers: { 'Content-Type': 'text/plain' } });
  return new Response(xml, { headers: XML_HEADERS });
}
