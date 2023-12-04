/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "cdnjs.cloudflare.com",
      "tailwindui.com",
    ],
  },
  experimental: {},
};

module.exports = nextConfig;
