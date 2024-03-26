'use client'

import { Pagination } from '@/components/common/Pagination'
import { PATHS } from '@/constants/paths'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Link from 'next/link'
import { Fragment } from 'react'

const CrewList = [
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

const CrewDetail = [
  { title: '이름', cnt: '이름' },
  { title: '사용자 ID', cnt: 'Safety1' },
  { title: '연락처', cnt: '010-1234-1234' },
  { title: '생년월일', cnt: '1995-02-26' },
  { title: '나이', cnt: '30' },
  { title: '성별', cnt: '남' },
  { title: '우편번호', cnt: '55555' },
  { title: '도로명 주소', cnt: '부천시 은성로' },
  { title: '상세주소', cnt: '99-99 999호' },
  { title: '소속 업체', cnt: '주식회사 제이디아이' },
  { title: '사전 예방 안전교육 이수 여부', cnt: 'O' },
  { title: '마지막 이수 일자', cnt: '2024-03-01' },
  { title: '승선원 구분', cnt: '승선원' },
  { title: '승선원 가입일', cnt: '2024-03-01' },
  { title: '소속 그룹', cnt: '항해' },
  { title: '개인정보제공동의 여부', cnt: 'O' },
  { title: '개인정보제공 등의 일', cnt: '2024-03-18' },
  { title: '승무원 탈퇴 여부', cnt: 'X' },
]

export default function CrewInfoPage() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  return (
    <div className="mt-[32px] flex justify-center md:mx-[40px]">
      <div className="w-[310px] gap-[32px] md:w-[1100px]">
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
                <div className="text-[14px] font-bold md:text-[12px]">
                  연락처
                </div>
                <input
                  type="text"
                  className="w-full bg-white md:text-[14px]"
                  placeholder="연락처를 입력해 주세요."
                />
              </div>
            </div>
            <button className="rounded bg-[#333333] px-[28px] py-[10px] text-white">
              검색
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
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="border-b p-[16px] text-[12px]">
                <div>No. 1 : 이름</div>
                <div>
                  아이디 : Safety1 구분 : 관리자 가입일 : 2024-03-01 16:00:00
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-[10px] grid grid-cols-[repeat(5,auto)] border-t border-[#c4c4c4] text-center">
            {CrewList.map((item, idx) => {
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
                  <div className="py-[16px1 flex items-center justify-center gap-2 border-b">
                    <div className="h-[10px] w-[10px] rounded-full bg-[#FF3819]"></div>
                    {item.e}
                  </div>
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

        <div className="relative h-screen">
          <div className="mt-[40px] flex items-center justify-between">
            <div className="text-[18px] font-bold">승선원 상세</div>
            <button className="rounded border border-[#c4c4c4] px-[10px] py-[3px] text-[12px] font-bold">
              변경
            </button>
          </div>
          <div className="mt-[10px] flex gap-1 overflow-x-auto whitespace-nowrap border-b-[2px] border-[#2262C6] font-bold">
            <button className="rounded-t-[8px] bg-[#2262C6] px-[26px] py-[10px] text-white">
              승선원내역
            </button>
            <button className="rounded-t-[8px] bg-[#F3F5FF] px-[26px] py-[10px] text-[#2262C6]">
              웨어러블 정보
            </button>
            <button className="rounded-t-[8px] bg-[#F3F5FF] px-[26px] py-[10px] text-[#2262C6]">
              제한구역 설정
            </button>
            <button className="rounded-t-[8px] bg-[#F3F5FF] px-[26px] py-[10px] text-[#2262C6]">
              소속 그룹 정보
            </button>
            <button className="rounded-t-[8px] bg-[#F3F5FF] px-[26px] py-[10px] text-[#2262C6]">
              SOS 내역
            </button>
          </div>
          <div className="mt-[10px] p-[10px] md:grid md:grid-cols-3 md:gap-x-[32px] md:gap-y-[16px]">
            {CrewDetail.map((item, idx) => {
              return (
                <div key={idx}>
                  <div className="mt-[12px] text-[12px] font-bold">
                    {item.title}
                  </div>
                  <div className="rounded bg-[#F8F9FA] p-[8px] text-[14px]">
                    {item.cnt}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
