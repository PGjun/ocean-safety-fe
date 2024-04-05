import { Pagination } from '@/components/common/Pagination'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Fragment } from 'react'

const COLTITLES = [
  { name: 'No' },
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

const HealthRows = [
  {
    a: '1',
    b: '81',
    c: '120 / 80',
    d: '36.8',
    e: '0',
    f: '2024-03-01 16:00:00',
  },
  {
    a: '1',
    b: '81',
    c: '120 / 80',
    d: '36.8',
    e: '0',
    f: '2024-03-01 16:00:00',
  },
  {
    a: '1',
    b: '81',
    c: '120 / 80',
    d: '36.8',
    e: '0',
    f: '2024-03-01 16:00:00',
  },
  {
    a: '1',
    b: '81',
    c: '120 / 80',
    d: '36.8',
    e: '0',
    f: '2024-03-01 16:00:00',
  },
  {
    a: '1',
    b: '81',
    c: '120 / 80',
    d: '36.8',
    e: '0',
    f: '2024-03-01 16:00:00',
  },
]

export const HealthInfo = () => {
  const isMobile = useMediaQuery('768')
  return (
    <div className="mt-[20px] ">
      {isMobile ? (
        <div className="mt-[10px] border-t border-[#c4c4c4]">
          {HealthRows.map((item, idx) => (
            <div key={idx} className="border-b p-[16px] text-[12px]">
              <div>
                No. {item.a} 심박수 : {item.b} 혈압 : {item.c} 체온 : {item.d}{' '}
                산소포화도 : {item.e} 기록일시 : {item.f}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-[10px] grid grid-cols-[repeat(6,auto)] border-t border-[#c4c4c4] text-center">
          {COLTITLES.map((item, idx) => {
            return (
              <div key={idx}>
                <div className="border-b border-[#c4c4c4] py-[10px] text-[14px] font-bold">
                  {item.name}
                </div>
              </div>
            )
          })}
          {HealthRows.map((item, idx) => {
            return (
              <Fragment key={idx}>
                <div className="border-b py-[16px]">{item.a}</div>
                <div className="border-b py-[16px]">{item.b}</div>
                <div className="border-b py-[16px]">{item.c}</div>
                <div className="border-b py-[16px]">{item.d}</div>
                <div className="border-b py-[16px]">{item.e}</div>
                <div className="border-b py-[16px]">{item.f}</div>
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
