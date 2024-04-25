'use client'

import { useState } from 'react'

export const Slider = ({
  title = '최저 심박수',
  min = 40,
  max = 80,
  current = 45,
  settingName = '',
  setNewSettings,
}: any) => {
  const [value, setValue] = useState(current)

  // 슬라이더의 값에 따라 배경 색상을 계산합니다.
  const calculateBackground = (value: any) => {
    // 슬라이더가 40에서 80 사이의 값을 가지므로, 해당 비율을 계산합니다.
    const percentage = ((value - min) / (max - min)) * 100
    // 활성 영역과 비활성 영역 색상을 나타내는 그라데이션 스타일을 반환합니다.
    return `linear-gradient(90deg, #60A5FA ${percentage}%, #DFE5ED ${percentage}%)`
  }

  const sliderTrackStyle = {
    width: '100%',
    height: '8px',
    borderRadius: '100px',
    background: calculateBackground(value), // 배경색상 함수로부터 반환된 값
    outline: 'none',
  }

  const handleChange = (e: any) => {
    setValue(e.target.value)
    setNewSettings((pre: any) => ({
      ...pre,
      [settingName]: Number(e.target.value),
    }))
  }

  return (
    <div className="flex w-full flex-col items-center border-b border-[#F1F3F5] py-[20px] md:border-none">
      <div className="flex w-full items-center justify-between md:gap-[24px] ">
        <div className="w-[100px] text-[18px]">{title}</div>
        <input
          type="number"
          value={value}
          onChange={handleChange}
          className="w-[5rem] rounded-md border p-[16px] text-[14px] leading-[13.16px] md:w-[16rem]"
        />
      </div>

      <div className="mt-[16px] w-full">
        <input
          id="slider"
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          className="cursor-pointer appearance-none shadow-inner"
          style={sliderTrackStyle}
        />
      </div>
      <div className="flex w-full justify-between text-[12px]">
        <span className="text-[#333333]">{min}</span>
        <span className="text-[#333333]">{max}</span>
      </div>
    </div>
  )
}
