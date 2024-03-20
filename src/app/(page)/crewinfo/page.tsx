'use client'

import { useMediaQuery } from '@/hooks/useMediaQuery'

export default function CrewInfoPage() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  return (
    <div className="m-auto mt-[32px] flex justify-center">
      <div className="w-[310px] gap-[32px] md:w-[1360px]">
        <div>
          <div className="text-[26px] font-bold">승선원 정보</div>
          <div className="mt-[10px] flex flex-col gap-[8px] border border-[#E9ECEF] bg-[#F8F9FA] p-[28px]">
            <div className="w-full rounded border border-[#DEE2E6] bg-white px-[24px] py-[18px]">
              <div className="text-[14px] font-bold">이름</div>
              <input
                type="text"
                className="w-full bg-white"
                placeholder="이름을 입력해 주세요."
              />
            </div>
            <div className="w-full rounded border border-[#DEE2E6] bg-white px-[24px] py-[18px]">
              <div className="text-[14px] font-bold">연락처</div>
              <input
                type="text"
                className="w-full bg-white"
                placeholder="연락처를 입력해 주세요."
              />
            </div>
          </div>
        </div>

        <div className="mt-[40px] flex items-center justify-between">
          <div className="text-[18px] font-bold">승선원 정보</div>
          <button className="rounded border border-[#c4c4c4] px-[10px] py-[3px] text-[12px] font-bold">
            + 추가
          </button>
        </div>

        <div className="mt-[10px] border-t border-[#c4c4c4]">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="border-b p-[16px] text-[12px]">
              <div>No. 1 : 이름</div>
              <div>
                아이디 : Safety1 구분 : 관리자 가입일 : 2024-03-01 16:00:00
              </div>
            </div>
          ))}
        </div>

        <div className="mt-[40px] flex items-center justify-between">
          <div className="text-[18px] font-bold">승선원 상세</div>
          <button className="rounded border border-[#c4c4c4] px-[10px] py-[3px] text-[12px] font-bold">
            변경
          </button>
        </div>
      </div>
    </div>
  )
}
