'use client'

import { SearchParams } from '@/components/common/Pagination'
import { PATHS } from '@/constants/paths'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ShipListTable } from './components/ShipListTable'
import { ShipDetailTab } from './components/ShipDetailTab'
import { GenericSearchForm } from '@/components/common/GenericSearchForm'
import { SearchFields } from '@/types/common'
import { SearchController } from '@/components/common/SearchController'
import { useUser } from '@/hooks/useUser'

const searchFields: SearchFields = [
  {
    name: 'search_group',
    label: '그룹명',
    placeholder: '그룹명을 입력해 주세요.',
    component: SearchController,
    width: 312,
  },
  {
    name: 'search_ship',
    label: '선박명',
    placeholder: '선박명을 입력해 주세요.',
    component: SearchController,
    width: 312,
  },
]

export default function GroupInfoPage(pageProps: {
  params: {}
  searchParams: SearchParams
}) {
  const { role } = useUser()
  const searchParams = pageProps.searchParams

  const router = useRouter()

  const { handleSubmit, control } = useForm()

  const [query, setQuery] = useState<any>()

  const [shipId, setShipId] = useState<number | null>(null)

  interface SearchData {
    search_group?: string
    search_ship?: string
  }

  const onSubmit = (data: SearchData) => {
    setQuery(data)

    router.push(PATHS.GROUP_INFO({ page_num: '1' }))
  }

  return (
    <div className="md:mx-[40px]">
      <div className="text-[26px] font-bold">그룹(선박) 정보</div>
      <GenericSearchForm
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        searchFields={searchFields}
        searchParams={searchParams}
      />

      <div className="mb-[10px] mt-[40px] flex items-center justify-between">
        <div className="text-[18px] font-bold">선박 정보</div>
        {role && role !== 'C' ? (
          <Link href={PATHS.GROUP_ADD}>
            <button className="rounded border border-[#c4c4c4] px-[10px] py-[3px] text-[12px] font-bold">
              + 추가
            </button>
          </Link>
        ) : null}
      </div>

      <ShipListTable
        searchParams={searchParams}
        setShipId={setShipId}
        query={query}
      />
      {shipId && (
        <div className="relative">
          <div className="mt-[40px] flex items-center justify-between">
            <div className="text-[18px] font-bold">그룹(선박) 정보</div>
            {role && role !== 'C' ? (
              <button className="rounded border border-[#c4c4c4] px-[10px] py-[3px] text-[12px] font-bold">
                수정
              </button>
            ) : null}
          </div>
          <ShipDetailTab shipId={shipId} />
        </div>
      )}
    </div>
  )
}
