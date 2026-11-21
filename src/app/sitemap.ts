import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work/rednote", "/work/geofm-stf", "/projects/writelike", "/blog"].map((p) => ({
    url: `${site.url}${p}`,
  }));
  const posts = getPosts().map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.date }));
  return [...pages, ...posts];
}
