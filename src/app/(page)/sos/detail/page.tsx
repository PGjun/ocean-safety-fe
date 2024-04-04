'use client'

import GoogleMapWrapper from '@/app/test/GoogleMapWrapper'
import { CommonIcon } from '@/components/SvgIcons'
import DropDown from '@/components/common/DropDown'
import { PATHS } from '@/constants/paths'
import { useDropDown } from '@/hooks/useDropDown'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Link from 'next/link'
import { Fragment } from 'react'

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
]

export default function SosDetailPage() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  return (
    <div className="md:mx-[40px]">
      <div className="text-[26px] font-bold">SOS 상세내역</div>
      {isMobile ? (
        <div className="mt-[10px] border-t border-[#c4c4c4]">
          {SosRows.map((item, idx) => (
            <div key={idx} className="border-b p-[8px] text-[12px]">
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

      <div className="mt-[28px] h-[410px]">
        <GoogleMapWrapper />
      </div>

      <div className="mt-[28px] text-[18px] font-bold">처리 내용</div>
      <div className="mt-[8px] flex rounded bg-[#F3F5FF] p-[24px] text-[18px] leading-[21.6px] text-[#2262C6]">
        <div className="p-[3px]">
          <CommonIcon.BLUE_Exclamation />
        </div>
        <div className="flex-1 whitespace-pre-line text-[14px] md:text-[18px]">
          {`승선원으로부터 갤럭시워치를 통해 SOS 신호를 수신하였습니다. 즉시 관제 시스템을 통해 신속하고 효율적으로 대응 완료. 
          선원의 안전을 최우선으로 하여 해당 위치를 파악하고 구조 대상에게 신속한 지원`}
        </div>
      </div>

      <div className="mt-[16px] flex flex-col gap-[4px] md:max-w-[332px] md:flex-row">
        <DropDown.Container>
          <DropDown.Content />
        </DropDown.Container>
        <DropDown.Container>
          <DropDown.Content
            dropData={[
              { value: '0', label: '처리완료' },
              { value: '1', label: '이상보고' },
            ]}
          />
        </DropDown.Container>
      </div>
      <div className="mt-[30px] flex justify-center gap-[5px] md:mt-[60px]">
        <Link href={PATHS.SOS}>
          <button className="rounded border border-[#C4C4C4] bg-[#DEE2E6] px-[36px] py-[10px] text-[14px] font-bold md:py-[15px] md:text-[18px]">
            취소
          </button>
        </Link>
        <button className="flex-1 rounded border border-[#333333] bg-[#333333] px-[36px] py-[10px] text-[14px] font-bold text-white md:flex-none md:py-[15px] md:text-[18px]">
          추가
        </button>
      </div>
    </div>
  )
}
