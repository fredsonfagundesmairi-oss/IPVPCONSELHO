import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get('ipvp_auth');

  // Se tentar entrar na secretaria sem o cookie, manda para o login
  if (pathname.startsWith('/secretaria') && !authCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/secretaria/:path*',
};
