export default function robots() {
  return {
    rules: {
      userAgent: "*",
      disallow: ["/admin", "/admin/*"],
    },
    sitemap: "https://example.com/sitemap.xml",
  };
}
