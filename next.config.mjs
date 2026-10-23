import path from "node:path";
import { fileURLToPath } from "node:url";

// Pin the project root to this folder, so a package-lock.json higher up
// (e.g. in your user folder) is never mistaken for the project root.
const root = path.dirname(fileURLToPath(import.meta.url));
const isStatic = process.env.STATIC_EXPORT === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: { root },
  outputFileTracingRoot: root,
  // Netlify (STATIC_EXPORT=true): every page is pre-rendered to plain HTML in /out.
  // Otherwise: a small self-contained Node server in .next/standalone (Dockerfile).
  output: isStatic ? "export" : "standalone",
  poweredByHeader: false,
  compress: true,
  images: {
    // Static hosting has no image server; photos are served as-is.
    unoptimized: isStatic,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: "https", hostname: "www.alo.bg", pathname: "/user_files/**" },
    ],
  },
  // Headers are set by the server build; on Netlify they live in netlify.toml.
  ...(isStatic ? {} : { headers }),
};

async function headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/products/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
}

export default nextConfig;
