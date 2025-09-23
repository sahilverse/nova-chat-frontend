import type { Metadata } from "next";
import { Providers } from "./providers";
import ThemeWatcher from "@/components/ThemeWatcher";
import { Toaster } from "sonner";
import { cookies } from "next/headers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nova Chat App",
  description: "A chat application built with Next.js and Express",

};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const cookieStore = await cookies();
  const token = !!cookieStore.get("refresh_token")?.value;

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
                } catch (_) {
                  document.documentElement.classList.add('light');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <Providers token={token}>
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
