import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* React Compiler */
  reactCompiler: true,

  /* Turbopack Configuration */
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
