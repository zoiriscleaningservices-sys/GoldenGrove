/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/sitemap_index.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/sitemap_midland_priority.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

