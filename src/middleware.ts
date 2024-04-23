import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { roles } from './constants/roles'
import { PATHS } from './constants/paths'

export async function middleware(request: NextRequest) {
  let token: any = null
  try {
    token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })
  } catch (error) {
    console.error('토큰 가져오기 실패:', error)
    return NextResponse.redirect(new URL(PATHS.API_AUTH_SIGNIN, request.url))
  }

  const { pathname } = request.nextUrl
  const isLoggedIn = token !== null && token.user !== undefined

  // 로그인 페이지 접근 시 이미 로그인 상태인 경우, 메인 페이지로 리디렉트
  if (pathname.startsWith(PATHS.API_AUTH_SIGNIN) && isLoggedIn) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // 로그인이 필요한 페이지 접근 시 로그인이 되어있지 않은 경우 로그인 페이지로 리디렉트
  if (
    !isLoggedIn &&
    !pathname.includes('/_next') &&
    !pathname.startsWith(PATHS.API_AUTH_SIGNIN) &&
    !pathname.startsWith('/api/') // API 경로를 리다이렉트에서 제외해야됌
  ) {
    return NextResponse.redirect(new URL(PATHS.API_AUTH_SIGNIN, request.url))
  }

  // 권한 검사 및 페이지 리디렉션
  if (isLoggedIn) {
    const role = roles[token.user.crew_level]
    if (pathname === '/' && role === 'D') {
      return NextResponse.redirect(new URL(PATHS.HEALTH_INFO(), request.url))
    }
  }

  return NextResponse.next()
}
