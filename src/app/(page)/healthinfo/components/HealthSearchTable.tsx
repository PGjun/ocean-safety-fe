import { Pagination } from '@/components/common/Pagination'
import { PATHS } from '@/constants/paths'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Link from 'next/link'
import { Fragment } from 'react'

const colsHeader = [
  'No',
  '이름',
  '아이디',
  '심박수',
  '혈압',
  '체온',
  '산소포화도',
  '기록 일시',
]

const rows = [
  {
    a: '1',
    b: '이름',
    c: 'ID',
    d: '78',
    e: '110 / 79',
    f: '36.5',
    g: '0',
    h: '2024-03-01 16:00:00',
  },
  {
    a: '1',
    b: '이름',
    c: 'ID',
    d: '78',
    e: '110 / 79',
    f: '36.5',
    g: '0',
    h: '2024-03-01 16:00:00',
  },
  {
    a: '1',
    b: '이름',
    c: 'ID',
    d: '78',
    e: '110 / 79',
    f: '36.5',
    g: '0',
    h: '2024-03-01 16:00:00',
  },
  {
    a: '1',
    b: '이름',
    c: 'ID',
    d: '78',
    e: '110 / 79',
    f: '36.5',
    g: '0',
    h: '2024-03-01 16:00:00',
  },
  {
    a: '1',
    b: '이름',
    c: 'ID',
    d: '78',
    e: '110 / 79',
    f: '36.5',
    g: '0',
    h: '2024-03-01 16:00:00',
  },
  {
    a: '1',
    b: '이름',
    c: 'ID',
    d: '78',
    e: '110 / 79',
    f: '36.5',
    g: '0',
    h: '2024-03-01 16:00:00',
  },
  {
    a: '1',
    b: '이름',
    c: 'ID',
    d: '78',
    e: '110 / 79',
    f: '36.5',
    g: '0',
    h: '2024-03-01 16:00:00',
  },
  {
    a: '1',
    b: '이름',
    c: 'ID',
    d: '78',
    e: '110 / 79',
    f: '36.5',
    g: '0',
    h: '2024-03-01 16:00:00',
  },
  {
    a: '1',
    b: '이름',
    c: 'ID',
    d: '78',
    e: '110 / 79',
    f: '36.5',
    g: '0',
    h: '2024-03-01 16:00:00',
  },
  {
    a: '1',
    b: '이름',
    c: 'ID',
    d: '78',
    e: '110 / 79',
    f: '36.5',
    g: '0',
    h: '2024-03-01 16:00:00',
  },
]

export const HealthSearchTable = () => {
  const isMobile = useMediaQuery('768')
  return (
    <div className="flex-1">
      {isMobile ? (
        <div className="mt-[10px] border-t border-[#c4c4c4]">
          {rows.map((item, idx) => (
            <Link key={idx} href={PATHS.SOS_DETAIL}>
              <div className="border-b p-[8px] text-[12px]">
                <div>
                  No. {item.a} 이름 : {item.b}
                </div>
                <div>
                  심박수 : {item.d} 혈압 : {item.e} 체온 : {item.f} 산소포화도 :{' '}
                  {item.g}
                </div>
                <div>기록일시 : {item.h}</div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-[10px] grid grid-cols-[repeat(8,auto)] border-t border-[#c4c4c4] text-center">
          {colsHeader.map((headerName, idx) => {
            return (
              <div key={idx}>
                <div className="border-b border-[#c4c4c4] py-[10px] font-bold">
                  {headerName}
                </div>
              </div>
            )
          })}
          {rows.map((item, idx) => {
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
