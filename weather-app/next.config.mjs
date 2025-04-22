/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['openweathermap.org'],
  },
  output: 'export',
  distDir: 'docs',
};

export default nextConfig;
