// import { NextRequest, NextResponse } from 'next/server'
// import { auth } from "@/auth"


// const protectedRoutes:string[] = ["/dashboard", "/cart"];

// export default async function middleware(request: NextRequest) {
//     const session = await auth();

//     const path = request.nextUrl.pathname
//     const isProtectedRoute = protectedRoutes.includes(path)
//     // const isPublicRoute = publicRoutes.includes(path) // we dont have any protected routes specified yet
//     // 4. Redirect to /login if the user is not authenticated
//     if (isProtectedRoute && !session?.user?.id) {
//         return NextResponse.redirect(new URL('auth/login', request.nextUrl))
//     }

//     // 5. Redirect to /dashboard if the user is authenticated
//     if (session?.user?.id &&
//         !request.nextUrl.pathname.startsWith('/dashboard')
//     ) {
//         return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
//     }

//     return NextResponse.next()
// }

// // Routes Middleware should not run on
// export const config = {
//     matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// }

import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

// Define which routes require authentication
const protectedRoutes: string[] = ["/dashboard", "/cart", "/checkout"];

export default async function middleware(request: NextRequest) {
    const session = await auth();
    const path = request.nextUrl.pathname;

    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));

    // If the user is not authenticated and tries to access a protected route → redirect to login
    if (isProtectedRoute && !session?.user?.id) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // If the user is authenticated and visits root ("/") → redirect to dashboard
    if (session?.user?.id && path === "/") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

// Exclude static files, images, and API routes from middleware
export const config = {
    matcher: [
        /*
          This regex excludes:
            - anything in /api
            - Next.js internal paths (_next, static, etc.)
            - image requests like .png
        */
        "/((?!api|_next|static|.*\\..*).*)"
    ],
};
