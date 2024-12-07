import { type Metadata } from "next";

import { auth } from "~/server/auth";
import { TRPCReactProvider } from "~/trpc/react";
import { Provider } from "~/components/ui/provider";
import { Bricolage_Grotesque } from "next/font/google";
import { SessionProvider } from "next-auth/react";

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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${bricolage.className} `}
      suppressHydrationWarning
    >
      <body>
        <TRPCReactProvider>
          <SessionProvider session={session}>
            <Provider>{children}</Provider>
          </SessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
