export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://hn-news-two.vercel.app/sitemap.xml",
  };
}
