import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import Credentials from "next-auth/providers/credentials";
import { encode } from "next-auth/jwt";
import { nanoid } from "nanoid";
import { db } from "~/server/db";
import { env } from "~/env";

const adapter = PrismaAdapter(db);

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

  interface User {
    // ...other properties
    bio?: string;
    loginCount?: number;
    region?: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    Credentials({
      id: "credentials",
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "joy" },
        passcode: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log({ req, from: "[credentials config]" });
        try {
          const { username, passcode } = credentials;
          const user = await db.user.findFirst({
            where: {
              username: username as string,
              passcode: passcode as string,
            },
          });

          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return user;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;
          }
        } catch (error) {
          throw new Error(error as string);
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
  trustHost: true,
  adapter: adapter,
  events: {
    /**
     * @note
     * This event is redundant, as the session is already deleted when the user signs out.
     * thanks to the Prisma adapter. However, it's been kept here for reference purposes
     * and learning.
     *
     */
    async signOut(message) {
      console.log({ message, from: "[signOut event]" });

      if ("session" in message && message.session?.sessionToken) {
        await db.session.deleteMany({
          where: {
            sessionToken: message.session?.sessionToken,
          },
        });
      }
    },
  },

  debug: env.NODE_ENV === "development",

  jwt: {
    maxAge: 1 * 24 * 60 * 60,
    async encode(arg) {
      return (arg.token?.sessionId as string) ?? encode(arg);
    },
  },

  callbacks: {

    /**
     *
     * @jwt callback
     * invoked when a user signs in or signs up, we can add a session token to the JWT payload.
     * This session token is used to identify the user's session when they make requests to the server.
     *
     * We also use the prisma adapter to persist the session to the database.
     * See @event for the signOut cleanup method.
     * @
     */
    async jwt({ token, user, account }) {
      if (account?.provider === "credentials") {
        const expires = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000);
        const sessionToken = nanoid(24);

        const session = await adapter.createSession!({
          userId: user.id!,
          sessionToken,
          expires,
        });

        token.sessionId = session.sessionToken;
      }

      return token;
    },

    /**
     *
     * This callback is invoked everything our app frontend makes a request to the server.
     * To retrieve a user session, we simply return back the user and their session token.
     * @returns User & Session
     */
    async session({ session, user, token }) {
      console.log({ session, token, user, from: "[session callback]" });
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
  },
} satisfies NextAuthConfig;
