import type { Metadata } from "next";
import { Provider } from "react-redux";
import { store } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import "./globals.css";


export const metadata: Metadata = {
  title: "Nova Chat App",
  description: "A chat application built with Next.js and Express.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <QueryClientProvider client={new QueryClient()}>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
              }}
            />
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  );
}
