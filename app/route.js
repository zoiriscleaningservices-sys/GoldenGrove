import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 86400; // 24 hours ISR cache on Vercel Edge

const FAILSAFE_CSS = `
    <style id="zero-blank-screen">
        [data-aos], 
        html.aos-init [data-aos],
        html.aos-init [data-aos]:not(.aos-animate),
        [data-aos^=fade], [data-aos^=zoom], [data-aos^=slide], [data-aos^=flip],
        [data-aos^=fade][data-aos^=fade], [data-aos^=zoom][data-aos^=zoom], [data-aos^=slide][data-aos^=slide],
        html [data-aos], body [data-aos] {
            opacity: 1 !important;
            transform: none !important;
            visibility: visible !important;
            filter: none !important;
        }
    </style>
`;

const FAVICON_HTML = `
    <!-- Favicon & App Icons -->
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-chrome-192x192.png">
    <link rel="icon" type="image/png" sizes="512x512" href="/favicon/android-chrome-512x512.png">
    <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico">
    <link rel="shortcut icon" type="image/x-icon" href="/favicon/favicon.ico">
    <link rel="manifest" href="/favicon/site.webmanifest">
`;

function ensureFailsafe(html) {
  let res = html;
  // Eliminate any CSS rule that sets opacity: 0 on aos-init
  res = res.replace(/html\.aos-init\s+\[data-aos\]\s*\{[^}]*opacity:\s*0[^}]*\}/gi, 'html.aos-init [data-aos] { opacity: 1 !important; }');
  
  if (!res.includes('id="zero-blank-screen"')) {
    if (res.includes('</head>')) {
      res = res.replace('</head>', `${FAILSAFE_CSS}</head>`);
    } else {
      res = `${FAILSAFE_CSS}${res}`;
    }
  }

  // Ensure favicon on every page
  res = res.replace(/<link[^>]*rel=["'](?:apple-touch-icon|icon|shortcut icon|manifest)["'][^>]*>\s*/gi, '');
  if (res.includes('</head>')) {
    res = res.replace('</head>', `${FAVICON_HTML}\n</head>`);
  } else if (res.includes('<head>')) {
    res = res.replace('<head>', `<head>\n${FAVICON_HTML}`);
  }

  const safetyScript = `<script>
    document.addEventListener('DOMContentLoaded', function() {
      document.querySelectorAll('[data-aos]').forEach(function(el) {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
        el.style.transform = 'none';
      });
    });
  </script>`;
  if (res.includes('</body>')) {
    res = res.replace('</body>', `${safetyScript}</body>`);
  }

  return res;
}

export async function GET() {
  const filePath = path.join(process.cwd(), 'templates', 'index.html');
  const rawHtml = fs.readFileSync(filePath, 'utf-8');
  const html = ensureFailsafe(rawHtml);

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
