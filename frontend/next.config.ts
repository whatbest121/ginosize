import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'media.istockphoto.com', // อนุญาตให้โหลดรูปจาก istockphoto
    ],
  },
};

export default nextConfig;
