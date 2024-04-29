'use client'

import GoogleMapWrapper from '@/components/common/GoogleMapWrapper'
import { SearchParams } from '@/components/common/Pagination'
import { PATHS } from '@/constants/paths'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Link from 'next/link'
import { useState } from 'react'
import { Control, Controller, useForm } from 'react-hook-form'
import DropDown from '@/components/common/DropDown'
import { SearchController } from '@/components/common/SearchController'
import { DatePickerRangeController } from '@/components/common/DatePicker'
import { useRouter } from 'next/navigation'
import moment from 'moment'
import { GenericSearchForm } from '@/components/common/GenericSearchForm'
import { SearchFields } from '@/types/common'
import { UserEmergencyData } from '@/types/responseData'
import { SosListTable } from '../sos/components/SosListTable'

const DropController = ({
  placeholder,
  dropData,
  control,
  name,
  label,
}: {
  placeholder?: string
  dropData?: { value: string; label: string }[]
  control: Control
  name: string
  label?: string
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <label
          htmlFor={name}
          className="flex flex-col rounded border border-[#DEE2E6] bg-white py-[0.7rem]"
        >
          <div className="px-[16px] text-[14px] font-bold md:text-[12px]">
            {label}
          </div>
          <div className="h-[21px]">
            <DropDown.Content
              fieldValue={field.value}
              fieldOnChange={field.onChange}
              id={name}
              dropData={dropData}
              placeholder={placeholder}
              type="between"
            />
          </div>
        </label>
      )}
    />
  )
}

// 필드 설정을 포함한 배열 정의
const searchFields: SearchFields = [
  {
    name: 'search_ship',
    label: '선박명',
    placeholder: '선박명을 입력해 주세요.',
    component: SearchController,
    width: 176,
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
  {
    name: 'search_status',
    label: '처리현황',
    placeholder: '==선택==',
    component: DropController,
    width: 129,
    dropData: [
      { value: '1', label: '이상보고' },
      { value: '2', label: '처리중' },
      { value: '3', label: '처리완료' },
    ],
  },
]

export default function FallPage(pageProps: {
  params: {}
  searchParams: SearchParams
}) {
  const searchParams = pageProps.searchParams

  const router = useRouter()

  const isMobile = useMediaQuery('768')

  const [sosData, setSosData] = useState<UserEmergencyData | null>(null)
  const [location, setLocation] = useState<
    { lng: number; lat: number } | undefined
  >()

  const { control, handleSubmit } = useForm()

  const [query, setQuery] = useState<any>()

  interface SearchData {
    search_ship?: string
    search_name?: string
    search_start_date?: string
    search_end_date?: string
    search_code?: string | { value: string; label: string }
    search_status?: string | { value: string; label: string }
    search_date?: { start: string; end: string }
  }

  const onSubmit = (data: SearchData) => {
    const { search_date, search_code, search_status, ...rest } = data

    let updatedQuery: SearchData = { ...rest }

    if (typeof search_code === 'object' && search_code.label !== '') {
      updatedQuery.search_code = search_code.label
    }

    if (typeof search_status === 'object' && search_status.label !== '') {
      updatedQuery.search_status = search_status.label
    }

    if (search_date && search_date.start !== '' && search_date.end !== '') {
      updatedQuery.search_start_date = moment(search_date.start).format(
        'YYYY-MM-DD',
      )
      updatedQuery.search_end_date = moment(search_date.end).format(
        'YYYY-MM-DD',
      )
    }

    setQuery(updatedQuery)

    router.push(PATHS.FALL({ page_num: '1' }))
  }

  return (
    <div className="md:mx-[40px]">
      <div className="text-[22px] font-bold md:text-[26px]">낙상감지 내역</div>
      <GenericSearchForm
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        searchFields={searchFields}
        searchParams={searchParams}
      />

      <div className="mt-[20px] text-[18px] text-[#333333]">
        검색결과 <span className="font-bold">{22}</span>건
      </div>
      <div className="flex gap-[20px]">
        <SosListTable
          searchParams={searchParams}
          setSosData={setSosData}
          setLocation={setLocation}
          query={query}
          type="낙상"
        />
        {!isMobile && (
          <div className=" flex flex-col gap-[8px]">
            <div className="h-[330px] w-[259px]">
              <GoogleMapWrapper location={location} />
            </div>

            {sosData && (
              <Link
                href={PATHS.FALL_DETAIL({
                  sos_id: sosData?.id?.toString(),
                })}
              >
                <button className="w-full rounded border border-[#888888] py-[5px] font-bold">
                  상세보기
                </button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
