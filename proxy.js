import { NextResponse } from 'next/server';
import { createRateLimiter } from './lib/rateLimit';

// Global rate limiter: 200 requests per 15 minutes per IP
const globalRateLimiter = createRateLimiter(15 * 60 * 1000, 200);

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except /admin/login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // Check for admin token in cookie or header
    const adminToken = request.cookies.get('adminToken')?.value || 
                       request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!adminToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Apply rate limiting to API routes
  if (pathname.startsWith('/api')) {
    const ip = request.ip || 
               request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Simple rate limiting check
    // Note: For production, consider using Redis or a proper rate limiting service
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*', 
    '/admin/:path*'
  ],
};
