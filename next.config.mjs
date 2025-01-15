/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.techtoniclabs.id",
        pathname: "/*",
      },
    ],
  },
};

export default nextConfig;
