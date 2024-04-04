'use client'

import { Pagination } from '@/components/common/Pagination'
import { PATHS } from '@/constants/paths'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Link from 'next/link'
import { Fragment } from 'react'
import { CrewDetailTab } from './components/CrewDetailTab'
import { CommonIcon } from '@/components/SvgIcons'

const COLTITLES = [
  { name: 'No' },
  {
    name: '이름',
  },
  {
    name: '아이디',
  },
  {
    name: '구분',
  },
  {
    name: '가입일',
  },
]

const CrewRows = [
  { a: '1', b: '이름', c: 'Safety1', d: '관리자', e: '2024-03-01' },
  { a: '1', b: '이름', c: 'Safety1', d: '관리자', e: '2024-03-01' },
  { a: '1', b: '이름', c: 'Safety1', d: '관리자', e: '2024-03-01' },
  { a: '1', b: '이름', c: 'Safety1', d: '관리자', e: '2024-03-01' },
  { a: '1', b: '이름', c: 'Safety1', d: '관리자', e: '2024-03-01' },
]

export default function CrewInfoPage() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  return (
    <div className="md:mx-[40px]">
      <div>
        <div className="text-[26px] font-bold">승선원 정보</div>
        <div className="mt-[10px] flex flex-col gap-[8px] border border-[#E9ECEF] bg-[#F8F9FA] p-[28px] md:flex-row">
          <div className="grid gap-[8px] md:w-[650px] md:grid-cols-2">
            <div className="w-full rounded border border-[#DEE2E6] bg-white px-[24px] py-[18px] md:w-[313px] md:py-[10px]">
              <div className="text-[14px] font-bold md:text-[12px]">이름</div>
              <input
                type="text"
                className="w-full bg-white md:text-[14px]"
                placeholder="이름을 입력해 주세요."
              />
            </div>
            <div className="w-full rounded border border-[#DEE2E6] bg-white px-[24px] py-[18px] md:w-[313px] md:py-[10px]">
              <div className="text-[14px] font-bold md:text-[12px]">연락처</div>
              <input
                type="text"
                className="w-full bg-white md:text-[14px]"
                placeholder="연락처를 입력해 주세요."
              />
            </div>
          </div>
          <button className="flex items-center gap-[3px] rounded bg-[#333333] px-[28px] py-[10px] text-white">
            <CommonIcon.Search /> 검색
          </button>
        </div>
      </div>

      <div className="mt-[40px] flex items-center justify-between">
        <div className="text-[18px] font-bold">승선원 정보</div>
        <Link href={PATHS.CREW_ADD}>
          <button className="rounded border border-[#c4c4c4] px-[10px] py-[3px] text-[12px] font-bold">
            + 추가
          </button>
        </Link>
      </div>

      {isMobile ? (
        <div className="mt-[10px] border-t border-[#c4c4c4]">
          {CrewRows.map((item, idx) => (
            <div key={idx} className="border-b p-[16px] text-[12px]">
              <div>{`No. ${item.a} : ${item.b}`}</div>
              <div>
                <span>{`아이디 : ${item.c} `}</span>
                <span>{`구분 : ${item.d} `}</span>
                <span>{`가입일 : ${item.e}`}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-[10px] grid grid-cols-[repeat(5,auto)] border-t border-[#c4c4c4] text-center">
          {COLTITLES.map((item, idx) => {
            return (
              <div key={idx}>
                <div className="border-b border-[#c4c4c4] py-[10px] text-[14px] font-bold">
                  {item.name}
                </div>
              </div>
            )
          })}
          {CrewRows.map((item, idx) => {
            return (
              <Fragment key={idx}>
                <div className="border-b py-[16px]">{item.a}</div>
                <div className="border-b py-[16px]">{item.b}</div>
                <div className="border-b py-[16px]">{item.c}</div>
                <div className="border-b py-[16px]">{item.d}</div>
                <div className="border-b py-[16px]">{item.e}</div>
              </Fragment>
            )
          })}
        </div>
      )}
      <div className="mt-[20px] flex w-full justify-center">
        <Pagination
          path={() => {
            return '/'
          }}
        />
      </div>

      <div className="relative">
        <div className="mt-[40px] flex items-center justify-between">
          <div className="text-[18px] font-bold">승선원 상세</div>
          <button className="rounded border border-[#c4c4c4] px-[10px] py-[3px] text-[12px] font-bold">
            변경
          </button>
        </div>
        <CrewDetailTab />
      </div>
    </div>
  )
}
