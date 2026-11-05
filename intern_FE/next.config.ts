import type { NextConfig } from "next";

/**
 * Where the NestJS API lives, as seen from the Next server. Uploaded images are
 * served by the API at <API>/uploads/..., and are proxied through this app
 * (see `rewrites`) so that they are same-origin for next/image. The Next 16
 * image optimizer refuses remote hosts that resolve to localhost / private
 * IPs, which is exactly what a local or same-server API is.
 */
const API_URL = (process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000").replace(/\/$/, "");

function apiRemotePattern() {
  try {
    const url = new URL(API_URL);
    return {
      protocol: url.protocol.replace(":", "") as "http" | "https",
      hostname: url.hostname,
      port: url.port || undefined,
      pathname: "/uploads/**",
    };
  } catch {
    return { protocol: "http" as const, hostname: "localhost", port: "3000", pathname: "/uploads/**" };
  }
}

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Still allowed for absolute API URLs stored in the database (e.g. after a
    // domain change); relative /uploads/... paths go through the rewrite below.
    remotePatterns: [apiRemotePattern()],
  },
  async rewrites() {
    return [{ source: "/uploads/:path*", destination: `${API_URL}/uploads/:path*` }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
