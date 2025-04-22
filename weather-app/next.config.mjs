// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'docs',
  basePath: '/St-Weather-App',
  images: {
    unoptimized: true,
    domains: ['openweathermap.org'],
  },
};

export default nextConfig;
