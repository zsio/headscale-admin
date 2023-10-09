import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export async function middleware(request: NextRequest) {
  
  return NextResponse.redirect(new URL('/admin/machines', request.url))
}

export const config = {
  matcher: ["/", "/admin"],
}