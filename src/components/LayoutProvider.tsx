'use client'

import { PATHS } from '@/constants/paths'
import { usePathname } from 'next/navigation'

export const LayoutProvider = ({ children }: any) => {
  const pathname = usePathname()

  // 레이아웃 스타일 설정
  let defLayout = 'm-auto mb-[100px] mt-[10px] w-[310px] md:mt-[36px]'
  let mdWidth = pathname === '/' ? 'md:w-[1440px]' : 'md:w-[1180px]'
  let layout =
    pathname === PATHS.API_AUTH_SIGNIN ? '' : `${defLayout} ${mdWidth}`

  return <div className={layout}>{children}</div>
}
