import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export async function middleware(request: NextRequest) {

  const url = new URL(request.url);
  if (url.pathname === '/'){ // 
    return NextResponse.redirect(new URL('/admin/machines', request.url))
  }
  
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ],
}