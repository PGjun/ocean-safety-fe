// import { NextResponse } from 'next/server'

// export function middleware(request) {
//   const { pathname } = request.nextUrl

//   // 로그인 페이지와 로그인이 필요하지 않은 기타 경로는 제외
//   if (pathname.startsWith('/login') || pathname.includes('/_next')) {
//     return NextResponse.next()
//   }

//   // 로그인 상태 확인 (이 부분은 실제 로그인 상태를 검사하는 로직으로 대체)
//   const isLoggedIn = checkLoginStatus(request) // 이 함수는 구현해야 합니다.

//   // 로그인하지 않았다면 로그인 페이지로 리다이렉트
//   if (!isLoggedIn) {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }

//   return NextResponse.next()
// }

// // 로그인 상태를 확인하는 예시 함수 (실제 구현 필요)
// function checkLoginStatus(request) {
//   // 여기에 쿠키, 헤더, 토큰 등을 검사하는 로직 구현
//   return false // 예시로 항상 로그인이 안 된 상태를 반환
// }

//임시 로그인
import { NextResponse } from 'next/server'

// 임시 로그인 상태 변수
let isLoggedIn = false

export function middleware(request) {
  const { pathname, searchParams } = request.nextUrl

  // 로그인 처리: URL에 ?login=true가 포함되어 있다면 로그인 상태를 true로 설정
  if (searchParams.get('login') === 'true') {
    isLoggedIn = true
  }

  // 로그인 페이지와 로그인이 필요하지 않은 기타 경로는 제외
  if (pathname.startsWith('/login') || pathname.includes('/_next')) {
    return NextResponse.next()
  }

  // 로그인 상태 확인
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}
