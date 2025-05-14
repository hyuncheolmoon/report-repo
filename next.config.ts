import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/survey',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
