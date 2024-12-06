import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "joy" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        // You need to provide your own logic here that takes the credentials
        // submitted and returns either an object representing a user or value

        const user = await db.user.findFirst({
          where: {
            username: (credentials as { username: string; password: string })
              .username,
            passcode: (credentials as { username: string; password: string })
              .password,
          },
        });

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          // return null

          throw new Error("please check your username or passcode");
        }
      },
    }),
    DiscordProvider,
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
} satisfies NextAuthConfig;

// ...
// providers: [
//   CredentialsProvider({
//     // The name to display on the sign in form (e.g. 'Sign in with...')
//     name: 'Credentials',
//     // The credentials is used to generate a suitable form on the sign in page.
//     // You can specify whatever fields you are expecting to be submitted.
//     // e.g. domain, username, password, 2FA token, etc.
//     // You can pass any HTML attribute to the <input> tag through the object.
//     credentials: {
//       username: { label: "Username", type: "text", placeholder: "jsmith" },
//       password: { label: "Password", type: "password" }
//     },
//     async authorize(credentials, req) {
//       // You need to provide your own logic here that takes the credentials
//       // submitted and returns either a object representing a user or value
//       // that is false/null if the credentials are invalid.
//       // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
//       // You can also use the `req` object to obtain additional parameters
//       // (i.e., the request IP address)
//       const res = await fetch("/your/endpoint", {
//         method: 'POST',
//         body: JSON.stringify(credentials),
//         headers: { "Content-Type": "application/json" }
//       })
//       const user = await res.json()

//       // If no error and we have user data, return it
//       if (res.ok && user) {
//         return user
//       }
//       // Return null if user data could not be retrieved
//       return null
//     }
//   })
// ]
// ...
