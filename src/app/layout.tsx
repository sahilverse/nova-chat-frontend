import type { Metadata } from "next";
import { Providers } from "./providers";
import ThemeWatcher from "@/components/ThemeWatcher";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nova Chat App",
  description: "A chat application built with Next.js and Express",

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('nova-theme');
                  const theme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'system';
                  const actualTheme = theme === 'system'
                    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
                    : theme;
                  document.documentElement.classList.add(actualTheme);
                } catch (_) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <Providers>
          <ThemeWatcher />

          {children}

          <Toaster
            position="top-right"
            toastOptions={{ duration: 3000 }}
          />
        </Providers>
      </body>
    </html>
  );
}
