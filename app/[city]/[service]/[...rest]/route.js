import { handlePath } from '@/lib/render.mjs';

// Legacy deep URLs from the static site (e.g. /austin-tx/barton-creek-tx/deep-cleaning/).
// These 301 to their modern equivalent or return 404 (see resolvePath in lib/routes.mjs).
export const dynamic = 'force-dynamic';

export async function GET(request) {
  return handlePath(request.nextUrl.pathname);
}
