'use client'

import { CommonIcon } from '@/components/SvgIcons'
import { Pagination } from '@/components/common/Pagination'
import { PATHS } from '@/constants/paths'
import Link from 'next/link'

export default function NoticePage() {
  return (
    <div className="md:mx-[40px]">
      <div className="text-[22px] font-bold md:text-[26px]">공지사항</div>
      <div className="mt-[30px] border-t-[2px] border-[#888888]">
        {Array.from({ length: 10 }).map((_, idx) => {
          return (
            <div
              key={idx}
              className="group cursor-pointer border-b border-[#E9ECEF] p-[20px] hover:bg-[#F8F9FA]"
            >
              <div className="flex gap-[10px] text-[20px] leading-[24px] ">
                <div className="group-hover:font-bold">
                  <div className="inline-block">
                    <div className="mr-3 inline-block group-hover:font-normal">
                      12
                    </div>
                    {'제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목'.slice(
                      0,
                      27,
                    )}
                    <span className="ml-1 inline-block">
                      <CommonIcon.ATTACH_FILE />
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-[9.5px] leading-[19.2px] text-[#666666]">
                관리자<span className="px-[12px] text-[#DDDDDD]">/</span>
                24.01.05 12:32
              </div>
            </div>
          )
        })}
        <div className="mt-[32px] flex justify-end">
          <Link href={PATHS.SOS_SETTINGS}>
            <button className="rounded border border-[#C4C4C4] px-[28px] py-[13.5px] text-[14px] font-bold md:leading-[16.71px]">
              새 글쓰기
            </button>
          </Link>
        </div>
        <div className="mt-[32px] flex w-full justify-center">
          <Pagination
            path={() => {
              return '/'
            }}
          />
        </div>
      </div>
    </div>
  )
}
