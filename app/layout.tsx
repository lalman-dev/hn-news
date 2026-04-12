//@ts-ignore
import "./globals.css";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "next-themes";
import Providers from "./providers";

export const metadata = {
  title: {
    default: "Hacker News Portal",
    template: "%s | Lalman",
  },
  description:
    "A fast and modern Hacker News Portal built with Next.js App Router, featuring SSR, real-time updates, and clean UI.",

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
    title: "Hacker News Portal",
    description:
      "Blazing fast Hacker News Portal built with Next.js App Router.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 min-h-screen bg-linear-to-br from-slate-50 via-purple-300 to-indigo-400 dark:from-slate-950 dark:via-gray-800 dark:to-gray-950">
        <div className="absolute inset-0 bg-pink-200/20 dark:bg-pink-500/10 blur-3xl pointer-events-none" />
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
