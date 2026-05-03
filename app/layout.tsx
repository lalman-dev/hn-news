//@ts-ignore
import "./globals.css";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "next-themes";
import Providers from "./providers";

export const metadata = {
  title: { default: "Hacker News Portal", template: "%s | HN Portal" },
  description:
    "A fast and modern Hacker News Portal built with Next.js App Router.",
  keywords: [
    "Hacker News",
    "Next.js",
    "React",
    "Tech News",
    "Frontend Project",
  ],
  authors: [{ name: "Lalman" }],
  openGraph: {
    title: "Hacker News Portal",
    description:
      "Read the latest tech stories with a blazing fast Next.js Hacker News Portal.",
    url: "https://hn-news-two.vercel.app",
    siteName: "Hacker News Portal",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hacker News Portal",
    description:
      "Blazing fast Hacker News Portal built with Next.js App Router.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="top-bar" />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
