/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Keep Prisma + bcrypt out of the bundler so the engine resolves at runtime
  // (needed for serverless on Netlify / AWS Lambda).
  serverExternalPackages: ["@prisma/client", "prisma", "bcryptjs"],
  // Force the Prisma query engine (a .node binary loaded dynamically, so file
  // tracing misses it) into the serverless function bundle on Netlify.
  outputFileTracingIncludes: {
    "/**": [
      "./node_modules/.prisma/client/**/*",
      "./node_modules/@prisma/client/**/*",
    ],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "static.wixstatic.com" },
    ],
  },
};

export default nextConfig;
