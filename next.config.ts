import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      hostname: "developer.accuweather.com"
    }]
  }
};

export default nextConfig;
