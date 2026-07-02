import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow LAN access during dev (e.g. http://192.168.x.x:3000) without blocking _next assets.
  allowedDevOrigins: ["192.168.1.51"],
  async redirects() {
    return [
      // Client deliverable route renamed to /deliverables/the-sanctuary-jam.
      // Any earlier link shared with the client keeps working.
      {
        source: "/deliverables/sanctuary",
        destination: "/deliverables/the-sanctuary-jam",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
