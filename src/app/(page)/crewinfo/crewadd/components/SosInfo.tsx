import { Pagination } from '@/components/common/Pagination'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Fragment } from 'react'

const CrewList = [
  { name: 'No' },
  {
    name: '이름',
  },
  {
    name: '응급코드',
  },
  {
    name: '기록 일시',
  },
  {
    name: '처리상황',
  },
]

const CrewRows = [
  { a: '1', b: '이름', c: 'SOS', d: '2024-03-01 16:00:00', e: '이상보고' },
  { a: '2', b: '이름', c: 'SOS', d: '2024-03-01 16:00:00', e: '이상보고' },
  { a: '3', b: '이름', c: 'SOS', d: '2024-03-01 16:00:00', e: '이상보고' },
  { a: '4', b: '이름', c: 'SOS', d: '2024-03-01 16:00:00', e: '이상보고' },
  { a: '5', b: '이름', c: 'SOS', d: '2024-03-01 16:00:00', e: '이상보고' },
]

export const SosInfo = () => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  return (
    <div className="mt-[20px] ">
      {isMobile ? (
        <div className="mt-[10px] border-t border-[#c4c4c4]">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="border-b p-[16px] text-[12px]">
              <div>No. 1 : 이름</div>
              <div>응급코드 : SOS 기록일시 : 2024-03-01 16:00:00</div>
              <div className="inline-flex items-center gap-[4px] rounded bg-[#FFF0F0] px-[20px] py-[2px]">
                <div className="h-[10px] w-[10px] rounded-full bg-[#FF3819]"></div>
                이상보고
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
    </div>
  )
}
