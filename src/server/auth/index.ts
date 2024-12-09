import NextAuth from "next-auth";

import { authConfig } from "./config";

const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth(authConfig);

// const auth = cache(uncachedAuth);

export { uncachedAuth as auth, handlers, signIn, signOut };
