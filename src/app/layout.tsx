// import "~/styles/globals.css";
import { Provider } from "~/components/ui/provider";

import { Bricolage_Grotesque } from "next/font/google";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Secret Santa App",
  description:
    "Share gifts, have fun, and make memories with your friends and family.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const bricolage = Bricolage_Grotesque({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${bricolage.className} `}
      suppressHydrationWarning
    >
      <body>
        <TRPCReactProvider>
          <Provider>{children}</Provider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
