import { SlideDropDown } from '@/components/common/SlideDropDown'
import Image from 'next/image'

export const AreaSettings = () => {
  return (
    <div className="mt-[10px]">
      <div className="flex flex-col items-start justify-end gap-2 md:flex-row md:items-center">
        <span className="text-[14px] md:text-[16px]">선박 선택</span>
        <SlideDropDown />
      </div>
      <div className="mt-[10px]">
        <Image
          src="/temp-ship.png"
          alt="tempship"
          width={1100}
          height={200}
          style={{ objectFit: 'fill' }}
        />
      </div>
      <div className="mt-[30px] flex flex-col gap-2">
        <span className="text-[14px] md:text-[16px]">선택 영역</span>
        <div className="flex gap-2">
          <div className="flex items-center gap-[12px] rounded border border-[#C4C4C4] px-[16px] py-[10px]">
            <div className="text-[12px] md:text-[14px]">비콘 RSSI 값 2</div>
            <div className="relative h-[10px] w-[10px]">
              <div className="absolute top-[4px] h-[1px] w-full rotate-45 rounded bg-[#888888]"></div>
              <div className="absolute top-[4px] h-[1px] w-full -rotate-45 rounded bg-[#888888]"></div>
            </div>
          </div>
          <div className="flex items-center gap-[12px] rounded border border-[#C4C4C4] px-[16px] py-[10px]">
            <div className="text-[12px] md:text-[14px]">비콘 RSSI 값 2</div>
            <div className="relative h-[10px] w-[10px]">
              <div className="absolute top-[4px] h-[1px] w-full rotate-45 rounded bg-[#888888]"></div>
              <div className="absolute top-[4px] h-[1px] w-full -rotate-45 rounded bg-[#888888]"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[40px] flex justify-end">
        <button className="rounded bg-[#333333] px-[28px] py-[10px] text-[14px] font-bold text-white">
          설정
        </button>
      </div>
    </div>
  )
}
