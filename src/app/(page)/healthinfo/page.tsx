'use client'

import { CommonIcon } from '@/components/SvgIcons'
import { SearchBox } from '@/components/common/SearchBox'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useForm } from 'react-hook-form'
import { HealthSearchTable } from './components/HealthSearchTable'
import Link from 'next/link'
import { PATHS } from '@/constants/paths'
import LineChart from './components/Chart'
import { SearchParams } from '@/components/common/Pagination'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { DatePickerController } from '@/components/common/DatePicker'
import moment from 'moment'
import { HealthChartDetailTab } from './components/HealthChartDetailTab'

// 필드 설정을 포함한 배열 정의
const Searhfields = [
  {
    name: 'search_ship',
    label: '선박명',
    placeholder: '선박명을 입력해 주세요.',
    component: SearchBox,
    width: 176,
  },
  {
    name: 'search_date',
    label: '기록일',
    placeholder: 'YY.MM.DD ~ YY.MM.DD',
    component: DatePickerController,
    width: 245,
  },
  {
    name: 'search_name',
    label: '이름',
    placeholder: '이름을 입력해 주세요.',
    component: SearchBox,
    width: 166,
  },
]

export default function HealthInfoPage(pageProps: {
  params: {}
  searchParams: SearchParams
}) {
  const searchParams = pageProps.searchParams

  const router = useRouter()

  const isMobile = useMediaQuery('768')

  const [userIndex, setUserIndex] = useState<number | null>(null)

  const { control, handleSubmit } = useForm()

  const [query, setQuery] = useState<SearchData>()

  interface SearchData {
    search_group?: string
    search_ship?: string
    search_name?: string
    search_start_date?: string
    search_end_date?: string
    search_date?: { start: string; end: string }
  }

  const onSubmit = (data: SearchData) => {
    const { search_date, ...rest } = data

    let updatedQuery = { ...rest }

    if (search_date && search_date.start !== '' && search_date.end !== '') {
      updatedQuery.search_start_date = moment(search_date.start).format(
        'YYYY-MM-DD',
      )
      updatedQuery.search_end_date = moment(search_date.end).format(
        'YYYY-MM-DD',
      )
    }

    setQuery(updatedQuery)

    router.push(PATHS.HEALTH_INFO({ page_num: '1' }))
  }

  return (
    <div className="md:mx-[40px]">
      <div className="text-[22px] font-bold md:text-[26px]">건강정보 기록</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-[10px] flex flex-col gap-[8px] border border-[#E9ECEF] bg-[#F8F9FA] p-[28px] md:flex-row">
          <div className="grid gap-[8px] md:grid-cols-[repeat(6,auto)]">
            {Searhfields.map((field, index) => {
              const value = searchParams[field.name]
              return (
                <div
                  key={index}
                  className="w-full"
                  style={{ width: isMobile ? '100%' : field.width }}
                >
                  <field.component control={control} {...field} value={value} />
                </div>
              )
            })}
            <button className="flex items-center justify-center gap-[8px] rounded bg-[#333333] px-[28px] py-[10px] text-[16px] text-white md:text-[18px]">
              <CommonIcon.Search /> 검색
            </button>
          </div>
        </div>
      </form>
      <div className="mt-[20px] flex items-end justify-between">
        <div>
          검색결과
          <span className="text-[18px] font-bold leading-[18px]">{` 22`}</span>
          건
        </div>

        <Link href={PATHS.SOS_SETTINGS}>
          <button className="rounded border border-[#888888] px-[12px] py-[8px] text-[12px] font-bold leading-[14.32px] md:px-[16px] md:text-[12px] md:leading-[16.71px]">
            SOS 설정
          </button>
        </Link>
      </div>
      <div className="flex gap-[20px]">
        <HealthSearchTable
          searchParams={searchParams}
          query={query}
          setUserIndex={setUserIndex}
        />
      </div>
      <div className="mt-[20px] text-[18px] font-bold">건강정보 상세</div>
      {/* <div className="mt-[6px] h-[150px] border px-[5px] pb-[5px] pt-[10px] md:h-[340px] md:px-[30px] md:pt-[40px]">
        <LineChart userIndex={userIndex} />
      </div> */}
      <HealthChartDetailTab userIndex={userIndex} />
    </div>
  )
}
