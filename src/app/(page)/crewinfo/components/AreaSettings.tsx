import Image from 'next/image'
import { useState } from 'react'

const dropData = [
  [
    { id: 0, name: '강원호' },
    { id: 1, name: '무궁화호' },
  ],
  [
    { id: 0, name: '강원호2' },
    { id: 1, name: '무궁화호2' },
  ],
  [
    { id: 0, name: '강원호3' },
    { id: 1, name: '무궁화호3' },
  ],
]

export const AreaSettings = () => {
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0)

  const handlePrev = () => {
    setSelectedGroupIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : dropData.length - 1,
    )
  }

  const handleNext = () => {
    setSelectedGroupIndex((prevIndex) =>
      prevIndex < dropData.length - 1 ? prevIndex + 1 : 0,
    )
  }

  const handleChange = (event: any) => {
    console.log(event.target.value) // 선택된 선박의 이름을 처리
  }

  return (
    <div className="mt-[10px] p-[10px]">
      <div className="flex flex-col items-start justify-end gap-2 md:flex-row md:items-center">
        <span className="text-[14px] md:text-[16px]">선박 선택</span>
        <div className="flex rounded border border-[#C4C4C4]">
          <button
            className="border-r border-[#C4C4C4] px-[13px]"
            onClick={handlePrev}
          >{`<`}</button>
          <select
            onChange={handleChange}
            className="px-[90px] py-[10px] text-[12px] md:text-[14px]"
          >
            {dropData[selectedGroupIndex].map((ship) => (
              <option key={ship.id} value={ship.name}>
                {ship.name}
              </option>
            ))}
          </select>
          <button
            className="border-l border-[#C4C4C4] px-[13px]"
            onClick={handleNext}
          >{`>`}</button>
        </div>
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
