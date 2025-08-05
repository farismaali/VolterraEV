import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true,  // Disable ESLint errors during build
    },
    typescript: {
        ignoreBuildErrors: true,   // Skip TypeScript errors during build
    },
};

export default nextConfig;
