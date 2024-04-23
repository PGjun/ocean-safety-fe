'use client'

import { PATHS } from '@/constants/paths'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import useWebSocket from '@/hooks/useWebSocket'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Header = () => {
  useWebSocket()
  const currentPath = usePathname()

  const isLoginPage = currentPath === PATHS.SIGNIN

  const isMobile = useMediaQuery('768')

  //todo 임시 로그인 변경
  const logout = () => {
    signOut()
  }

  if (isLoginPage) return null
  return (
    <header className="sticky top-0 z-40 bg-white">
      {!isMobile && <div className="h-3 rounded-bl-full bg-slate-100"></div>}
      {isMobile ? (
        <div className="flex h-[60px] flex-1 items-center justify-center">
          <div>LOGO</div>
          <div className="fixed right-[30px] top-[20px] text-[12px]">
            <button onClick={logout}>로그아웃</button>
          </div>
        </div>
      ) : (
        <div className="h-[60px] flex-1 items-center justify-end">
          <div className="fixed right-[30px] top-[30px]">
            <button onClick={logout}>로그아웃</button>
          </div>
        </div>
      )}
    </header>
  )
}
