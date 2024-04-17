import { NextResponse } from 'next/server'

//todo 임시 로그인 변경
// 쿠키 파싱 함수
function parseCookies(request) {
  const cookieHeader = request.headers.get('cookie') || ''
  const cookies = Object.fromEntries(
    cookieHeader.split('; ').map((cookie) => cookie.split('=')),
  )
  return cookies
}

export function middleware(request) {
  const { pathname } = request.nextUrl

  const cookies = parseCookies(request)
  const isLoggedIn = cookies.loggedIn === 'true'

  // 로그인 페이지에 접근하려고 하고, 이미 로그인 상태인 경우 메인 페이지로 리다이렉트
  if (pathname.startsWith('/login') && isLoggedIn) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // 로그인이 필요하지만 로그인하지 않은 경우 로그인 페이지로 리다이렉트
  if (
    !pathname.startsWith('/login') &&
    !pathname.includes('/_next') &&
    !isLoggedIn
  ) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}
