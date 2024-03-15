'use client'

import Image from 'next/image'
import MobileMenu from '/public/icons/mobile-menu.svg'
import { useState } from 'react'

export default function Home() {
  const [openMenu, setOpenMenu] = useState(false)
  const handleBackClick = (e: any) => {
    // 모달 밖을 클릭했을 때 모달을 닫도록 처리 , 발동여부 옵셔널(bgClickEnabled)
    if (e.target.classList.contains('bg-gray-700')) {
      setOpenMenu(false)
    }
  }
  return (
    <main className="m-auto">
      <button
        onClick={() => {
          setOpenMenu(true)
        }}
      >
        <Image src={MobileMenu} alt="mobile-menu"></Image>
      </button>

      {openMenu && (
        <div
          className="fixed inset-0 bg-gray-700 bg-opacity-70"
          onClick={handleBackClick}
        ></div>
      )}
      <div
        className={`fixed left-0 top-0 h-full w-[293px] transform bg-slate-100 transition-transform duration-300 ${
          openMenu ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        메뉴창
      </div>
    </main>
  )
}
