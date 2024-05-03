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
import { useUser } from '@/hooks/useUser'
import { ROLES } from '@/constants/roles'
import { useGroupShipDropDown } from '@/hooks/useGroupShipDropDown'

export default function GroupInfoPage(pageProps: {
  params: {}
  searchParams: SearchParams
}) {
  const searchParams = pageProps.searchParams
  const router = useRouter()

  const { role } = useUser()
  const { handleSubmit, control, setValue } = useForm()
  const { DropDownFC } = useGroupShipDropDown()

  const searchFields: SearchFields = [
    {
      name: 'groupDrop',
      label: '그룹',
      placeholder: '==선택==',
      component: DropDownFC.GroupSearchController,
      setValue,
      width: 200,
    },
    {
      name: 'shipDrop',
      label: '선박',
      placeholder: '==선택==',
      component: DropDownFC.ShipSearchController,
      width: 200,
    },
  ]

  const [query, setQuery] = useState<any>()
  const [shipId, setShipId] = useState<number | null>(null)

  interface SearchData {
    search_group?: string
    search_ship?: string
    groupDrop?: any
    shipDrop?: any
  }

  const onSubmit = (data: SearchData) => {
    const { groupDrop, shipDrop, ...rest } = data
    const queryData = {
      ...rest,
      ...(groupDrop &&
        groupDrop.value !== '0' && { group_id: groupDrop.value }),
      ...(shipDrop && shipDrop.value !== '0' && { ship_id: shipDrop.value }),
    }
    setQuery(queryData)

    router.push(PATHS.GROUP_INFO({ page_num: '1' }))
  }

  return (
    <div className="md:mx-[40px]">
      <div className="text-[26px] font-bold">그룹(선박) 정보</div>
      {role !== ROLES.SHIP && (
        <GenericSearchForm
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          searchFields={searchFields}
          searchParams={searchParams}
        />
      )}

      <div className="mb-[10px] mt-[40px] flex items-center justify-between">
        <div className="text-[18px] font-bold">선박 정보</div>
        {role && role !== ROLES.SHIP ? (
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
            {role && role !== ROLES.SHIP ? (
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
