import { handlePath } from '@/lib/render.mjs';

// Rendered on demand from templates; responses are CDN-cached via Cache-Control (see lib/render.mjs).
export const dynamic = 'force-dynamic';

export async function GET() {
  return handlePath('/');
}
