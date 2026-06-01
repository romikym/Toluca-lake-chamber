/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Keep Prisma + bcrypt out of the bundler so the engine resolves at runtime
  // (needed for serverless on Netlify / AWS Lambda).
  serverExternalPackages: ["@prisma/client", "prisma", "bcryptjs"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "static.wixstatic.com" },
    ],
  },
};

export default nextConfig;
