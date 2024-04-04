'use client'

import GoogleMapWrapper from '@/app/test/GoogleMapWrapper'
import { CommonIcon } from '@/components/SvgIcons'
import { Pagination } from '@/components/common/Pagination'
import { PATHS } from '@/constants/paths'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Link from 'next/link'
import { Fragment } from 'react'
import { Controller, useForm } from 'react-hook-form'

const SearchFilter = ({ control, name, label, placeholder }: any) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => {
      return (
        <div className="flex flex-col rounded border border-[#DEE2E6] bg-white px-[20px] py-[18px] md:py-[10px]">
          <div className="text-[14px] font-bold md:text-[12px]">{label}</div>
          <input
            id={name}
            type="text"
            value={field.value || ''}
            onChange={(e) => field.onChange(e.target.value)}
            className="w-full bg-white md:text-[14px]"
            placeholder={placeholder}
          />
        </div>
      )
    }}
  />
)

// 필드 설정을 포함한 배열 정의
const crewInfofields = [
  {
    name: 'ship',
    label: '선박명',
    placeholder: '선박명을 입력해 주세요.',
    component: SearchFilter,
    width: 176,
  },
  {
    name: 'reg-date',
    label: '기록일',
    placeholder: 'YY.MM.DD ~ YY.MM.DD',
    component: SearchFilter,
    width: 245,
  },
  {
    name: 'name',
    label: '이름',
    placeholder: '이름을 입력해 주세요.',
    component: SearchFilter,
    width: 166,
  },
  {
    name: 'emer-code',
    label: '응급코드',
    placeholder: '==선택==',
    component: SearchFilter,
    width: 129,
  },
  {
    name: 'status',
    label: '처리현황',
    placeholder: '==선택==',
    component: SearchFilter,
    width: 129,
  },
]

const COLTITLES = [
  { name: 'No' },
  {
    name: '이름',
  },
  {
    name: '아이디',
  },
  {
    name: 'X좌표',
  },
  {
    name: 'Y좌표',
  },
  {
    name: '응답코드',
  },
  {
    name: '비상연락처',
  },
  {
    name: '기록 일시',
  },
  {
    name: '처리현황',
  },
]

const SosRows = [
  {
    a: '1',
    b: '이름',
    c: 'ID',
    d: '22.22',
    e: '22.22',
    f: 'SOS',
    g: '010-1234-1234',
    h: '2024-03-01 16:00:00',
    i: '이상보고',
  },
  {
    a: '2',
    b: '이름',
    c: 'ID',
    d: '22.22',
    e: '22.22',
    f: 'SOS',
    g: '010-1234-1234',
    h: '2024-03-01 16:00:00',
    i: '이상보고',
  },
  {
    a: '3',
    b: '이름',
    c: 'ID',
    d: '22.22',
    e: '22.22',
    f: 'SOS',
    g: '010-1234-1234',
    h: '2024-03-01 16:00:00',
    i: '이상보고',
  },
  {
    a: '4',
    b: '이름',
    c: 'ID',
    d: '22.22',
    e: '22.22',
    f: 'SOS',
    g: '010-1234-1234',
    h: '2024-03-01 16:00:00',
    i: '이상보고',
  },
  {
    a: '5',
    b: '이름',
    c: 'ID',
    d: '22.22',
    e: '22.22',
    f: 'SOS',
    g: '010-1234-1234',
    h: '2024-03-01 16:00:00',
    i: '이상보고',
  },
  {
    a: '6',
    b: '이름',
    c: 'ID',
    d: '22.22',
    e: '22.22',
    f: 'SOS',
    g: '010-1234-1234',
    h: '2024-03-01 16:00:00',
    i: '이상보고',
  },
  {
    a: '7',
    b: '이름',
    c: 'ID',
    d: '22.22',
    e: '22.22',
    f: 'SOS',
    g: '010-1234-1234',
    h: '2024-03-01 16:00:00',
    i: '이상보고',
  },
  {
    a: '8',
    b: '이름',
    c: 'ID',
    d: '22.22',
    e: '22.22',
    f: 'SOS',
    g: '010-1234-1234',
    h: '2024-03-01 16:00:00',
    i: '이상보고',
  },
  {
    a: '9',
    b: '이름',
    c: 'ID',
    d: '22.22',
    e: '22.22',
    f: 'SOS',
    g: '010-1234-1234',
    h: '2024-03-01 16:00:00',
    i: '이상보고',
  },
  {
    a: '10',
    b: '이름',
    c: 'ID',
    d: '22.22',
    e: '22.22',
    f: 'SOS',
    g: '010-1234-1234',
    h: '2024-03-01 16:00:00',
    i: '이상보고',
  },
]

export default function SosPage() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  const { control, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }
  return (
    <div className="flex justify-center">
      <div className="w-[310px] gap-[32px] md:w-[1100px]">
        <div className="text-[22px] font-bold md:text-[26px]">SOS 내역</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-[10px] flex flex-col gap-[8px] border border-[#E9ECEF] bg-[#F8F9FA] p-[28px] md:flex-row">
            <div className="grid gap-[8px] md:grid-cols-[repeat(6,auto)]">
              {crewInfofields.map((field, index) => {
                return (
                  <div
                    key={index}
                    className="w-full"
                    style={{ width: isMobile ? '100%' : field.width }}
                  >
                    <field.component control={control} {...field} />
                  </div>
                )
              })}
              <button className="flex items-center justify-center gap-[3px] rounded bg-[#333333] px-[28px] py-[10px] text-white">
                <CommonIcon.Search /> 검색
              </button>
            </div>
          </div>
        </form>
        <div className="mt-[20px] text-[18px]">
          검색결과 <span className="font-bold">{22}</span>건
        </div>
        <div className="flex gap-[20px]">
          <SosInfo />
          {!isMobile && (
            <div className="mt-[10px] flex flex-col gap-[8px]">
              <div className="h-[410px] w-[259px]">
                <GoogleMapWrapper />
              </div>

              <Link href={PATHS.SOS_DETAIL}>
                <button className="w-full rounded border border-[#888888] py-[5px] font-bold">
                  상세보기
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const SosInfo = () => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  return (
    <div className="flex-1">
      {isMobile ? (
        <div className="mt-[10px] border-t border-[#c4c4c4]">
          {SosRows.map((item, idx) => (
            <Link key={idx} href={PATHS.SOS_DETAIL}>
              <div className="border-b p-[8px] text-[12px]">
                <div>
                  No. {item.a} 이름 : {item.b} 아이디 : {item.c}
                </div>
                <div>
                  좌표X : {item.d} 좌표Y : {item.e} 응급코드 : {item.f}
                </div>
                <div>
                  비상연락처 : {item.g} 기록일시 : {item.h}
                </div>
                <div className="inline-flex items-center gap-[4px] rounded bg-[#FFF0F0] px-[20px] py-[2px]">
                  <div className="h-[10px] w-[10px] rounded-full bg-[#FF3819]"></div>
                  {item.i}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-[10px] grid grid-cols-[repeat(9,auto)] border-t border-[#c4c4c4] text-center text-[12px]">
          {COLTITLES.map((item, idx) => {
            return (
              <div key={idx}>
                <div className="border-b border-[#c4c4c4] py-[10px] font-bold">
                  {item.name}
                </div>
              </div>
            )
          })}
          {SosRows.map((item, idx) => {
            return (
              <Fragment key={idx}>
                <div className="border-b py-[16px]">{item.a}</div>
                <div className="border-b py-[16px]">{item.b}</div>
                <div className="border-b py-[16px]">{item.c}</div>
                <div className="border-b py-[16px]">{item.d}</div>
                <div className="border-b py-[16px]">{item.e}</div>
                <div className="border-b py-[16px]">{item.f}</div>
                <div className="border-b py-[16px]">{item.g}</div>
                <div className="border-b py-[16px]">{item.h}</div>
                <div className="py-[16px1 flex items-center justify-center gap-2 border-b">
                  <div className="h-[10px] w-[10px] rounded-full bg-[#FF3819]"></div>
                  {item.i}
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
    </div>
  )
}
