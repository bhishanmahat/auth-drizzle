import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
  },
//   callbacks : {
//       async authorized({ auth, request: { nextUrl } }) {
//         const isLoggedIn = !!auth?.user;
//         const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//         const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//         const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    
//         if (isApiAuthRoute) {
//           return true;
//         }
    
//         if (isAuthRoute) {
//           if (isLoggedIn) {
//             return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//           }
//           return true;
//         }
    
//         // Problem: Redirects to Login Page after signing out but the URL does't update
//         if (!isLoggedIn && !isPublicRoute) {
//           return Response.redirect(new URL("/auth/login", nextUrl));
//         }
    
//         return true;
//       },
//   },
  providers: [],
} satisfies NextAuthConfig;
