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

// //임시 로그인
// import { NextResponse } from 'next/server'

// // 임시 로그인 상태 변수
// let isLoggedIn = false

// export function middleware(request) {
//   const { pathname, searchParams } = request.nextUrl

//   // 로그인 처리: URL에 ?login=true가 포함되어 있다면 로그인 상태를 true로 설정
//   if (searchParams.get('login') === 'true') {
//     isLoggedIn = true
//   }

//   // 로그인 페이지와 로그인이 필요하지 않은 기타 경로는 제외
//   if (pathname.startsWith('/login') || pathname.includes('/_next')) {
//     return NextResponse.next()
//   }

//   // 로그인 상태 확인
//   if (!isLoggedIn) {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }

//   return NextResponse.next()
// }
