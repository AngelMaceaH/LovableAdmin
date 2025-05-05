import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.16.15.6"],
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
