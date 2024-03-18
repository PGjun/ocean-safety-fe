'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export const Header = () => {
  const currentPath = usePathname()
  const isLoginPage = currentPath === '/login'

  const [isMobile, setIsMobile] = useState(false)

  // 창 너비에 따라 openNav 상태를 조절하기 위한 효과
  useEffect(() => {
    const breackPoint = window.matchMedia('(min-width: 768px)') // Tailwind의 'md' 브레이크포인트는 768px입니다.
    const handleWidthChange = (e: any) => {
      if (e.matches) {
        setIsMobile(false)
      } else {
        setIsMobile(true)
      }
    }

    handleWidthChange(breackPoint) // 컴포넌트 마운트 시 초기 상태 설정
    // 이벤트 리스너 등록
    breackPoint.addEventListener('change', handleWidthChange)
    handleWidthChange(breackPoint) // 컴포넌트 마운트 시 초기 상태 설정

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => breackPoint.removeEventListener('change', handleWidthChange)
  }, [])

  return isLoginPage ? null : (
    <header className="bg-slate-100">
      <div className="flex h-[60px] flex-1 items-center justify-center">
        {isMobile ? <div>LOGO</div> : ''}
      </div>
    </header>
  )
}
