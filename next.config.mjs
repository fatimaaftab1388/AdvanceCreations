/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "advancecreationspvtltd.com" }],
        destination: "https://www.advancecreationspvtltd.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
