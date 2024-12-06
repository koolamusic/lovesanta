import { auth } from "~/server/auth"
// export { auth as middleware } from "~/server/auth"

/** 
 * For advanced use cases, you can use auth as a wrapper for your Middleware:
 * @see https://authjs.dev/getting-started/migrating-to-v5#authenticating-server-side
//         */
export default auth((req) => {
      console.log("Middleware invoked", req.auth)
    })
    
    
    export const config = {
        matcher: [
            "/pairs",
            "/pairs/:path*",
            "/groups/:path*",
            // Optionally, don't invoke Middleware on some paths
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    // Add other protected routes
  ]
}