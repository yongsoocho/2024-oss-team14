/**
 * @type {import('next').NextConfig}
 * */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    domains: ["i.postimg.cc"],
    unoptimized: true,
  },
};

export default nextConfig;
