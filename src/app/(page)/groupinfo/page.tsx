'use client'

import { Pagination } from '@/components/common/Pagination'
import { PATHS } from '@/constants/paths'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Link from 'next/link'
import { Fragment } from 'react'
import { CommonIcon } from '@/components/SvgIcons'
import Image from 'next/image'

const GroupDetails = [
  { title: '선박번호', content: '191-' },
  { title: '선박명', content: '한국호' },
  { title: '선적항(국적)', content: '제주(대한민국)' },
  { title: '국제총톤수', content: '28,827.00' },
  { title: '재화중량톤수', content: '38.985.00' },
  { title: '등록선급명', content: '등록선급명' },
  { title: '진수일', content: '2012-11-23' },
  { title: '조선소', content: 'Hyundai Mipo' },
  { title: '선박소유자', content: '해운㈜' },
  { title: '사업자명', content: '해운㈜' },
  { title: '선박임차인', content: '-' },
  { title: '임차기간', content: '-' },
]

const GroupDetail = () => {
  return (
    <div className="md:grid md:grid-cols-3 md:gap-x-[32px] md:gap-y-[16px]">
      {GroupDetails.map((item, idx) => {
        return (
          <div key={idx}>
            <div className="mt-[12px] text-[12px] font-bold">{item.title}</div>
            <div className="rounded bg-[#F8F9FA] p-[8px] text-[14px]">
              {item.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}

const COLTITLES = [
  { name: 'No' },
  {
    name: '그룹명',
  },
  {
    name: '선박명',
  },
  {
    name: '선적항(국적)',
  },
  {
    name: '선박 소유자',
  },
]

const ShipRows = [
  { a: '1', b: '유에스티21', c: '한국호', d: '제주(대한민국)', e: '해운㈜' },
  { a: '2', b: '유에스티21', c: '한국호', d: '제주(대한민국)', e: '해운㈜' },
  { a: '3', b: '유에스티21', c: '한국호', d: '제주(대한민국)', e: '해운㈜' },
  { a: '4', b: '유에스티21', c: '한국호', d: '제주(대한민국)', e: '해운㈜' },
  { a: '5', b: '유에스티21', c: '한국호', d: '제주(대한민국)', e: '해운㈜' },
]

export default function GroupInfoPage() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  return (
    <div className="mt-[32px] flex justify-center md:mx-[40px]">
      <div className="w-[310px] gap-[32px] md:w-[1100px]">
        <div>
          <div className="text-[26px] font-bold">그룹(선박) 정보</div>
          <div className="mt-[10px] flex flex-col gap-[8px] border border-[#E9ECEF] bg-[#F8F9FA] p-[28px] md:flex-row">
            <div className="grid gap-[8px] md:w-[650px] md:grid-cols-2">
              <div className="w-full rounded border border-[#DEE2E6] bg-white px-[24px] py-[18px] md:w-[313px] md:py-[10px]">
                <div className="text-[14px] font-bold md:text-[12px]">
                  그룹명
                </div>
                <input
                  type="text"
                  className="w-full bg-white md:text-[14px]"
                  placeholder="그룹명을 입력해 주세요."
                />
              </div>
              <div className="w-full rounded border border-[#DEE2E6] bg-white px-[24px] py-[18px] md:w-[313px] md:py-[10px]">
                <div className="text-[14px] font-bold md:text-[12px]">
                  선박명
                </div>
                <input
                  type="text"
                  className="w-full bg-white md:text-[14px]"
                  placeholder="선박명을 입력해 주세요."
                />
              </div>
            </div>
            <button className="flex items-center gap-[3px] rounded bg-[#333333] px-[28px] py-[10px] text-white">
              <CommonIcon.Search /> 검색
            </button>
          </div>
        </div>

        <div className="mt-[40px] flex items-center justify-between">
          <div className="text-[18px] font-bold">선박 정보</div>
          <Link href={PATHS.GROUP_ADD}>
            <button className="rounded border border-[#c4c4c4] px-[10px] py-[3px] text-[12px] font-bold">
              + 추가
            </button>
          </Link>
        </div>

        {isMobile ? (
          <div className="mt-[10px] border-t border-[#c4c4c4]">
            {ShipRows.map((item, idx) => (
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
            {ShipRows.map((item, idx) => {
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

        <div className="relative h-screen">
          <div className="mt-[40px] flex items-center justify-between">
            <div className="text-[18px] font-bold">그룹(선박) 정보</div>
            <button className="rounded border border-[#c4c4c4] px-[10px] py-[3px] text-[12px] font-bold">
              수정
            </button>
          </div>
          <GroupDetail />
          <div className="mt-[50px] text-[18px] font-bold">선박 도면</div>

          <div className="mt-[10px]">
            <Image
              src="/temp-ship.png"
              alt="tempship"
              width={1100}
              height={200}
              style={{ objectFit: 'fill' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
