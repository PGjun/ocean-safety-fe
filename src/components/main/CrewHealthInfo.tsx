'use client'

import { useMediaQuery } from '@/hooks/useMediaQuery'

const HealthList = [
  { name: 'No' },
  {
    name: '이름',
  },
  {
    name: '심박수',
  },
  {
    name: '혈압',
  },
  {
    name: '체온',
  },
  {
    name: '산소포화도',
  },
  {
    name: '기록 일시',
  },
]

export const CrewHealthInfo = () => {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <div>
      <div className="text-[20px] font-bold">승선원 건강정보</div>

      {isMobile ? (
        <div className="border-t border-[#c4c4c4]">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="border-b p-[16px] text-[12px]">
              <div>No. 1 : 이름</div>
              <div>심박수 : 81 혈압 : 120 / 80 체온 : 36.8 산소포화도 : 0</div>
              <div>기록 일시 : 2024-03-01 16:00:00</div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-[repeat(7,auto)] border-t border-[#c4c4c4] text-center">
            {HealthList.map((item, idx) => {
              return (
                <div key={idx}>
                  <div className="border-b border-[#c4c4c4] py-[10px] text-[14px] font-bold">
                    {item.name}
                  </div>
                </div>
              )
            })}
            <div className="border-b py-[16px]">1</div>
            <div className="border-b py-[16px]">이름</div>
            <div className="border-b py-[16px]">81</div>
            <div className="border-b py-[16px]">120 / 80</div>
            <div className="border-b py-[16px]">36.8</div>
            <div className="border-b py-[16px]">0</div>
            <div className="border-b py-[16px]">2024-03-01 16:00:00</div>
            <div className="border-b py-[16px]">1</div>
            <div className="border-b py-[16px]">이름</div>
            <div className="border-b py-[16px]">81</div>
            <div className="border-b py-[16px]">120 / 80</div>
            <div className="border-b py-[16px]">36.8</div>
            <div className="border-b py-[16px]">0</div>
            <div className="border-b py-[16px]">2024-03-01 16:00:00</div>
            <div className="border-b py-[16px]">1</div>
            <div className="border-b py-[16px]">이름</div>
            <div className="border-b py-[16px]">81</div>
            <div className="border-b py-[16px]">120 / 80</div>
            <div className="border-b py-[16px]">36.8</div>
            <div className="border-b py-[16px]">0</div>
            <div className="border-b py-[16px]">2024-03-01 16:00:00</div>
            <div className="border-b py-[16px]">1</div>
            <div className="border-b py-[16px]">이름</div>
            <div className="border-b py-[16px]">81</div>
            <div className="border-b py-[16px]">120 / 80</div>
            <div className="border-b py-[16px]">36.8</div>
            <div className="border-b py-[16px]">0</div>
            <div className="border-b py-[16px]">2024-03-01 16:00:00</div>
            <div className="border-b py-[16px]">1</div>
            <div className="border-b py-[16px]">이름</div>
            <div className="border-b py-[16px]">81</div>
            <div className="border-b py-[16px]">120 / 80</div>
            <div className="border-b py-[16px]">36.8</div>
            <div className="border-b py-[16px]">0</div>
            <div className="border-b py-[16px]">2024-03-01 16:00:00</div>
          </div>
        </>
      )}
    </div>
  )
}
