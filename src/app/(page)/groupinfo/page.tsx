'use client'

import { CommonIcon } from '@/components/SvgIcons'
import { SearchParams } from '@/components/common/Pagination'
import { PATHS } from '@/constants/paths'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ShipListTable } from './components/ShipListTable'
import { ShipDetailTab } from './components/ShipDetailTab'

export default function GroupInfoPage(pageProps: {
  params: {}
  searchParams: SearchParams
}) {
  const searchParams = pageProps.searchParams

  const router = useRouter()

  const { register, handleSubmit } = useForm()

  const [shipId, setShipId] = useState<number | null>(null)

  interface SearchData {
    search_group?: string
    search_ship?: string
  }

  const onSubmit = (data: SearchData) => {
    router.push(PATHS.GROUP_INFO({ ...data, page_num: '1' }))
  }

  return (
    <div className="md:mx-[40px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-[26px] font-bold">그룹(선박) 정보</div>
        <div className="mt-[10px] flex flex-col gap-[8px] border border-[#E9ECEF] bg-[#F8F9FA] p-[28px] md:flex-row">
          <div className="grid gap-[8px] md:w-[650px] md:grid-cols-2">
            <div className="w-full rounded border border-[#DEE2E6] bg-white px-[24px] py-[18px] md:w-[313px] md:py-[10px]">
              <div className="text-[14px] font-bold md:text-[12px]">그룹명</div>
              <input
                {...register('search_group', {
                  value: searchParams.search_group,
                })}
                type="text"
                className="w-full bg-white md:text-[14px]"
                placeholder="그룹명을 입력해 주세요."
              />
            </div>
            <div className="w-full rounded border border-[#DEE2E6] bg-white px-[24px] py-[18px] md:w-[313px] md:py-[10px]">
              <div className="text-[14px] font-bold md:text-[12px]">선박명</div>
              <input
                {...register('search_ship', {
                  value: searchParams.search_ship,
                })}
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
      </form>

      <div className="mt-[40px] flex items-center justify-between">
        <div className="text-[18px] font-bold">선박 정보</div>
        <Link href={PATHS.GROUP_ADD}>
          <button className="rounded border border-[#c4c4c4] px-[10px] py-[3px] text-[12px] font-bold">
            + 추가
          </button>
        </Link>
      </div>

      <ShipListTable searchParams={searchParams} setShipId={setShipId} />
      {shipId && (
        <div className="relative">
          <div className="mt-[40px] flex items-center justify-between">
            <div className="text-[18px] font-bold">그룹(선박) 정보</div>
            <button className="rounded border border-[#c4c4c4] px-[10px] py-[3px] text-[12px] font-bold">
              수정
            </button>
          </div>
          <ShipDetailTab shipId={shipId} />
        </div>
      )}
    </div>
  )
}
