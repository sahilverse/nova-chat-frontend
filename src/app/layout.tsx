import type { Metadata } from "next";
import { Providers } from "./providers";
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
    <html lang="en">
      <body>
        <Providers>
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
