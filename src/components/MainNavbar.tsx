'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import MobileMenu from '/public/icons/mobile-menu.svg'
import { NavIcon } from './SvgIcons'
import { PATHS } from '@/constants/paths'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const navMenuList = [
  { IconComponent: NavIcon.Home, name: '홈', path: '/' },
  {
    IconComponent: NavIcon.CrewInfo,
    name: '승선원 정보',
    path: PATHS.CREW_INFO,
  },
  {
    IconComponent: NavIcon.GroupInfo,
    name: '그룹(선박) 정보',
    path: PATHS.GROUP_INFO,
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
  {
    IconComponent: NavIcon.Notice,
    name: 'test',
    path: '/test',
  },
]

export const MainNavbar = () => {
  const currentPath = usePathname()

  const isLoginPage = currentPath === '/login'

  const [openNav, setOpenNav] = useState(false)
  const handleBackClick = (e: any) => {
    // 모달 밖을 클릭했을 때 모달을 닫도록 처리 , 발동여부 옵셔널(bgClickEnabled)
    if (e.target.classList.contains('bg-gray-500')) {
      setOpenNav(false)
    }
  }

  const isMobile = useMediaQuery('768')

  useEffect(() => {
    if (isMobile) {
      setOpenNav(false)
    } else {
      setOpenNav(true)
    }
  }, [isMobile])

  return isLoginPage ? null : (
    <div className={`${isMobile ? 'fixed' : 'relative'} z-50 min-w-[293px]`}>
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
