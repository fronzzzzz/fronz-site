import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow LAN access during dev (e.g. http://192.168.x.x:3000) without blocking _next assets.
  allowedDevOrigins: ["192.168.1.51"],
};

export default nextConfig;
