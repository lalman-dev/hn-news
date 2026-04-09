//@ts-ignore
import "./globals.css";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "next-themes";
import Providers from "./providers";

export const metadata = {
  title: {
    default: "Hacker News Clone",
    template: "%s | Lalman",
  },
  description:
    "A fast and modern Hacker News clone built with Next.js App Router, featuring SSR, real-time updates, and clean UI.",

  keywords: [
    "Hacker News",
    "Next.js",
    "React",
    "Tech News",
    "Frontend Project",
  ],

  authors: [{ name: "Lalman" }],

  openGraph: {
    title: "Hacker News Clone",
    description:
      "Read the latest tech stories with a blazing fast Next.js Hacker News clone.",
    url: "https://hn-news-two.vercel.app",
    siteName: "Hacker News Clone",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Hacker News Clone",
    description:
      "Blazing fast Hacker News clone built with Next.js App Router.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
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
