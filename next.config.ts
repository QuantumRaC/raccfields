import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old URLs from the previous version of the site keep working.
  async redirects() {
    return [
      { source: "/dev/textanlys", destination: "/projects/writelike", permanent: true },
      { source: "/dev", destination: "/#projects", permanent: true },
      { source: "/security", destination: "/#experience", permanent: true },
      { source: "/art", destination: "/", permanent: false },
      { source: "/music", destination: "/", permanent: false },
      // Older links used front-matter slugs that never matched the file names.
      { source: "/blog/hardening-hobby-site", destination: "/blog/hardening-site", permanent: true },
      { source: "/blog/sqli-cheatsheet", destination: "/blog/sqli-cheat-sheet", permanent: true },
    ];
  },
};

export default nextConfig;
