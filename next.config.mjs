/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["kfzdev.s3.ap-south-1.amazonaws.com"],
    formats: ["image/webp"],
  },
};

export default nextConfig;
