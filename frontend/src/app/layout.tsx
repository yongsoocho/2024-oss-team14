import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import ReactQueryProviders from "@/lib/react-query";
import { ToastProvider, ToastViewport } from "@radix-ui/react-toast";
import SSRSafeSuspense from "@/components/SSRSafe";

export const metadata: Metadata = {
  title: "Cautry",
  description: "The error mornitoring solution with ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        style={{
          margin: 0,
          padding: 0,
          height: "100vh",
        }}
      >
        <ReactQueryProviders>
          <Theme>
            <div
              style={{
                maxWidth: "1920px",
                height: "100%",
                width: "100%",
                margin: 0,
                padding: 0,
              }}
            >
              {children}
            </div>
          </Theme>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
