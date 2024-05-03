'use client'

import { SearchController } from '@/components/common/SearchController'
import { useForm } from 'react-hook-form'
import { HealthSearchTable } from './components/HealthSearchTable'
import Link from 'next/link'
import { PATHS } from '@/constants/paths'
import { SearchParams } from '@/components/common/Pagination'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { DatePickerRangeController } from '@/components/common/DatePicker'
import moment from 'moment'
import { HealthChartDetailTab } from './components/HealthChartDetailTab'
import { GenericSearchForm } from '@/components/common/GenericSearchForm'
import { SearchFields } from '@/types/common'
import { useUser } from '@/hooks/useUser'
import { ROLES } from '@/constants/roles'
import { useGroupShipDropDown } from '@/hooks/useGroupShipDropDown'

export default function HealthInfoPage(pageProps: {
  params: {}
  searchParams: SearchParams
}) {
  const searchParams = pageProps.searchParams
  const router = useRouter()
  const { role } = useUser()

  const { handleSubmit, control, setValue } = useForm()
  const { DropDownFC } = useGroupShipDropDown()

  const [userIndex, setUserIndex] = useState<number | null>(null)
  const [userName, setUserName] = useState('')
  const [numOfItems, setNumOfItems] = useState(0)
  const [query, setQuery] = useState<SearchData>()

  // 필드 설정을 포함한 배열 정의
  const searchFields: SearchFields = [
    {
      name: 'groupDrop',
      label: '그룹',
      placeholder: '==선택==',
      component: DropDownFC.GroupSearchController,
      setValue,
      width: 180,
    },
    {
      name: 'shipDrop',
      label: '선박',
      placeholder: '==선택==',
      component: DropDownFC.ShipSearchController,
      width: 180,
    },
    {
      name: 'search_date',
      label: '기록일',
      placeholder: 'YY.MM.DD ~ YY.MM.DD',
      component: DatePickerRangeController,
      width: 245,
    },
    {
      name: 'search_name',
      label: '이름',
      placeholder: '이름을 입력해 주세요.',
      component: SearchController,
      width: 166,
    },
  ]

  interface SearchData {
    search_group?: string
    search_ship?: string
    search_name?: string
    search_start_date?: string
    search_end_date?: string
    search_date?: { start: string; end: string }
    group_id?: any
    groupDrop?: any
    ship_id?: any
    shipDrop?: any
  }

  const onSubmit = (data: SearchData) => {
    const { groupDrop, shipDrop, search_date, ...rest } = data

    let updatedQuery = { ...rest }

    if (search_date && search_date.start !== '' && search_date.end !== '') {
      updatedQuery.search_start_date = moment(search_date.start).format(
        'YYYY-MM-DD',
      )
      updatedQuery.search_end_date = moment(search_date.end).format(
        'YYYY-MM-DD',
      )
    }
    if (groupDrop && groupDrop.value !== '0') {
      updatedQuery.group_id = groupDrop.value
    }
    if (shipDrop && shipDrop.value !== '0') {
      updatedQuery.ship_id = shipDrop.value
    }

    setQuery(updatedQuery)

    router.push(PATHS.HEALTH_INFO({ page_num: '1' }))
  }

  return (
    <div className="md:mx-[40px]">
      <div className="text-[22px] font-bold md:text-[26px]">건강정보 기록</div>
      <GenericSearchForm
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        searchFields={searchFields}
        searchParams={searchParams}
      />

      <div className="mb-[10px] mt-[20px] flex items-end justify-between">
        <div className="mt-[20px] text-[18px] text-[#333333]">
          검색결과 <span className="font-bold">{numOfItems}</span>건
        </div>
        {role && role !== ROLES.CREW ? (
          <Link href={PATHS.SOS_SETTINGS}>
            <button className="rounded border border-[#888888] px-[12px] py-[8px] text-[12px] font-bold leading-[14.32px] md:px-[16px] md:text-[12px] md:leading-[16.71px]">
              SOS 설정
            </button>
          </Link>
        ) : null}
      </div>

      <HealthSearchTable
        searchParams={searchParams}
        query={query}
        setUserIndex={setUserIndex}
        setUserName={setUserName}
        setNumOfItems={setNumOfItems}
      />

      <div className="mt-[20px] text-[18px] font-bold">
        건강정보 상세{' '}
        <span className="text-[16px] font-normal">({userName})</span>
      </div>
      <HealthChartDetailTab userIndex={userIndex} />
    </div>
  )
}
