import { handlePath } from '@/lib/render.mjs';

// Core pages, service hubs, and city hubs. Resolution, redirects, and 404s live in lib/routes.mjs.
export const dynamic = 'force-dynamic';

export async function GET(request) {
  return handlePath(request.nextUrl.pathname);
}
