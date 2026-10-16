import { handlePath } from '@/lib/render.mjs';

// City/service pages. Only services listed in data/services.json render; legacy duplicates
// (aliases, city copies of global pages, generated neighborhoods, cross-city paths) 301 and
// anything else returns a genuine 404. See lib/routes.mjs.
export const dynamic = 'force-dynamic';

export async function GET(request) {
  return handlePath(request.nextUrl.pathname);
}
