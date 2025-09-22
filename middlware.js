// middleware.js
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    const publicRoutes = ['/', '/auth/signin', '/auth/signup', '/auth/error', '/about', '/contact', '/privacy', '/terms'];
    const isPublic = publicRoutes.includes(pathname) || pathname.startsWith('/api/auth');

    if (isPublic) {
      if (token && (pathname === '/auth/signin' || pathname === '/auth/signup')) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
      return NextResponse.next();
    }

    if (!token) {
      const signInUrl = new URL('/auth/signin', req.url);
      signInUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signInUrl);
    }

    if (token.isActive === false) {
      return NextResponse.redirect(new URL('/auth/error?error=AccountDisabled', req.url));
    }

    const adminOnly = ['/admin', '/users', '/settings/users'];
    const agentRoutes = ['/properties', '/customers', '/deals', '/dashboard'];

    if (adminOnly.some(r => pathname.startsWith(r)) && token.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard?error=AccessDenied', req.url));
    }
    if (agentRoutes.some(r => pathname.startsWith(r)) && token.role === 'client') {
      return NextResponse.redirect(new URL('/profile?error=AccessDenied', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname.startsWith('/api/auth')) return true;
        const publicRoutes = ['/', '/auth/signin', '/auth/signup', '/auth/error', '/about', '/contact', '/privacy', '/terms'];
        return !!token || publicRoutes.includes(req.nextUrl.pathname);
      },
    },
  }
);

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico|public/).*)'],
};
