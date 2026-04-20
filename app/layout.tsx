import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/layout/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
import { APP_NAME, APP_DESC, SERVER_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    template: `%s | VANTAGE STORE`,
    default: APP_NAME,
  },
  description: APP_DESC,
  metadataBase: new URL(SERVER_URL),
  authors: [
    {
      name: "Badiuzzaman",
      url: "https://www.upwork.com/freelancers/~01dc1a347430f5ff7c",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", inter.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
