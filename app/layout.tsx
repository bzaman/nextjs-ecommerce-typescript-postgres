import "@/app/globals.css";
import type { Metadata } from "next";
import { Open_Sans, Bebas_Neue } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";

const headingTypeface = Bebas_Neue({ weight: '400', subsets: ["latin"], variable: "--heading-typeface" });
const bodyTypeface = Open_Sans({ subsets: ["latin"], variable: "--body-typeface" });

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
      className={cn("h-full", "antialiased", bodyTypeface.variable, headingTypeface.variable)}
      suppressHydrationWarning
    >
      <body className="font-sans-serif min-h-svh text-base">
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
