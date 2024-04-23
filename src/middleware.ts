import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { ROLES, roles } from './constants/roles'
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
    return NextResponse.redirect(new URL(PATHS.SIGNIN, request.url))
  }

  const { pathname } = request.nextUrl
  const isLoggedIn = token !== null && token.user !== undefined

  // 로그인 페이지 접근 시 이미 로그인 상태인 경우, 메인 페이지로 리디렉트
  if (pathname.startsWith(PATHS.SIGNIN) && isLoggedIn) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // 로그인이 필요한 페이지 접근 시 로그인이 되어있지 않은 경우 로그인 페이지로 리디렉트
  if (
    !isLoggedIn &&
    !pathname.includes('/_next') &&
    !pathname.startsWith('/api/') && // API 경로를 리다이렉트에서 제외해야됌
    !pathname.startsWith(PATHS.SIGNIN)
  ) {
    return NextResponse.redirect(new URL(PATHS.SIGNIN, request.url))
  }

  // 'D' 권한 사용자의 접근 제한
  if (isLoggedIn && roles[token.user.crew_level] === ROLES.CREW) {
    const allowedPaths = [
      PATHS.HEALTH_INFO(),
      PATHS.NOTICE(),
      PATHS.NOTICE_DETAIL(),
    ]
    const isAllowedPath = allowedPaths.some((path) => path.startsWith(pathname))

    // 허용된 경로가 아니면 HEALTH_INFO 페이지로 리디렉트
    if (
      (!isAllowedPath &&
        !pathname.includes('/_next') &&
        !pathname.startsWith('/api/')) ||
      pathname === '/'
    ) {
      return NextResponse.redirect(new URL(PATHS.HEALTH_INFO(), request.url))
    }
  }

  return NextResponse.next()
}
