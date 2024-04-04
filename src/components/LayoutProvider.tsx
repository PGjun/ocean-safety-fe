'use client'

import { usePathname } from 'next/navigation'

export const LayoutProvider = ({ children }: any) => {
  const pathname = usePathname()

  let defLayout = 'm-auto mb-[100px] mt-[10px] w-[310px] md:mt-[36px]'
  let mdWidth = 'md:w-[1180px]'

  if (pathname === '/') {
    mdWidth = 'md:w-[1440px]'
  }

  let layout = `${defLayout} ${mdWidth}`

  if (pathname === '/login') {
    layout = ''
  }

  return <div className={layout}>{children}</div>
}
