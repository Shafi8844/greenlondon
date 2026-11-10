import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers';

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    // Better Auth state cookies are scoped to their host. Keep auth flows on
    // the same host used for the production callback and BETTER_AUTH_URL.
    if (request.nextUrl.hostname === 'greenlondon.vercel.app') {
        const canonicalUrl = request.nextUrl.clone();
        canonicalUrl.hostname = 'greenlondon-shafi-11c2.vercel.app';
        canonicalUrl.protocol = 'https:';
        return NextResponse.redirect(canonicalUrl, 308);
    }

    const path = request.nextUrl.pathname;
    const protectedPath =
        path === '/joined-events' ||
        path === '/manage-events' ||
        path === '/create-event' ||
        path.startsWith('/events/');

    if (!protectedPath) {
        return NextResponse.next();
    }

    const session =await auth.api.getSession({
        headers: await headers()
    });

  const user = session?.user;
  if(!user){
    return NextResponse.redirect(new URL('/sign-In', request.url))
  }
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)'
  ],
}
