'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import MobileMenu from '/public/icons/mobile-menu.svg'
import { NavIcon } from './SvgIcons'
import { PATHS } from '@/constants/paths'

const navMenuList = [
  { IconComponent: NavIcon.Home, name: '홈', path: '/' },
  {
    IconComponent: NavIcon.CrewInfo,
    name: '승선원 정보',
    path: PATHS.CREW_INFO,
  },
  {
    IconComponent: NavIcon.Monitoring,
    name: '선내 위치 모니터링',
    path: PATHS.MONITORING,
  },
  {
    IconComponent: NavIcon.Sos,
    name: 'SOS 발생',
    path: PATHS.SOS,
  },
  {
    IconComponent: NavIcon.FallDetection,
    name: '낙상 감지',
    path: PATHS.FALL_DETECTION,
  },
  {
    IconComponent: NavIcon.HealthInfo,
    name: '건강 정보',
    path: PATHS.HEALTH_INFO,
  },
  {
    IconComponent: NavIcon.Notice,
    name: '공지사항',
    path: PATHS.NOTICE,
  },
]

export const MainNavbar = () => {
  const currentPath = usePathname()

  const [openNav, setOpenNav] = useState(false)
  const handleBackClick = (e: any) => {
    // 모달 밖을 클릭했을 때 모달을 닫도록 처리 , 발동여부 옵셔널(bgClickEnabled)
    if (e.target.classList.contains('bg-gray-500')) {
      setOpenNav(false)
    }
  }

  const [isMobile, setIsMobile] = useState(false)

  // 창 너비에 따라 openNav 상태를 조절하기 위한 효과
  useEffect(() => {
    const breackPoint = window.matchMedia('(min-width: 768px)') // Tailwind의 'md' 브레이크포인트는 768px입니다.
    const handleWidthChange = (e: any) => {
      if (e.matches) {
        setOpenNav(true) // 너비가 'md' 이상일 경우 메뉴를 항상 열린 상태로 유지
        setIsMobile(false)
      } else {
        setOpenNav(false) // 그 외의 경우에는 기본 상태(닫힘)로 설정
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

  return (
    <div className={`${isMobile ? 'fixed' : 'relative'} min-w-[293px]`}>
      {isMobile && openNav && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-70"
          onClick={handleBackClick}
        ></div>
      )}
      {isMobile && (
        <button
          onClick={() => {
            setOpenNav(true)
          }}
          className="px-[20px] py-[22px]"
        >
          <Image src={MobileMenu} alt="mobile-menu" />
        </button>
      )}
      <div
        className={`fixed left-0 top-0 h-screen transform bg-white transition-transform duration-300 ${
          openNav ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-[112px] bg-white p-[32px] text-center text-[32px] font-bold">
          LOGO
        </div>
        <nav className="flex h-full w-[293px] flex-col gap-[24px] rounded-tr-[68px] bg-sidebarback-gradient py-[40px] pl-[24px] pr-[40px]">
          {navMenuList.map((item, idx) => {
            const isSelected = currentPath === item.path
            const selected = 'bg-white font-bold text-[#2262C6]'
            const normal = 'text-white hover:bg-[#2262C5]'
            return (
              <Link key={idx} href={item.path}>
                <button
                  onClick={() => (isMobile ? setOpenNav(!openNav) : null)}
                  className={`flex w-full items-center gap-[8px] rounded-full px-[18px] py-[8px] text-[22px] ${isSelected ? selected : normal}`}
                >
                  {/* <HomeIcon
                    color={isSelected ? '#2262C6' : '#ffffff'}
                  /> */}
                  <item.IconComponent
                    color={isSelected ? '#2262C6' : '#ffffff'}
                  />
                  {item.name}
                </button>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
