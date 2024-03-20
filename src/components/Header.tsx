'use client'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Header = () => {
  const currentPath = usePathname()
  const isLoginPage = currentPath === '/login'

  const isMobile = useMediaQuery('(max-width: 768px)')

  return isLoginPage ? null : (
    <header className="sticky top-0 z-40 bg-white">
      {!isMobile && (
        <div className="ml-[30px] h-3 rounded-bl-full bg-slate-100"></div>
      )}
      {isMobile ? (
        <div className="flex h-[60px] flex-1 items-center justify-center">
          <div>LOGO</div>
        </div>
      ) : (
        <div className="h-[60px] flex-1 items-center justify-end">
          <div className="fixed right-[30px] top-[30px]">
            <Link href="/login">
              <button>로그아웃</button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
