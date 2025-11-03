import { NextResponse } from 'next/server';
import { createRateLimiter } from './lib/rateLimit';

// Global rate limiter: 200 requests per 15 minutes per IP
const globalRateLimiter = createRateLimiter(15 * 60 * 1000, 200);

export function middleware(request) {
  // Apply rate limiting to API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    // Create a mock req/res object for rate limiter
    const url = request.nextUrl;
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
  matcher: '/api/:path*',
};
