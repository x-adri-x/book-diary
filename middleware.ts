import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt' // Use to check the user's session

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET })

  // If user has a valid token, allow the request
  if (token) {
    return NextResponse.next()
  }

  // Redirect to home if unauthenticated
  return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: ['/diaries/:path*', '/categories/:path*'],
}
