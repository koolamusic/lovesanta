// import "~/styles/globals.css";

import { type Metadata } from "next";

import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { TRPCReactProvider } from "~/trpc/react";
import { Provider } from "~/components/ui/provider";
import { Bricolage_Grotesque } from "next/font/google";


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

  const session = await auth()

  console.log({ session })

  if (session) {
    redirect('/home')
  }

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
