'use client'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { usePathname } from 'next/navigation'

export const Header = () => {
  const currentPath = usePathname()
  const isLoginPage = currentPath === '/login'

  const isMobile = useMediaQuery('(max-width: 768px)')

  return isLoginPage ? null : (
    <header className="sticky top-0 z-40 bg-slate-100">
      {isMobile ? (
        <div className="flex h-[60px] flex-1 items-center justify-center">
          <div>LOGO</div>
        </div>
      ) : (
        <div className="h-[60px] flex-1 items-center justify-end"></div>
      )}
    </header>
  )
}
